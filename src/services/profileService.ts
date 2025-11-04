// src/services/profileService.ts
import { supabase } from "./supabase";

/**
 * 🔹 Creates or updates a profile row for a single user
 * - Use this on profile edit / signup
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
  // Provide a fallback email if undefined
  const safeEmail = email || `${auth_uid}@placeholder.com`;

  // Try to fetch existing profile
  const { data: existingProfile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("auth_uid", auth_uid)
    .maybeSingle();

  if (error) throw new Error(`Error fetching profile: ${error.message}`);

  if (existingProfile) {
    // Update existing profile
    const { data: updatedProfile, error: updateError } = await supabase
      .from("profiles")
      .update({ username, display_name, dotvatar_url, email: safeEmail })
      .eq("id", existingProfile.id)
      .select()
      .single();
    if (updateError) throw new Error(`Error updating profile: ${updateError.message}`);
    return updatedProfile;
  } else {
    // Insert new profile
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert([{ auth_uid, username, display_name, dotvatar_url, email: safeEmail }])
      .select()
      .single();
    if (insertError) throw new Error(`Error creating profile: ${insertError.message}`);
    return newProfile;
  }
}

/**
 * 🔹 Ensures every user has a profile row in the "profiles" table
 * - Existing users without a profile will get a default one
 * - Uses upsertUserProfile internally for cleaner code
 */
export async function ensureUserProfiles() {
  // 1️⃣ Fetch all users
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Failed to fetch users:", error);
    return;
  }

  // 2️⃣ Iterate users and upsert profiles
  for (const user of users) {
    try {
      await upsertUserProfile({
        auth_uid: user.auth_uid,
        username: user.username || "",
        display_name: user.display_name || "",
        dotvatar_url: user.dotvatar_url || "",
        email: user.email || `${user.auth_uid}@placeholder.com`, // fallback ensures NOT NULL
      });
    } catch (err) {
      console.error(`Failed to upsert profile for ${user.auth_uid}:`, err);
    }
  }

  console.log(`✅ Ensured profiles exist for ${users.length} users`);
}
