// src/components/Posts/CreatePostModal.tsx
import React, { useState } from "react";
import { X, Camera, Image as ImageIcon, Video } from "lucide-react";
import MintNFTModal from "../NFT/MintNFTModal";
import { uploadToIPFS } from "../../services/ipfsService";
import "./CreatePostModal.scss";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePost?: (content: string, imageUrl?: string) => Promise<void>;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onCreatePost,
}) => {
  const [postType, setPostType] = useState<"post" | "nft">("post");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);

  // NFT-specific fields
  const [nftTitle, setNftTitle] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftPrice, setNftPrice] = useState("");
  const [nftRarity, setNftRarity] = useState("common");
  const [royalty, setRoyalty] = useState("5");

  if (!isOpen) return null;

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePostSubmit = async () => {
    if (!content.trim() && !imageFile) return;
    setIsLoading(true);

    try {
      let imageUrl: string | undefined;
      if (imageFile) {
        const uploadResult = await uploadToIPFS({
          content: imagePreview,
          fileName: imageFile.name,
          contentType: imageFile.type,
        });
        imageUrl = uploadResult.url;
      }

      if (onCreatePost) await onCreatePost(content, imageUrl);

      // Reset
      setContent("");
      setImagePreview("");
      setImageFile(null);
      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setContent("");
    setImagePreview("");
    setImageFile(null);
    setPostType("post");
    setNftTitle("");
    setNftDescription("");
    setNftPrice("");
    setNftRarity("common");
    setRoyalty("5");
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="modal-header">
            <h2>Create {postType === "nft" ? "NFT" : "Post"}</h2>
            <button className="close-btn" onClick={handleClose}>
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="post-type-tabs">
            <button
              className={`tab ${postType === "post" ? "active" : ""}`}
              onClick={() => setPostType("post")}
            >
              Post
            </button>
            <button
              className={`tab ${postType === "nft" ? "active" : ""}`}
              onClick={() => setPostType("nft")}
            >
              Mint NFT
            </button>
          </div>

          {/* ===== POST MODE ===== */}
          {postType === "post" ? (
            <div className="post-form">
              <textarea
                placeholder="What's on your mind? 🎨"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                className="form-textarea"
              />

              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="preview" />
                  <button
                    className="remove-image"
                    onClick={() => {
                      setImagePreview("");
                      setImageFile(null);
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="media-tools">
                <label className="media-btn">
                  <Camera size={18} />
                  <span>Camera</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageSelect(file);
                    }}
                    style={{ display: "none" }}
                  />
                </label>
                <label className="media-btn">
                  <ImageIcon size={18} />
                  <span>Gallery</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageSelect(file);
                    }}
                    style={{ display: "none" }}
                  />
                </label>
                <button className="media-btn" title="Video (coming soon)">
                  <Video size={18} />
                  <span>Video</span>
                </button>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-secondary"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={handlePostSubmit}
                  disabled={isLoading || (!content.trim() && !imageFile)}
                >
                  {isLoading ? "Posting..." : "📝 Post"}
                </button>
              </div>
            </div>
          ) : (
            /* ===== NFT MODE ===== */
            <div className="nft-form">
              <div className="form-group">
                <label>NFT Title *</label>
                <input
                  type="text"
                  placeholder="e.g., Cosmic Dreams #1"
                  value={nftTitle}
                  onChange={(e) => setNftTitle(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Describe your NFT..."
                  value={nftDescription}
                  onChange={(e) => setNftDescription(e.target.value)}
                  rows={4}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label>Price (in DOT)</label>
                <input
                  type="number"
                  placeholder="25"
                  value={nftPrice}
                  onChange={(e) => setNftPrice(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Rarity</label>
                  <select
                    value={nftRarity}
                    onChange={(e) => setNftRarity(e.target.value)}
                    className="form-input"
                  >
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
                <div className="form-group half">
                  <label>Royalty (%)</label>
                  <input
                    type="number"
                    value={royalty}
                    onChange={(e) => setRoyalty(e.target.value)}
                    className="form-input"
                  />
                </div>
              </div>

              <p className="nft-notice">
                When ready, click <strong>"💎 Mint NFT"</strong> to launch the
                minting interface.
              </p>

              <div className="modal-actions">
                <button className="btn-secondary" onClick={handleClose}>
                  Cancel
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setShowMintModal(true)}
                >
                  💎 Mint NFT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* NFT Mint Modal */}
      <MintNFTModal
        isOpen={showMintModal}
        onClose={() => setShowMintModal(false)}
        onMint={async (data) => {
          console.log("Minting NFT:", data);
          // Actual mint logic later
          setShowMintModal(false);
        }}
      />
    </>
  );
};

export default CreatePostModal;
