/**
 * 🌐 Unified IPFS Service (Vite + React + TS)
 * 
 * ✅ Works in browser environments (no React Native dependencies)
 * ✅ Uploads metadata/images via Pinata, Infura, or backend route
 * ✅ Pins redundancy copy on Crust (JWT or wallet signature)
 */

import { web3FromAddress } from "@polkadot/extension-dapp";
import { stringToU8a, u8aToHex } from "@polkadot/util";

// Minimal local type definitions
type SignerResult = { signature: string; id?: string };
type SignerPayloadRaw = { address: string; data: string; type: string };

// ------------------
// ⚙️ Configuration
// ------------------
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:4000";
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT || "";
const CRUST_JWT = import.meta.env.VITE_CRUST_JWT || "";
const PINATA_ENDPOINT = "https://api.pinata.cloud/pinning";

// ------------------
// 🔌 Lazy Infura client loader
// ------------------
let infuraClient: any = null;

async function getInfuraClient() {
  if (!infuraClient) {
    const { create } = await import("ipfs-http-client");
    infuraClient = create({
      url: "https://ipfs.infura.io:5001/api/v0",
    });
  }
  return infuraClient;
}

// ------------------
// 📦 Upload JSON (Pinata)
// ------------------
export async function uploadJSON(metadata: object): Promise<string> {
  const res = await fetch(`${PINATA_ENDPOINT}/pinJSONToIPFS`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) throw new Error("❌ Pinata JSON upload failed");
  const data = await res.json();
  return data.IpfsHash;
}

// ------------------
// 🖼️ Upload via Infura
// ------------------
export async function uploadToInfura(uri: string): Promise<string> {
  const client = await getInfuraClient();
  const response = await fetch(uri);
  const blob = await response.blob();
  const result = await client.add(blob);
  return `https://ipfs.infura.io/ipfs/${result.path}`;
}

// ------------------
// 🚀 Upload via Backend (Web Fallback)
// ------------------
export interface UploadArgs {
  content: string;
  fileName?: string;
  contentType?: string;
}

export async function uploadToIPFS({
  content,
  fileName = "asset.png",
  contentType = "image/png",
}: UploadArgs) {
  const res = await fetch(`${SERVER_URL}/api/upload-ipfs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, fileName, contentType }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`IPFS upload failed: ${txt}`);
  }

  const body = await res.json();
  return {
    url: body.ipfsUrl,
    gateway: body.gatewayUrl,
    raw: body,
  };
}

// ------------------
// 🪶 Crust Integration
// ------------------
export async function generateCrustAuth(address: string) {
  const injector = await web3FromAddress(address);
  const signRaw = injector?.signer?.signRaw as
    | ((raw: SignerPayloadRaw) => Promise<SignerResult>)
    | undefined;

  if (!signRaw) throw new Error("❌ Wallet does not support raw signing.");

  const message = `crust-pinning-${Date.now()}`;
  const { signature } = await signRaw({
    address,
    data: u8aToHex(stringToU8a(message)),
    type: "bytes",
  });

  return `sub-${address}:${signature}`;
}

export async function pinToCrust(ipfsHash: string, walletAddress?: string) {
  try {
    let authHeader = CRUST_JWT;

    if (!authHeader && walletAddress) {
      authHeader = await generateCrustAuth(walletAddress);
    }

    if (!authHeader) {
      console.warn("⚠️ No Crust JWT or wallet signature — skipping Crust pinning.");
      return null;
    }

    const res = await fetch("https://pin.crustcode.com/psa/pins", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authHeader}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cid: ipfsHash,
        name: `crust-pin-${Date.now()}`,
      }),
    });

    if (!res.ok) throw new Error(await res.text());

    const data = await res.json();
    console.log("✅ Pinned to Crust:", data);
    return data;
  } catch (error) {
    console.error("❌ Crust pinning error:", error);
    return null;
  }
}

// ------------------
// 🧠 Combined Metadata Flow
// ------------------
export async function uploadProfileMetadata(
  profileData: any,
  imageUri?: string,
  walletAddress?: string
) {
  let imageUrl: string | undefined;

  if (imageUri) {
    try {
      imageUrl = await uploadToInfura(imageUri);
    } catch {
      console.warn("Infura upload failed, falling back to backend...");

      const response = await fetch(imageUri);
      const arrayBuffer = await response.arrayBuffer();
      const base64Data = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;

      const serverRes = await uploadToIPFS({ content: base64Data });
      imageUrl = serverRes.gateway;
    }
  }

  const metadata = {
    ...profileData,
    ...(imageUrl ? { image: imageUrl } : {}),
    timestamp: new Date().toISOString(),
  };

  const cid = await uploadJSON(metadata);
  await pinToCrust(cid, walletAddress);

  return {
    metadataUrl: `https://gateway.pinata.cloud/ipfs/${cid}`,
    imageUrl,
    crustPinned: true,
  };
}

console.log("✅ IPFS Service ready (Pinata + Infura + Crust + Backend)");
