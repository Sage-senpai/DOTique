/**
 * 🌐 Unified IPFS Service (Vite + React + TS)
 *
 * ✅ Works in browser environments (no React Native dependencies)
 * ✅ Uploads metadata/images via Pinata, Infura, or backend route
 * ✅ Pins redundancy copy on Crust (JWT or wallet signature)
 */
export declare function uploadJSON(metadata: object): Promise<string>;
export declare function uploadToInfura(uri: string): Promise<string>;
export interface UploadArgs {
    content: string;
    fileName?: string;
    contentType?: string;
}
export declare function uploadToIPFS({ content, fileName, contentType, }: UploadArgs): Promise<{
    url: any;
    gateway: any;
    raw: any;
}>;
export declare function generateCrustAuth(address: string): Promise<string>;
export declare function pinToCrust(ipfsHash: string, walletAddress?: string): Promise<any>;
export declare function uploadProfileMetadata(profileData: any, imageUri?: string, walletAddress?: string): Promise<{
    metadataUrl: string;
    imageUrl: string | undefined;
    crustPinned: boolean;
}>;
//# sourceMappingURL=ipfsService.d.ts.map