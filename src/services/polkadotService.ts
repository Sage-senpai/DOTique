import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromAddress } from '@polkadot/extension-dapp';

class PolkadotService {
  api: ApiPromise | null = null;
  provider: WsProvider | null = null;

  async connect(wsEndpoint: string) {
    if (this.api) return this.api;
    this.provider = new WsProvider(wsEndpoint);
    this.api = await ApiPromise.create({ provider: this.provider });
    await this.api.isReady;
    return this.api;
  }

  async mintNFT(collectionId: number, itemId: number, ownerAddress: string, metadataCid: string) {
    if (!this.api) throw new Error('API not connected');
    const injector = await web3FromAddress(ownerAddress);
    // simplified example; real call depends on pallet
    const tx = this.api.tx.nfts.mint(collectionId, itemId, ownerAddress);
    const metaTx = this.api.tx.nfts.setMetadata(collectionId, itemId, `ipfs://${metadataCid}`);
    const batch = this.api.tx.utility.batch([tx, metaTx]);
    return new Promise<string>((resolve, reject) => {
      batch.signAndSend(ownerAddress, { signer: injector.signer }, (result: any) => {
        if (result.status.isFinalized) {
          resolve(result.status.asFinalized.toHex());
        }
      }).catch(reject);
    });
  }
}

export default new PolkadotService();
