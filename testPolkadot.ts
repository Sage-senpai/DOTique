// testPolkadot.ts
import { ApiPromise, WsProvider } from '@polkadot/api';

async function testConnection() {
  try {
    const url = process.env.VITE_POLKADOT_RPC_URL || 'wss://rpc.polkadot.io';
    console.log('Testing Polkadot RPC URL:', url);
    const provider = new WsProvider(url);
    const api = await ApiPromise.create({ provider });
    const chain = await api.rpc.system.chain();
    console.log('✅ Connected to chain:', chain.toString());
    await api.disconnect();
  } catch (err) {
    console.error('❌ testConnection failed:', err);
    process.exit(1);
  }
}

testConnection();
