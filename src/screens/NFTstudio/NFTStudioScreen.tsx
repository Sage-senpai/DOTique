import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CanvasStudio from "./CanvasStudio";
import useStudioStore from "../../stores/useStudioStore";
import { uploadToIPFS } from "../../services/ipfsService";
import { useMintNFT } from "../../hooks/useMint";
import "./NFTStudioScreen.scss";

export default function NFTStudioScreen() {
  const { project, setProject, resetProject } = useStudioStore();
  const [isExporting, setIsExporting] = useState(false);
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const mint = useMintNFT();
  const navigate = useNavigate();

  const onExportAndMint = useCallback(async () => {
    try {
      if (!project || !project.canvasRef) throw new Error("No project or canvas");
      setIsExporting(true);

      // call canvas export API on ref (the CanvasStudio exposes exportAssets)
      const exported = await project.canvasRef.exportAssets?.({ size: 1000 });

      // Uploads (keep your existing uploadToIPFS semantics)
      const pngUpload = await uploadToIPFS({
        content: exported.pngBase64,
        fileName: `${project.name || "dotique_design"}.png`,
        contentType: "image/png",
      });

      const svgUpload = await uploadToIPFS({
        content: exported.svgString,
        fileName: `${project.name || "dotique_design"}.svg`,
        contentType: "image/svg+xml",
      });

      setProject({
        ...project,
        assets: {
          png: pngUpload.url,
          svg: svgUpload.url,
        },
      });

      setShowMetadataModal(true);
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Export error");
    } finally {
      setIsExporting(false);
    }
  }, [project, setProject]);

  const onMintConfirm = useCallback(
    async (metadata: any) => {
      try {
        setIsExporting(true);
        const fullMetadata = {
          ...metadata,
          image: project.assets?.png,
          svg: project.assets?.svg,
          name: metadata.name ?? project.name ?? "DOTique Design",
          description: metadata.description ?? project.description ?? "",
          attributes: metadata.attributes ?? [],
        };

        const res = await mint.mint({
          metadata: fullMetadata,
          royalty: metadata.royaltyPercent,
          edition: metadata.editionSize ?? 1,
        });

        alert(`Minted ✅ Token: ${res.tokenId}`);
        resetProject();
        setShowMetadataModal(false);
        navigate(`/nft/${res.nftId}`);
      } catch (err: any) {
        console.error(err);
        alert(err?.message || "Mint failed");
      } finally {
        setIsExporting(false);
      }
    },
    [mint, project, resetProject, navigate]
  );

  return (
    <motion.div
      className="nftstudio"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="nftstudio__header">NFT Design Studio (Skia)</h2>

      <div className="nftstudio__canvas">
        <CanvasStudio />
      </div>

      <div className="nftstudio__actions">
        <button className="btn ghost" onClick={() => alert("Saved (stub)")}>Save Draft</button>

        <button className="btn primary" onClick={onExportAndMint} disabled={isExporting}>
          {isExporting ? "Exporting..." : "Export & Mint"}
        </button>
      </div>

      {showMetadataModal && (
        <div className="modal">
          <div className="modal__inner">
            <h3>Mint metadata (quick)</h3>
            <button
              className="btn primary"
              onClick={() =>
                onMintConfirm({
                  name: project.name ?? "DOTique Design",
                  description: project.description ?? "",
                  royaltyPercent: 5,
                  editionSize: 1,
                })
              }
            >
              Confirm Mint (Test values)
            </button>
            <button className="btn ghost" onClick={() => setShowMetadataModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
