import { create } from 'ipfs-http-client';

const PINATA_JWT = process.env.PINATA_JWT || '';

const client = create({
  url: 'https://api.pinata.cloud/pinning',
  // If using nft.storage or other provider, instantiate accordingly
});

export async function uploadJSON(metadata: object) {
  // Using pinata/pinning/pinJSONToIPFS endpoint
  const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });
  if (!res.ok) throw new Error('IPFS upload failed');
  const data = await res.json();
  return data.IpfsHash;
}
