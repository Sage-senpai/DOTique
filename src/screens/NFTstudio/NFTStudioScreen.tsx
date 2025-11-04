// src/screens/Studio/NFTStudioScreen.tsx - ENHANCED WITH UNIQUE NETWORK
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CanvasStudio from "./CanvasStudio";
import useStudioStore from "../../stores/useStudioStore";
import { uploadToIPFS } from "../../services/ipfsService";
import { useMintNFT, type MintResponse } from "../../hooks/useMint";
import "./NFTStudioScreen.scss";

export default function NFTStudioScreen() {
  const { project, canvasRef, setProject, resetProject } = useStudioStore();
  const [isExporting, setIsExporting] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [metadata, setMetadata] = useState({
    name: "",
    description: "",
    royalty: 5,
    edition: 1,
    attributes: [] as Array<{ trait_type: string; value: string }>,
  });
  const mint = useMintNFT();
  const navigate = useNavigate();

  // Export from canvas + upload to IPFS
  const onExportAndMint = useCallback(async () => {
    try {
      if (!project || !canvasRef) throw new Error("No project or canvas");
      setIsExporting(true);

      const exported = await canvasRef.exportAssets?.({ size: 1000 });
      if (!exported) throw new Error("Export failed");

      console.log("📦 Uploading to IPFS...");

      // Upload PNG
      const pngUpload = await uploadToIPFS({
        content: exported.pngBase64,
        fileName: `${project.name || "dotique_design"}.png`,
        contentType: "image/png",
      });

      // Upload SVG
      const svgUpload = await uploadToIPFS({
        content: exported.svgString,
        fileName: `${project.name || "dotique_design"}.svg`,
        contentType: "image/svg+xml",
      });

      console.log("✅ Uploaded to IPFS:", { png: pngUpload.url, svg: svgUpload.url });

      // Update project assets
      setProject({
        ...project,
        assets: {
          png: pngUpload.url,
          svg: svgUpload.url,
        },
      });

      // Initialize metadata
      setMetadata({
        name: project.name || "DOTique Design",
        description: project.description || "Digital fashion NFT created on DOTique",
        royalty: 5,
        edition: 1,
        attributes: [
          { trait_type: "Category", value: "Fashion" },
          { trait_type: "Style", value: "Digital" },
        ],
      });

      setShowMetadataModal(true);
    } catch (err: any) {
      console.error("❌ Export error:", err);
      alert(err?.message || "Export error");
    } finally {
      setIsExporting(false);
    }
  }, [project, canvasRef, setProject]);

  // Handle minting with Unique Network
  const onMintConfirm = useCallback(async () => {
    if (!project) return;

    try {
      setIsExporting(true);

      // Prepare metadata for Unique Network
      const fullMetadata = {
        name: metadata.name,
        description: metadata.description,
        image: project.assets?.png,
        svg: project.assets?.svg,
        attributes: metadata.attributes,
        external_url: `https://dotique.app/nft/`, // Will be filled with token ID
        // Unique Network specific fields
        royalties: {
          version: 1,
          splitPercentage: [
            {
              address: "YOUR_WALLET_ADDRESS", // Replace with actual address
              percent: metadata.royalty,
            },
          ],
        },
      };

      console.log("🎨 Minting NFT with metadata:", fullMetadata);

      const res: MintResponse = await mint.mint({
        metadata: fullMetadata,
        royalty: metadata.royalty,
        edition: metadata.edition,
      });

      console.log("✅ Mint response:", res);

      alert(`✅ Successfully minted! Token ID: ${res.tokenId}`);
      resetProject();
      setShowMetadataModal(false);

      // Navigate to NFT detail
      navigate(`/nft/${res.nftId ?? res.tokenId}`);
    } catch (err: any) {
      console.error("❌ Mint error:", err);
      alert(err?.message || "Mint failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }, [mint, project, metadata, resetProject, navigate]);

  const addAttribute = () => {
    setMetadata({
      ...metadata,
      attributes: [...metadata.attributes, { trait_type: "", value: "" }],
    });
  };

  const updateAttribute = (index: number, field: "trait_type" | "value", value: string) => {
    const newAttributes = [...metadata.attributes];
    newAttributes[index][field] = value;
    setMetadata({ ...metadata, attributes: newAttributes });
  };

  const removeAttribute = (index: number) => {
    setMetadata({
      ...metadata,
      attributes: metadata.attributes.filter((_, i) => i !== index),
    });
  };

  return (
    <motion.div
      className="nftstudio"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="nftstudio__header">🎨 NFT Design Studio</h2>
      <p className="nftstudio__subheader">Create unique fashion NFTs on Unique Network</p>

      <div className="nftstudio__canvas">
        <CanvasStudio />
      </div>

      <div className="nftstudio__actions">
        <button className="btn ghost" onClick={() => alert("Save feature coming soon!")}>
          💾 Save Draft
        </button>
        <button className="btn primary" onClick={onExportAndMint} disabled={isExporting}>
          {isExporting ? "⏳ Exporting..." : "🚀 Export & Mint"}
        </button>
      </div>

      {/* Enhanced Metadata Modal */}
      {showMetadataModal && project && (
        <div className="modal-overlay" onClick={() => setShowMetadataModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>NFT Metadata</h3>
              <button className="modal__close" onClick={() => setShowMetadataModal(false)}>
                ✕
              </button>
            </div>

            <div className="modal__body">
              {/* Preview */}
              <div className="modal__preview">
                {project.assets?.png && (
                  <img src={project.assets.png} alt="NFT Preview" />
                )}
              </div>

              {/* Name */}
              <div className="modal__field">
                <label>Name *</label>
                <input
                  type="text"
                  value={metadata.name}
                  onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                  placeholder="e.g., Cyber Fashion #1"
                />
              </div>

              {/* Description */}
              <div className="modal__field">
                <label>Description</label>
                <textarea
                  value={metadata.description}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                  placeholder="Describe your NFT..."
                  rows={3}
                />
              </div>

              {/* Royalty */}
              <div className="modal__row">
                <div className="modal__field">
                  <label>Royalty %</label>
                  <input
                    type="number"
                    value={metadata.royalty}
                    onChange={(e) => setMetadata({ ...metadata, royalty: Number(e.target.value) })}
                    min="0"
                    max="50"
                  />
                </div>

                {/* Edition Size */}
                <div className="modal__field">
                  <label>Edition Size</label>
                  <input
                    type="number"
                    value={metadata.edition}
                    onChange={(e) => setMetadata({ ...metadata, edition: Number(e.target.value) })}
                    min="1"
                  />
                </div>
              </div>

              {/* Attributes */}
              <div className="modal__section">
                <div className="modal__section-header">
                  <label>Attributes</label>
                  <button className="btn-small" onClick={addAttribute}>
                    + Add
                  </button>
                </div>

                {metadata.attributes.map((attr, index) => (
                  <div key={index} className="modal__attribute">
                    <input
                      type="text"
                      placeholder="Trait (e.g., Style)"
                      value={attr.trait_type}
                      onChange={(e) => updateAttribute(index, "trait_type", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g., Cyberpunk)"
                      value={attr.value}
                      onChange={(e) => updateAttribute(index, "value", e.target.value)}
                    />
                    <button className="btn-remove" onClick={() => removeAttribute(index)}>
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="modal__info">
                <p>💡 Your NFT will be minted on Unique Network with:</p>
                <ul>
                  <li>✅ On-chain metadata</li>
                  <li>✅ Royalty enforcement</li>
                  <li>✅ Decentralized storage (IPFS)</li>
                  <li>✅ Cross-chain compatibility</li>
                </ul>
              </div>
            </div>

            <div className="modal__footer">
              <button className="btn ghost" onClick={() => setShowMetadataModal(false)}>
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={onMintConfirm}
                disabled={isExporting || !metadata.name}
              >
                {isExporting ? "⏳ Minting..." : "🎨 Mint NFT"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}