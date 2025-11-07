// src/screens/Profile/EditProfileScreen.tsx - FIXED
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import { uploadProfileMetadata } from "../../services/ipfsService";
import { connectPolkadotWallets } from "../../services/polkadotService";
import { COUNTRY_CODES, formatPhoneNumber } from "../../data/countryCodes";
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
  phone_number: string;
  phone_country_code: string;
};

export default function EditProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const navigate = useNavigate();

  // Parse existing phone data
  const existingPhone = profile?.metadata?.phone_number || "";
  const existingCountryCode = profile?.metadata?.phone_country_code || "+234";

  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<EditProfileForm>({
    defaultValues: {
      display_name: profile?.display_name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      birthday: profile?.birthday || "",
      fashion_archetype: profile?.fashion_archetype || "",
      profile_privacy: (profile?.profile_privacy as PrivacySetting) || "Public",
      phone_number: existingPhone,
      phone_country_code: existingCountryCode,
    },
  });

  const [primaryWallet, setPrimaryWallet] = useState(profile?.primary_wallet || "");
  const [connectedWallets, setConnectedWallets] = useState<string[]>(
    profile?.connected_wallets || []
  );
  const [uploading, setUploading] = useState(false);
  const [imageUri, setImageUri] = useState(profile?.dotvatar_url || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saveError, setSaveError] = useState<string>("");

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

  const handlePickImage = async (file: File) => {
    const url = URL.createObjectURL(file);
    setImageUri(url);
    setImageFile(file);
  };

  const onSubmit = async (values: EditProfileForm) => {
    if (!profile?.auth_uid) {
      alert("No profile found. Please log in again.");
      return;
    }

    setUploading(true);
    setSaveError("");
    try {
      console.log("📝 Updating profile...");

      // 1️⃣ Upload to IPFS if image changed
      let imageUrl = profile.dotvatar_url || "";
      let metadataUrl = "";

      if (imageFile) {
        console.log("📤 Uploading to IPFS...");
        const ipfsResult = await uploadProfileMetadata(
          {
            ...values,
            primary_wallet: primaryWallet,
            connected_wallets: connectedWallets,
          },
          imageUri
        );
        imageUrl = ipfsResult.imageUrl;
        metadataUrl = ipfsResult.metadataUrl;
        console.log("✅ IPFS upload complete:", metadataUrl);
      }

      // 2️⃣ Prepare metadata with phone info
      const updatedMetadata = {
        ...(profile.metadata || {}),
        phone_number: values.phone_number,
        phone_country_code: values.phone_country_code,
        ipfs_metadata: metadataUrl || profile.metadata?.ipfs_metadata,
      };

      // 3️⃣ Prepare updates (handle empty values properly)
      const updates: any = {
        display_name: values.display_name,
        username: values.username,
        bio: values.bio || null,
        location: values.location || null,
        birthday: values.birthday || null, // ✅ Convert empty string to null
        fashion_archetype: values.fashion_archetype || null,
        profile_privacy: values.profile_privacy,
        primary_wallet: primaryWallet || null,
        connected_wallets: connectedWallets.length > 0 ? connectedWallets : null,
        dotvatar_url: imageUrl || null,
        metadata: updatedMetadata,
        updated_at: new Date().toISOString(),
      };

      // Remove any undefined values
      Object.keys(updates).forEach(key => {
        if (updates[key] === undefined) {
          delete updates[key];
        }
      });

      console.log("💾 Saving to profiles table...", updates);

      const { data: updatedProfile, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("auth_uid", profile.auth_uid)
        .select()
        .single();

      if (error) {
        console.error("❌ Update error:", error);
        
        // Better error messages
        let errorMessage = error.message;
        if (error.code === '23505') {
          errorMessage = "Username already taken. Please choose another.";
        } else if (error.message.includes('date')) {
          errorMessage = "Invalid date format. Please check the birthday field.";
        } else if (error.message.includes('phone')) {
          errorMessage = "Invalid phone number format.";
        }
        
        throw new Error(errorMessage);
      }

      console.log("✅ Profile updated:", updatedProfile);

      // 4️⃣ Update local store
      setProfile(updatedProfile);

      alert("✅ Profile updated successfully!");
      navigate(-1);
    } catch (err: any) {
      console.error("❌ Save failed:", err);
      const errorMessage = err.message || "Error saving profile. Please try again.";
      setSaveError(errorMessage);
      alert(errorMessage);
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

      <form className="edit-profile-screen__form" onSubmit={handleSubmit(onSubmit)}>
        {/* Error Message */}
        {saveError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="edit-profile-screen__error-banner"
          >
            ❌ {saveError}
          </motion.div>
        )}

        {/* Avatar Section */}
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
              onClick={() => {
                document.querySelector('input[type="file"]')?.dispatchEvent(new MouseEvent('click'));
              }}
            >
              Upload Avatar
            </button>
          </label>
        </div>

        {/* Display Name */}
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
          {errors.display_name && (
            <span className="edit-profile-screen__error">
              {errors.display_name.message}
            </span>
          )}
        </div>

        {/* Email (Read-only) */}
        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Email Address</label>
          <input
            type="email"
            value={profile?.email || ""}
            disabled
            className="edit-profile-screen__input edit-profile-screen__input--disabled"
          />
        </div>

        {/* Username */}
        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Username</label>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Username required",
              minLength: { value: 3, message: "Min 3 chars" },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Only letters, numbers, and underscores"
              }
            }}
            render={({ field }) => (
              <input
                {...field}
                className="edit-profile-screen__input"
                placeholder="@username"
              />
            )}
          />
          {errors.username && (
            <span className="edit-profile-screen__error">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Phone Number (Editable) */}
        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Phone Number</label>
          <div className="edit-profile-screen__phone-wrapper">
            <select
              value={watch("phone_country_code")}
              onChange={(e) => setValue("phone_country_code", e.target.value)}
              className="edit-profile-screen__country-code"
            >
              {COUNTRY_CODES.map((country) => (
                <option key={`${country.code}-${country.iso}`} value={country.code}>
                  {country.flag} {country.code} {country.country}
                </option>
              ))}
            </select>
            <Controller
              control={control}
              name="phone_number"
              rules={{
                validate: (value) => {
                  if (!value) return true; // Allow empty
                  return /^[0-9]{7,15}$/.test(value) || "Enter valid phone number (7-15 digits)";
                }
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="tel"
                  className="edit-profile-screen__input"
                  placeholder="8012345678"
                />
              )}
            />
          </div>
          {errors.phone_number && (
            <span className="edit-profile-screen__error">
              {errors.phone_number.message}
            </span>
          )}
        </div>

        {/* Bio */}
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
                maxLength={200}
              />
            )}
          />
          <span className="edit-profile-screen__char-count">
            {watch("bio")?.length || 0}/200
          </span>
        </div>

        {/* Location */}
        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Location</label>
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <input
                {...field}
                className="edit-profile-screen__input"
                placeholder="Lagos, Nigeria"
              />
            )}
          />
          <small className="edit-profile-screen__hint">
            💡 Tip: Use format "City, Country" for best results
          </small>
        </div>

        {/* Birthday */}
        <div className="edit-profile-screen__field">
          <label className="edit-profile-screen__label">Birthday</label>
          <input
            type="date"
            value={watch("birthday") || ""}
            onChange={(e) => setValue("birthday", e.target.value)}
            className="edit-profile-screen__input"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Fashion Archetype */}
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

        {/* Primary Wallet */}
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
            🔗 Connect Wallet
          </button>
        </div>

        {/* Profile Privacy */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="edit-profile-screen__submit"
          disabled={uploading}
        >
          {uploading ? "Saving..." : "💾 Save Changes"}
        </button>
      </form>
    </motion.div>
  );
}