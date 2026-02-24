import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Plus,
  Search as SearchIcon,
  User as UserIcon,
  Globe,
  UserCheck,
  Users,
  LayoutGrid,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LeftSidebar from "../../components/Homepage/LeftSidebar";
import FeedCenter from "../../components/Homepage/FeedCenter";
import RightSidebar from "../../components/Homepage/RightSidebar";
import NotificationCenter from "../../components/Notifications/NotificationCenter";
import CreatePostModal from "../../components/Posts/CreatePostModal";
import SearchModal from "../../components/Search/SearchModal";
import { supabase } from "../../services/supabase";
import { postService } from "../../services/postService";
import { socialService } from "../../services/socialService";
import { executeSupabase } from "../../services/supabaseRetryService";
import { useAuthStore } from "../../stores/authStore";
import { useToast } from "../../components/Toast/Toast";
import "./homescreen.scss";

const FEED_TABS = [
  { id: "feed" as const,        label: "Feed",        Icon: Globe },
  { id: "following" as const,   label: "Following",   Icon: UserCheck },
  { id: "friends" as const,     label: "Friends",     Icon: Users },
  { id: "communities" as const, label: "Communities", Icon: LayoutGrid },
];

const PAGE_SIZE = 15;

type FeedFilter = "feed" | "following" | "friends" | "communities";

const HomeScreen: React.FC = () => {
  const { profile } = useAuthStore();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<FeedFilter>("feed");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const userProfileId = profile?.id ?? null;
  const processedRealtimeEvents = useRef<Set<string>>(new Set());
  const realtimeRecoveryTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const shouldProcessRealtimeEvent = useCallback((eventKey: string) => {
    const cache = processedRealtimeEvents.current;
    if (cache.has(eventKey)) {
      return false;
    }

    cache.add(eventKey);
    if (cache.size > 1000) {
      const oldestKey = cache.values().next().value;
      if (oldestKey) {
        cache.delete(oldestKey);
      }
    }

    return true;
  }, []);

  const upsertPost = useCallback((incomingPost: any) => {
    setPosts((prev) => {
      const existingIndex = prev.findIndex((post) => post.id === incomingPost.id);
      if (existingIndex === -1) {
        return [incomingPost, ...prev];
      }

      const updated = [...prev];
      const existing = updated[existingIndex];
      updated[existingIndex] = {
        ...existing,
        ...incomingPost,
        stats: {
          ...(existing?.stats || {}),
          ...(incomingPost?.stats || {}),
        },
        userInteraction: {
          ...(existing?.userInteraction || {}),
          ...(incomingPost?.userInteraction || {}),
        },
      };
      return updated;
    });
  }, []);

  const removePost = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  }, []);

  const mapPostForFeed = useCallback(
    (post: any) => {
      const likeCount = post.stats?.likes ?? post.likes_count ?? post.post_likes?.length ?? 0;
      const commentCount =
        post.stats?.comments ?? post.comments_count ?? post.post_comments?.length ?? 0;

      return {
        ...post,
        image_url: post.image_url || post.media_url,
        author: post.author
          ? {
              id: post.author.id || post.user_id,
              name: post.author.display_name || post.author.name || "User",
              username: post.author.username || "user",
              avatar:
                post.author.dotvatar_url || post.author.avatar_url || post.author.avatar || "User",
              verified: Boolean(post.author.verified),
            }
          : post.profiles
            ? {
                id: post.profiles.id || post.user_id,
                name: post.profiles.display_name || "User",
                username: post.profiles.username || "user",
                avatar: post.profiles.dotvatar_url || post.profiles.avatar_url || "User",
                verified: Boolean(post.profiles.verified),
              }
            : {
                id: post.user_id,
                name: "User",
                username: "user",
                avatar: "User",
                verified: false,
              },
        stats: {
          views: post.stats?.views ?? 0,
          likes: likeCount,
          comments: commentCount,
          reposts: post.stats?.reposts ?? 0,
          shares: post.stats?.shares ?? 0,
        },
        userInteraction: {
          liked:
            post.userInteraction?.liked ??
            post.post_likes?.some((like: any) => like.user_id === userProfileId) ??
            false,
          saved: post.userInteraction?.saved ?? false,
          reposted: post.userInteraction?.reposted ?? false,
        },
      };
    },
    [userProfileId]
  );

  const mergePaginatedPosts = useCallback((existingPosts: any[], incomingPosts: any[]) => {
    if (existingPosts.length === 0) {
      return incomingPosts;
    }

    const existingIds = new Set(existingPosts.map((post) => post.id));
    const uniqueIncoming = incomingPosts.filter((post) => !existingIds.has(post.id));
    return [...existingPosts, ...uniqueIncoming];
  }, []);

  const fetchPostById = useCallback(
    async (postId: string) => {
      try {
        const post = await executeSupabase(() =>
          supabase
            .from("posts")
            .select(
              `
              *,
              author:profiles!posts_user_id_fkey(*),
              post_likes(user_id),
              post_comments(id)
            `
            )
            .eq("id", postId)
            .maybeSingle()
        );

        if (!post) {
          return null;
        }

        return mapPostForFeed(post);
      } catch (error) {
        console.error("Failed to fetch post by id:", error);
        return null;
      }
    },
    [mapPostForFeed]
  );

  const refreshPostStats = useCallback(
    async (postId: string) => {
      const refreshedPost = await fetchPostById(postId);
      if (!refreshedPost) {
        return;
      }
      upsertPost(refreshedPost);
    },
    [fetchPostById, upsertPost]
  );

  const loadPostsPage = useCallback(
    async (offset: number, replaceExisting: boolean) => {
      if (!userProfileId) {
        setPosts([]);
        setLoading(false);
        setLoadingMore(false);
        setHasMorePosts(false);
        return;
      }

      if (replaceExisting) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const fetchedPosts = await socialService.getTimelinePosts(
          userProfileId,
          PAGE_SIZE,
          offset,
          activeTab
        );
        const mappedPosts = fetchedPosts.map(mapPostForFeed);

        setPosts((prev) =>
          replaceExisting ? mappedPosts : mergePaginatedPosts(prev, mappedPosts)
        );
        setHasMorePosts(fetchedPosts.length === PAGE_SIZE);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        if (replaceExisting) {
          setPosts([]);
        }
      } finally {
        if (replaceExisting) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      }
    },
    [activeTab, mapPostForFeed, mergePaginatedPosts, userProfileId]
  );

  const scheduleRealtimeRecovery = useCallback(() => {
    if (realtimeRecoveryTimer.current) {
      return;
    }

    realtimeRecoveryTimer.current = setTimeout(() => {
      realtimeRecoveryTimer.current = null;
      void loadPostsPage(0, true);
    }, 1500);
  }, [loadPostsPage]);

  useEffect(() => {
    processedRealtimeEvents.current.clear();
    void loadPostsPage(0, true);
  }, [activeTab, loadPostsPage, userProfileId]);

  useEffect(() => {
    if (!userProfileId) {
      setNotifications([]);
      return;
    }

    const fetchNotifications = async () => {
      try {
        const data = await executeSupabase(() =>
          supabase
            .from("notifications")
            .select(
              `
              *,
              actor:profiles!notifications_actor_id_fkey(
                id,
                username,
                display_name,
                dotvatar_url,
                avatar_url
              )
            `
            )
            .eq("recipient_id", userProfileId)
            .order("created_at", { ascending: false })
            .limit(20)
        );

        const transformedNotifications = (data || []).map((notif: any) => ({
          id: notif.id,
          type: notif.type,
          actor: {
            id: notif.actor?.id || "unknown",
            name: notif.actor?.display_name || "Unknown User",
            avatar: notif.actor?.dotvatar_url || notif.actor?.avatar_url || "User",
          },
          message: notif.content || notif.message,
          timestamp: new Date(notif.created_at),
          read: notif.read,
        }));

        setNotifications(transformedNotifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    void fetchNotifications();
  }, [userProfileId]);

  useEffect(() => {
    if (!userProfileId) {
      return;
    }

    const postsChannel = supabase
      .channel(`feed-posts:${userProfileId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        async (payload) => {
          const postId = (payload.new as any)?.id || (payload.old as any)?.id;
          if (!postId) {
            return;
          }

          const eventKey = `posts:${payload.eventType}:${postId}:${(payload as any).commit_timestamp || ""}`;
          if (!shouldProcessRealtimeEvent(eventKey)) {
            return;
          }

          if (payload.eventType === "DELETE") {
            removePost(postId);
            return;
          }

          if (activeTab !== "feed") {
            scheduleRealtimeRecovery();
            return;
          }

          const detailedPost = await fetchPostById(postId);
          if (detailedPost) {
            upsertPost(detailedPost);
          }
        }
      )
      .subscribe((status) => {
        if (status === "TIMED_OUT" || status === "CHANNEL_ERROR" || status === "CLOSED") {
          scheduleRealtimeRecovery();
        }
      });

    const interactionsChannel = supabase
      .channel(`feed-interactions:${userProfileId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_likes" },
        (payload) => {
          const postId = (payload.new as any)?.post_id || (payload.old as any)?.post_id;
          if (!postId) {
            return;
          }

          const eventKey = `post_likes:${payload.eventType}:${postId}:${(payload as any).commit_timestamp || ""}`;
          if (!shouldProcessRealtimeEvent(eventKey)) {
            return;
          }

          void refreshPostStats(postId);
        }
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "post_comments" },
        (payload) => {
          const postId = (payload.new as any)?.post_id || (payload.old as any)?.post_id;
          if (!postId) {
            return;
          }

          const eventKey = `post_comments:${payload.eventType}:${postId}:${(payload as any).commit_timestamp || ""}`;
          if (!shouldProcessRealtimeEvent(eventKey)) {
            return;
          }

          void refreshPostStats(postId);
        }
      )
      .subscribe((status) => {
        if (status === "TIMED_OUT" || status === "CHANNEL_ERROR" || status === "CLOSED") {
          scheduleRealtimeRecovery();
        }
      });

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(interactionsChannel);
      if (realtimeRecoveryTimer.current) {
        clearTimeout(realtimeRecoveryTimer.current);
        realtimeRecoveryTimer.current = null;
      }
    };
  }, [
    activeTab,
    fetchPostById,
    refreshPostStats,
    removePost,
    scheduleRealtimeRecovery,
    shouldProcessRealtimeEvent,
    upsertPost,
    userProfileId,
  ]);

  const { toast } = useToast();

  const handleCreatePost = async (
    content: string,
    mediaUrl?: string,
    mediaType?: "image" | "video"
  ) => {
    if (!profile?.id) {
      toast.warning("Please log in to create a post");
      return;
    }

    try {
      const newPost = await postService.createPost(profile.id, content, mediaUrl, mediaType);
      if (newPost) {
        upsertPost(mapPostForFeed(newPost));
        setIsCreateModalOpen(false);
        toast.success("Post created successfully.");
      }
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Unknown error";
      console.error("Post creation failed:", error);
      toast.error(`Failed to create post: ${msg}`);
    }
  };

  const handleRefresh = async () => {
    if (!userProfileId) {
      return;
    }
    processedRealtimeEvents.current.clear();
    await loadPostsPage(0, true);
  };

  const handleLoadMore = async () => {
    if (!userProfileId || loading || loadingMore || !hasMorePosts) {
      return;
    }

    await loadPostsPage(posts.length, false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-text">DOTique</span>
            <div className="logo-glow" />
          </div>
        </div>

        <div className="header-center">
          <div
            className="search-bar"
            onClick={() => setIsSearchOpen(true)}
            role="button"
            tabIndex={0}
          >
            <SearchIcon size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search users, posts, NFTs..."
              readOnly
              onClick={() => setIsSearchOpen(true)}
            />
            <div className="search-glow" />
          </div>
        </div>

        <div className="header-right">
          <NotificationCenter notifications={notifications} />

          <button className="user-menu" onClick={handleProfileClick} title="View Profile">
            <div className="avatar-wrapper">
              <div className="avatar-small">
                {profile?.dotvatar_url ? (
                  <img src={profile.dotvatar_url} alt="avatar" />
                ) : (
                  <UserIcon size={20} />
                )}
              </div>
              <div className="avatar-glow" />
            </div>
          </button>
        </div>
      </header>

      <div className="home-container">
        <LeftSidebar />

        <div className="feed-wrapper">
          <div className="feed-tabs">
            {FEED_TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`feed-tab ${activeTab === id ? "active" : ""}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={16} className="tab-icon" />
                <span className="tab-text">{label}</span>
                {activeTab === id && <div className="tab-indicator" />}
              </button>
            ))}
          </div>

          <FeedCenter
            posts={posts}
            loading={loading}
            loadingMore={loadingMore}
            hasMore={hasMorePosts}
            onLoadMore={handleLoadMore}
            onPostLike={(id) => console.log("Like post:", id)}
            onPostShare={(id) => console.log("Share post:", id)}
            onRefresh={handleRefresh}
          />
        </div>

        <RightSidebar />
      </div>

      <button
        className="fab"
        onClick={() => setIsCreateModalOpen(true)}
        title="Create Post or Mint NFT"
      >
        <Plus size={28} />
        <div className="fab-glow" />
      </button>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreatePost={handleCreatePost}
      />

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default HomeScreen;
