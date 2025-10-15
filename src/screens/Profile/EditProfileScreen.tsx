import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { supabase } from "../../services/supabase";
import { uploadProfileMetadata } from "../../services/ipfsService";
import { connectPolkadotWallets } from "../../services/polkadotService";
import "./profile.scss";

export default function EditProfileScreen() {
  const profile = useAuthStore((s) => s.profile);
  const setProfile = useAuthStore((s) => s.setProfile);
  const navigate = useNavigate();

  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      display_name: profile?.display_name || "",
      username: profile?.username || "",
      bio: profile?.bio || "",
      location: profile?.location || "",
      birthday: profile?.birthday || "",
      fashion_archetype: profile?.fashion_archetype || "",
      profile_privacy: profile?.profile_privacy || "Public",
    },
  });

  const [showPicker, setShowPicker] = useState(false);
  const [primaryWallet, setPrimaryWallet] = useState(profile?.primary_wallet || "");
  const [connectedWallets, setConnectedWallets] = useState<string[]>(profile?.connected_wallets || []);
  const [uploading, setUploading] = useState(false);
  const [imageUri, setImageUri] = useState(profile?.dotvatar_url || "");
  const [archetypeOpen, setArchetypeOpen] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);

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

  // web-friendly image picker (fallback to file input)
  const handlePickImage = async (file?: File | null) => {
    if (file) {
      // In a real app you'd upload to IPFS or store locally; here we create object URL
      const url = URL.createObjectURL(file);
      setImageUri(url);
    } else {
      // nothing
    }
  };

  const handleDateChange = (dateStr: string) => {
    setValue("birthday", dateStr);
  };

  const onSubmit = async (values: any) => {
    setUploading(true);
    try {
      const { metadataUrl, imageUrl } = await uploadProfileMetadata(
        {
          ...values,
          primary_wallet: primaryWallet,
          connected_wallets: connectedWallets,
        },
        imageUri
      );

      const updates = {
        ...values,
        primary_wallet: primaryWallet,
        connected_wallets: connectedWallets,
        dotvatar_url: imageUrl,
        ipfs_metadata: metadataUrl,
      };

      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("auth_uid", profile?.auth_uid)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      alert("✅ Profile Updated — saved to IPFS + Supabase.");
      navigate(-1);
    } catch (err: any) {
      alert(err.message || "Error saving profile");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-container">
      <form className="edit-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(); }}>
        <h3 className="section-title">Edit Profile</h3>

        <div className="card avatar-card">
          {uploading ? (
            <div className="spinner" />
          ) : (
            <>
              {imageUri ? (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                <img src={imageUri} alt="avatar" className="profile-avatar" />
              ) : (
                <div className="avatar-placeholder">🪞</div>
              )}

              <label className="file-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handlePickImage(f);
                  }}
                  style={{ display: "none" }}
                />
                <button type="button" className="btn edit" onClick={() => { /* click handled by label */ }}>
                  Upload Avatar
                </button>
              </label>
            </>
          )}
        </div>

        <div className="card">
          <label className="card-label">Display Name</label>
          <Controller
            control={control}
            name="display_name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <input className="card-input" {...field} placeholder="Your name" />
            )}
          />
        </div>

        <div className="card">
          <label className="card-label">Username</label>
          <Controller
            control={control}
            name="username"
            rules={{ required: "Username required", minLength: { value: 3, message: "Min 3 chars" } }}
            render={({ field }) => <input className="card-input" {...field} placeholder="Unique username" />}
          />
        </div>

        <div className="card">
          <label className="card-label">Bio</label>
          <Controller
            control={control}
            name="bio"
            render={({ field }) => <textarea className="card-input" {...field} style={{ height: 80 }} placeholder="Describe your fashion style..." />}
          />
        </div>

        <div className="card">
          <label className="card-label">Location</label>
          <Controller control={control} name="location" render={({ field }) => <input className="card-input" {...field} placeholder="City or Country" />} />
        </div>

        <div className="card">
          <label className="card-label">Birthday</label>
          <input className="card-input" type="date" value={watch("birthday") || ""} onChange={(e) => handleDateChange(e.target.value)} />
        </div>

        <div className="card">
          <label className="card-label">Fashion Archetype</label>
          <select className="card-input" value={watch("fashion_archetype")} onChange={(e) => setValue("fashion_archetype", e.target.value)}>
            <option value="">Select Archetype</option>
            {archetypeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="card">
          <label className="card-label">Primary Wallet</label>
          <div className="card-value">{primaryWallet || "Not connected"}</div>
          <button type="button" className="btn edit" onClick={handleConnectWallet}>Connect Wallet</button>
        </div>

        <div className="card">
          <label className="card-label">Profile Privacy</label>
          <select className="card-input" value={watch("profile_privacy")} onChange={(e) => setValue("profile_privacy", e.target.value)}>
            {privacyOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div style={{ marginTop: 20 }}>
          <button type="submit" className="btn edit" disabled={uploading}>💾 Save Changes</button>
        </div>
      </form>
    </div>
  );
}
