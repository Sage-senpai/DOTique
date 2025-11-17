// src/services/profileService.ts - UPDATED WITH COUNT FIXES
import { supabase } from "./supabase";

/**
 * Get user profile with accurate real-time counts
 */
export async function getUserProfileWithCounts(userId: string) {
  try {
    // Fetch base profile
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) throw profileError;

    // Get accurate counts from database
    const [followersResult, followingResult, postsResult] = await Promise.all([
      supabase
        .from("user_follows")
        .select("id", { count: "exact", head: true })
        .eq("following_id", userId),
      
      supabase
        .from("user_follows")
        .select("id", { count: "exact", head: true })
        .eq("follower_id", userId),
      
      supabase
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("user_id", userId)
    ]);

    const followers_count = followersResult.count || 0;
    const following_count = followingResult.count || 0;
    const posts_count = postsResult.count || 0;

    // Update profile with accurate counts
    await supabase
      .from("profiles")
      .update({
        followers_count,
        following_count,
        posts_count,
        updated_at: new Date().toISOString()
      })
      .eq("id", userId);

    return {
      ...profile,
      followers_count,
      following_count,
      posts_count
    };
  } catch (error) {
    console.error("Failed to get profile with counts:", error);
    throw error;
  }
}

/**
 * Refresh counts for current user's profile
 */
export async function refreshCurrentUserCounts() {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) throw new Error("Not authenticated");

    // Get profile ID from auth_uid
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("auth_uid", user.id)
      .single();

    if (profileError) throw profileError;

    return await getUserProfileWithCounts(profile.id);
  } catch (error) {
    console.error("Failed to refresh current user counts:", error);
    throw error;
  }
}

/**
 * Update follower/following counts after follow/unfollow
 */
export async function updateFollowCounts(
  followerId: string,
  followingId: string,
  operation: 'increment' | 'decrement'
) {
  try {
    const delta = operation === 'increment' ? 1 : -1;

    // Update follower's following_count
    const { data: follower } = await supabase
      .from('profiles')
      .select('following_count')
      .eq('id', followerId)
      .single();

    if (follower) {
      await supabase
        .from('profiles')
        .update({
          following_count: Math.max(0, (follower.following_count || 0) + delta)
        })
        .eq('id', followerId);
    }

    // Update following's followers_count
    const { data: following } = await supabase
      .from('profiles')
      .select('followers_count')
      .eq('id', followingId)
      .single();

    if (following) {
      await supabase
        .from('profiles')
        .update({
          followers_count: Math.max(0, (following.followers_count || 0) + delta)
        })
        .eq('id', followingId);
    }

    console.log(`✅ Updated follow counts (${operation})`);
  } catch (error) {
    console.error('Failed to update follow counts:', error);
    throw error;
  }
}

/**
 * Increment post count after creating a post
 */
export async function incrementPostCount(userId: string) {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('posts_count')
      .eq('id', userId)
      .single();

    if (profile) {
      await supabase
        .from('profiles')
        .update({
          posts_count: (profile.posts_count || 0) + 1
        })
        .eq('id', userId);
    }
  } catch (error) {
    console.error('Failed to increment post count:', error);
  }
}

/**
 * Decrement post count after deleting a post
 */
export async function decrementPostCount(userId: string) {
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('posts_count')
      .eq('id', userId)
      .single();

    if (profile) {
      await supabase
        .from('profiles')
        .update({
          posts_count: Math.max(0, (profile.posts_count || 0) - 1)
        })
        .eq('id', userId);
    }
  } catch (error) {
    console.error('Failed to decrement post count:', error);
  }
}

/**
 * Creates or updates a profile row for a single user
 */
export async function upsertUserProfile({
  auth_uid,
  username,
  display_name,
  dotvatar_url,
  email,
}: {
  auth_uid: string;
  username?: string;
  display_name?: string;
  dotvatar_url?: string;
  email?: string;
}) {
  const safeEmail = email || `${auth_uid}@placeholder.com`;

  const { data: existingProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_uid", auth_uid)
    .maybeSingle();

  if (error) throw new Error(`Error fetching profile: ${error.message}`);

  if (existingProfile) {
    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update({ username, display_name, dotvatar_url, email: safeEmail })
      .eq("id", existingProfile.id)
      .select()
      .single();
    if (updateError) throw new Error(`Error updating profile: ${updateError.message}`);
    return updatedProfile;
  } else {
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert([{ 
        auth_uid, 
        username, 
        display_name, 
        dotvatar_url, 
        email: safeEmail,
        followers_count: 0,
        following_count: 0,
        posts_count: 0
      }])
      .select()
      .single();
    if (insertError) throw new Error(`Error creating profile: ${insertError.message}`);
    return newProfile;
  }
}

/**
 * Ensures every user has a profile row in the "profiles" table
 */
export async function ensureUserProfiles() {
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Failed to fetch users:", error);
    return;
  }

  for (const user of users) {
    try {
      await upsertUserProfile({
        auth_uid: user.auth_uid,
        username: user.username || "",
        display_name: user.display_name || "",
        dotvatar_url: user.dotvatar_url || "",
        email: user.email || `${user.auth_uid}@placeholder.com`,
      });
    } catch (err) {
      console.error(`Failed to upsert profile for ${user.auth_uid}:`, err);
    }
  }

  console.log(`✅ Ensured profiles exist for ${users.length} users`);
}