// src/screens/Profile/EditProfileScreen.tsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import { uploadProfileMetadata } from "../../services/ipfsService";
import { connectPolkadotWallets } from "../../services/polkadotService";
import { socialService } from "../../services/socialService";
import { upsertUserProfile } from "../../services/profileService";
import "./profile.scss";



type PrivacySetting = "Public" | "Private" | "Friends Only";
type EditProfileForm = {
  display_name: string;
  username: string;
  bio: string;
  location: string;
  birthday: string;
  fashion_archetype: string;
  profile_privacy: PrivacySetting;
};

export default function EditProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const navigate = useNavigate();

  const { control, handleSubmit, setValue, watch } = useForm<EditProfileForm>({
    defaultValues: {
      display_name: profile?.display_name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      birthday: profile?.birthday || "",
      fashion_archetype: profile?.fashion_archetype || "",
      profile_privacy: (profile?.profile_privacy as PrivacySetting) || "Public",
    },
  });

  const [primaryWallet, setPrimaryWallet] = useState(profile?.primary_wallet || "");
  const [connectedWallets, setConnectedWallets] = useState<string[]>(profile?.connected_wallets || []);
  const [uploading, setUploading] = useState(false);
  const [imageUri, setImageUri] = useState(profile?.dotvatar_url || "");

  const archetypeOptions = [
    { label: "Avant-Garde", value: "Avant-Garde" },
    { label: "Streetwear Pioneer", value: "Streetwear Pioneer" },
    { label: "Minimalist", value: "Minimalist" },
    { label: "Retro Futurist", value: "Retro Futurist" },
  ];

  const privacyOptions = [
    { label: "Public", value: "Public" },
    { label: "Private", value: "Private" },
    { label: "Friends Only", value: "Friends Only" },
  ];


  const handleConnectWallet = async () => {
    try {
      const wallets = await connectPolkadotWallets();
      const newAddresses = wallets.map((w: { address: string }) => w.address);
      setConnectedWallets(newAddresses);
      if (!primaryWallet && newAddresses.length > 0) setPrimaryWallet(newAddresses[0]);
      alert(`${newAddresses.length} wallet(s) linked successfully.`);
    } catch (err: any) {
      alert(err.message || "Connection failed");
    }
  };

  const handlePickImage = async (file?: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUri(url);
    }
  };

  const onSubmit = async (values: any) => {
  setUploading(true);
  try {
    // 1️⃣ Upload metadata + image to IPFS
    const { metadataUrl, imageUrl } = await uploadProfileMetadata(
      { ...values, primary_wallet: primaryWallet, connected_wallets: connectedWallets },
      imageUri
    );

    const updates = {
      ...values,
      primary_wallet: primaryWallet,
      connected_wallets: connectedWallets,
      dotvatar_url: imageUrl,
      ipfs_metadata: metadataUrl,
    };

    // 2️⃣ Update Supabase "users" table
    const { data: userData, error } = await supabase
      .from("users")
      .update(updates)
      .eq("auth_uid", profile?.auth_uid)
      .select()
      .single();
    if (error) throw error;
    setProfile(userData);

    // 3️⃣ Ensure a "profiles" row exists (new unified call)
    const profileRow = await upsertUserProfile({
      auth_uid: profile?.auth_uid,
      username: values.username,
      display_name: values.display_name,
      dotvatar_url: imageUrl,
    });

    // 4️⃣ Update via socialService
    await socialService.updateUserProfile(profileRow.id, {
      username: values.username,
      display_name: values.display_name,
    });

    // 5️⃣ Refresh session + refetch user
    await supabase.auth.refreshSession();
    const { data: refreshedUser, error: refreshError } = await supabase
      .from("users")
      .select("*")
      .eq("auth_uid", profile?.auth_uid)
      .single();
    if (refreshError) console.warn("Refresh fetch failed:", refreshError);
    if (refreshedUser) setProfile(refreshedUser);

    alert("✅ Profile Updated — saved to IPFS + Supabase + Profiles.");
    navigate(-1);
  } catch (err: any) {
    alert(err.message || "Error saving profile");
  } finally {
    setUploading(false);
  }
};


  return (
    <motion.div
      className="edit-profile-screen"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="edit-profile-screen__header">
        <button
          className="edit-profile-screen__back"
          onClick={() => navigate(-1)}
        >
          ←
        </button>
        <h2 className="edit-profile-screen__title">Edit Profile</h2>
        <button
          className="edit-profile-screen__save-btn"
          onClick={handleSubmit(onSubmit)}
          disabled={uploading}
        >
          ✓
        </button>
      </div>

      <form className="edit-profile-screen__form">
        <div className="edit-profile-screen__avatar-section">
          {uploading ? (
            <div className="edit-profile-screen__spinner" />
          ) : (
            <>
              {imageUri ? (
                <img
                  src={imageUri}
                  alt="avatar"
                  className="edit-profile-screen__avatar"
                />
              ) : (
                <div className="edit-profile-screen__avatar-placeholder">
                  🪞
                </div>
              )}
              <div className="edit-profile-screen__avatar-edit-icon">✏️</div>
            </>
          )}

          <label className="edit-profile-screen__upload-label">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handlePickImage(f);
              }}
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="edit-profile-screen__upload-btn"
            >
              Upload Avatar
            </button>
          </label>
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Name</label>
          <Controller
            control={control}
            name="display_name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input
                {...field}
                className="edit-profile-screen__input"
                placeholder="Your name"
              />
            )}
          />
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Email Address</label>
          <input
            type="email"
            value={profile?.email || ""}
            disabled
            className="edit-profile-screen__input edit-profile-screen__input--disabled"
          />
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">User name</label>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Username required",
              minLength: { value: 3, message: "Min 3 chars" },
            }}
            render={({ field }) => (
              <input
                {...field}
                className="edit-profile-screen__input"
                placeholder="@username"
              />
            )}
          />
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Password</label>
          <div className="edit-profile-screen__password-wrapper">
            <input
              type="password"
              placeholder="••••••••"
              disabled
              className="edit-profile-screen__input edit-profile-screen__input--disabled"
            />
            <button type="button" className="edit-profile-screen__password-toggle">
              👁️
            </button>
          </div>
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Phone number</label>
          <div className="edit-profile-screen__phone-wrapper">
            <select className="edit-profile-screen__country-code">
              <option>+91</option>
            </select>
            <input
              type="tel"
              className="edit-profile-screen__input"
              placeholder="6895312"
            />
          </div>
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Bio</label>
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <textarea
                {...field}
                className="edit-profile-screen__input edit-profile-screen__textarea"
                placeholder="Describe your fashion style..."
              />
            )}
          />
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Location</label>
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <input
                {...field}
                className="edit-profile-screen__input"
                placeholder="City or Country"
              />
            )}
          />
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Birthday</label>
          <input
            type="date"
            value={watch("birthday") || ""}
            onChange={(e) => setValue("birthday", e.target.value)}
            className="edit-profile-screen__input"
          />
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Fashion Archetype</label>
          <select
            value={watch("fashion_archetype")}
            onChange={(e) => setValue("fashion_archetype", e.target.value)}
            className="edit-profile-screen__input"
          >
            <option value="">Select Archetype</option>
            {archetypeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Primary Wallet</label>
          <div className="edit-profile-screen__wallet-display">
            {primaryWallet || "Not connected"}
          </div>
          <button
            type="button"
            className="edit-profile-screen__wallet-btn"
            onClick={handleConnectWallet}
          >
            Connect Wallet
          </button>
        </div>

        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Profile Privacy</label>
          <select
  value={watch("profile_privacy")}
  onChange={(e) => setValue("profile_privacy", e.target.value as PrivacySetting)}
  className="edit-profile-screen__input"
>
  {privacyOptions.map((o) => (
    <option key={o.value} value={o.value}>
      {o.label}
    </option>
  ))}
</select>

        </div>

        <button
          type="submit"
          className="edit-profile-screen__submit"
          disabled={uploading}
          onClick={handleSubmit(onSubmit)}
        >
          {uploading ? "Saving..." : "💾 Save Changes"}
        </button>
      </form>

      
    </motion.div>
  );

  
}   
// ------------------------------
// 🔹 Migration snippet: retroactively populate missing profiles
// ------------------------------
export async function migrateMissingProfiles() {
  const { data: users, error } = await supabase.from("users").select("*");
  if (error) {
    console.error("Failed to fetch users:", error);
    return;
  }

  for (const user of users) {
    const { data: profileRow } = await supabase
      .from("profiles")
      .select("*")
      .eq("auth_uid", user.auth_uid)
      .maybeSingle();

    if (!profileRow) {
      const { error: insertError } = await supabase.from("profiles").insert([
        {
          auth_uid: user.auth_uid,
          username: user.username || "",
          display_name: user.display_name || "",
          dotvatar_url: user.dotvatar_url || "",
        },
      ]);
      if (insertError) console.error(`Failed to insert profile for ${user.auth_uid}:`, insertError);
      else console.log(`Inserted missing profile for ${user.auth_uid}`);
    }
  }
}