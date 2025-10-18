// ==================== src/hooks/usePost.ts ====================
import { useState, useCallback } from 'react';
import { usePostStore } from '../stores/postStore';
import type { Post } from '../stores/postStore';

export function usePost() {
  const { posts, setPosts, addPost, updatePost, deletePost, setLoading, setError } = usePostStore();
  const [isLoading, setIsLoading] = useState(false);

  const createPost = useCallback(async (content: string, media?: File[]) => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Call postService.createPost(content, media)
      const newPost: Post = {
        id: Date.now().toString(),
        author: {
          id: 'current-user',
          name: 'Current User',
          username: '@currentuser',
          avatar: '👤',
          verified: false,
        },
        content,
        createdAt: new Date(),
        stats: { views: 0, likes: 0, comments: 0, reposts: 0, shares: 0 },
        userInteraction: { liked: false, saved: false, reposted: false },
      };
      addPost(newPost);
      return newPost;
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create post');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [addPost, setError]);

  const likePost = useCallback(async (postId: string) => {
    try {
      updatePost(postId, {
        stats: {
          views: 0,
          likes: 1,
          comments: 0,
          reposts: 0,
          shares: 0,
        },
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to like post');
    }
  }, [updatePost, setError]);

  const deletePostById = useCallback(async (postId: string) => {
    try {
      // TODO: Call postService.deletePost(postId)
      deletePost(postId);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete post');
    }
  }, [deletePost, setError]);

  return {
    posts,
    isLoading,
    createPost,
    likePost,
    deletePost: deletePostById,
  };
}
