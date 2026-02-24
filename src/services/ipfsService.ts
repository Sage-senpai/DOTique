import { web3FromAddress } from "@polkadot/extension-dapp";
import { stringToU8a, u8aToHex } from "@polkadot/util";
import { withRetry } from "./retryService";

export interface IPFSUploadResult {
  url: string;
  cid: string;
  gateway: string;
}

type SignerResult = { signature: string; id?: string };
type SignerPayloadRaw = { address: string; data: string; type: string };

export interface UploadArgs {
  content: string;
  fileName?: string;
  contentType?: string;
}

// On HTTPS deployments, fallback to a relative path so the browser doesn't
// generate a Mixed Content error from an http://localhost URL.
const _rawServerUrl = import.meta.env.VITE_SERVER_URL as string | undefined;
const SERVER_URL =
  _rawServerUrl ??
  (typeof window !== "undefined" && window.location.protocol === "https:"
    ? ""  // relative paths work on Vercel/Netlify with rewrite rules
    : "http://localhost:4000");
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT || "";
const CRUST_JWT = import.meta.env.VITE_CRUST_JWT || "";
const PINATA_ENDPOINT = "https://api.pinata.cloud/pinning";

class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

const shouldRetryUpload = (error: unknown) => {
  if (error instanceof HttpError) {
    return error.status === 429 || error.status >= 500;
  }

  // Retry network errors from fetch (TypeError) by default.
  return true;
};

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

export async function uploadJSON(metadata: object): Promise<string> {
  return withRetry(
    async () => {
      const res = await fetch(`${PINATA_ENDPOINT}/pinJSONToIPFS`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });

      if (!res.ok) {
        throw new HttpError(res.status, "Pinata JSON upload failed");
      }

      const data = await res.json();
      return data.IpfsHash;
    },
    {
      retries: 2,
      shouldRetry: shouldRetryUpload,
    }
  );
}

export async function uploadToInfura(uri: string): Promise<string> {
  const client = await getInfuraClient();
  const response = await fetch(uri);
  const blob = await response.blob();
  const result = await client.add(blob);
  return `https://ipfs.infura.io/ipfs/${result.path}`;
}

export async function uploadToIPFSBackend({
  content,
  fileName = "asset.png",
  contentType = "image/png",
}: UploadArgs) {
  let blob: Blob;

  if (content.startsWith("data:")) {
    const base64Data = content.split(",")[1];
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    blob = new Blob([new Uint8Array(byteNumbers)], { type: contentType });
  } else {
    blob = new Blob([content], { type: contentType });
  }

  const formData = new FormData();
  formData.append("file", blob, fileName);

  return withRetry(
    async () => {
      const res = await fetch(`${SERVER_URL}/api/ipfs/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new HttpError(res.status, `IPFS upload failed: ${txt}`);
      }

      const body = await res.json();
      return {
        url: body.url || body.ipfsUrl,
        gateway: body.gateway || body.gatewayUrl,
        raw: body,
      };
    },
    {
      retries: 2,
      shouldRetry: shouldRetryUpload,
    }
  );
}

export async function uploadToIPFS({
  content,
  fileName,
  contentType = "image/png",
}: {
  content: string;
  fileName: string;
  contentType?: string;
}): Promise<IPFSUploadResult> {
  try {
    let blob: Blob;

    if (content.startsWith("data:")) {
      const base64Data = content.split(",")[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      blob = new Blob([byteArray], { type: contentType });
    } else {
      blob = new Blob([content], { type: contentType });
    }

    const formData = new FormData();
    formData.append("file", blob, fileName);

    const data = await withRetry(
      async () => {
        const response = await fetch("/api/ipfs/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new HttpError(
            response.status,
            error.message || "IPFS upload failed"
          );
        }

        return response.json();
      },
      {
        retries: 2,
        shouldRetry: shouldRetryUpload,
      }
    );

    return {
      url: `ipfs://${data.cid}`,
      cid: data.cid,
      gateway: `https://gateway.pinata.cloud/ipfs/${data.cid}`,
    };
  } catch (error) {
    console.error("IPFS upload error:", error);
    throw error;
  }
}

export async function uploadJSONToIPFS(json: object): Promise<IPFSUploadResult> {
  try {
    const data = await withRetry(
      async () => {
        const response = await fetch("/api/ipfs/upload-json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new HttpError(
            response.status,
            error.message || "IPFS upload failed"
          );
        }

        return response.json();
      },
      {
        retries: 2,
        shouldRetry: shouldRetryUpload,
      }
    );

    return {
      url: `ipfs://${data.cid}`,
      cid: data.cid,
      gateway: `https://gateway.pinata.cloud/ipfs/${data.cid}`,
    };
  } catch (error) {
    console.error("IPFS JSON upload error:", error);
    throw error;
  }
}

export async function generateCrustAuth(address: string) {
  const injector = await web3FromAddress(address);
  const signRaw = injector?.signer?.signRaw as
    | ((raw: SignerPayloadRaw) => Promise<SignerResult>)
    | undefined;

  if (!signRaw) {
    throw new Error("Wallet does not support raw signing.");
  }

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
      console.warn("No Crust JWT or wallet signature. Skipping Crust pinning.");
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

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();
    console.log("Pinned to Crust:", data);
    return data;
  } catch (error) {
    console.error("Crust pinning error:", error);
    return null;
  }
}

function toBase64(arrayBuffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(arrayBuffer);

  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

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
      const base64Data = `data:image/png;base64,${toBase64(arrayBuffer)}`;

      const serverRes = await uploadToIPFS({
        content: base64Data,
        fileName: "fallback.png",
      });
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

