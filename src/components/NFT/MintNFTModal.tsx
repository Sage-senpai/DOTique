// 5. NEW: src/components/NFT/MintNFTModal.tsx
// =====================================================
import React, { useState } from "react";
import { X } from "lucide-react";
import "./MintNFTModal.scss";

interface MintNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMint: (data: MintFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface MintFormData {
  name: string;
  description: string;
  price: string;
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  royalty: string;
  image: File | null;
}

const MintNFTModal: React.FC<MintNFTModalProps> = ({
  isOpen,
  onClose,
  onMint,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<MintFormData>({
    name: "",
    description: "",
    price: "0",
    rarity: "common",
    royalty: "5",
    image: null,
  });

  const [preview, setPreview] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onMint(formData);
      setFormData({
        name: "",
        description: "",
        price: "0",
        rarity: "common",
        royalty: "5",
        image: null,
      });
      setPreview("");
      onClose();
    } catch (error) {
      console.error("Mint error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mint-modal-overlay" onClick={onClose}>
      <div className="mint-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mint-modal__header">
          <h3>Mint NFT</h3>
          <button className="mint-modal__close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mint-modal__form">
          {/* Image Upload */}
          <div className="mint-modal__field">
            <label>Upload Image</label>
            {preview ? (
              <div className="mint-modal__preview">
                <img src={preview} alt="preview" />
              </div>
            ) : (
              <div className="mint-modal__upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="image-upload"
                  style={{ display: "none" }}
                />
                <label htmlFor="image-upload" className="mint-modal__upload-btn">
                  📸 Choose Image
                </label>
              </div>
            )}
          </div>

          {/* Name */}
          <div className="mint-modal__field">
            <label>NFT Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g., Cosmic Dreams #1"
              required
            />
          </div>

          {/* Description */}
          <div className="mint-modal__field">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe your NFT..."
              rows={3}
            />
          </div>

          {/* Price & Rarity Row */}
          <div className="mint-modal__row">
            <div className="mint-modal__field">
              <label>Price (DOT)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div className="mint-modal__field">
              <label>Rarity</label>
              <select
                value={formData.rarity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rarity: e.target.value as any,
                  })
                }
              >
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
              </select>
            </div>
          </div>

          {/* Royalty */}
          <div className="mint-modal__field">
            <label>Royalty %</label>
            <input
              type="number"
              value={formData.royalty}
              onChange={(e) =>
                setFormData({ ...formData, royalty: e.target.value })
              }
              min="0"
              max="25"
              placeholder="5"
            />
          </div>

          {/* Actions */}
          <div className="mint-modal__actions">
            <button
              type="button"
              className="mint-modal__btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mint-modal__btn-primary"
              disabled={isLoading || !formData.name || !formData.image}
            >
              {isLoading ? "Minting..." : "💎 Mint NFT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MintNFTModal;