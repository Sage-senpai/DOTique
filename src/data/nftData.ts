export interface NFT {
  id: string;
  name: string;
  artist: string;
  image: string;
  type: string;
  rarity: string;
  price: number;
  likes: number;
  comments: number;
  description?: string;
  metadata?: {
    tokenId?: string;
    contract?: string;
    blockchain?: string;
    mintedDate?: string;
    edition?: string;
  };
}

export const dummyNFTs: NFT[] = [
  {
    id: '1',
    name: 'Astral Dreamscape',
    artist: 'Luna Nova',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&q=80',
    type: 'Single',
    rarity: 'Legendary',
    price: 4.5,
    likes: 120,
    comments: 12,
    description: 'A mesmerizing journey through cosmic dimensions',
    metadata: {
      tokenId: '0x1a2b3c',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-15',
    },
  },
  {
    id: '2',
    name: 'CyberCouture Vol.2',
    artist: 'NeoWear Labs',
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&q=80',
    type: 'Collection',
    rarity: 'Epic',
    price: 3.5,
    likes: 145,
    comments: 18,
    description: 'Bio-luminescent flora from parallel dimensions',
    metadata: {
      tokenId: '0x5f6a7b',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-14',
    },
  },
  {
    id: '3',
    name: 'Sound of Aurora',
    artist: 'EchoSynth',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80',
    type: 'Edition',
    rarity: 'Rare',
    price: 1.2,
    likes: 54,
    comments: 4,
    description: 'Generative audio-visual experience',
    metadata: {
      tokenId: '0x3d4e5f',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-20',
      edition: '10/100',
    },
  },
  {
    id: '4',
    name: 'Neon Samurai',
    artist: 'Tokyo Dreams',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    type: 'Single',
    rarity: 'Legendary',
    price: 6.2,
    likes: 203,
    comments: 28,
    description: 'Cyberpunk warrior in a dystopian future',
    metadata: {
      tokenId: '0x4e5f6a',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-12',
    },
  },
  {
    id: '5',
    name: 'Ethereal Gardens',
    artist: 'BotaniX',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
    type: 'Collection',
    rarity: 'Epic',
    price: 2.8,
    likes: 97,
    comments: 6,
    description: 'Digital fashion meets virtual reality',
    metadata: {
      tokenId: '0x2c3d4e',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-18',
    },
  },
  {
    id: '6',
    name: 'Quantum Glitch #42',
    artist: 'DataMosh',
    image: 'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=800&q=80',
    type: 'Edition',
    rarity: 'Rare',
    price: 1.8,
    likes: 89,
    comments: 11,
    description: 'Reality fragmentation captured in digital form',
    metadata: {
      tokenId: '0x6a7b8c',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-21',
      edition: '42/500',
    },
  },
  {
    id: '7',
    name: 'Virtual Penthouse',
    artist: 'MetaSpaces',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    type: 'Virtual Spaces',
    rarity: 'Legendary',
    price: 12.5,
    likes: 312,
    comments: 45,
    description: 'Luxury metaverse real estate with city views',
    metadata: {
      tokenId: '0x7b8c9d',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-10',
    },
  },
  {
    id: '8',
    name: 'Holographic Avatar Set',
    artist: 'PixelForge',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80',
    type: 'Avatars',
    rarity: 'Epic',
    price: 2.2,
    likes: 167,
    comments: 22,
    description: 'Customizable 3D avatars for the metaverse',
    metadata: {
      tokenId: '0x8c9d0e',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-16',
    },
  },
  {
    id: '9',
    name: 'Synthwave Sunset',
    artist: 'RetroWave',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    type: 'Art',
    rarity: 'Rare',
    price: 1.5,
    likes: 76,
    comments: 8,
    description: 'Nostalgic 80s aesthetic in digital format',
    metadata: {
      tokenId: '0x9d0e1f',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-19',
    },
  },
  {
    id: '10',
    name: 'Crypto Punk Jacket',
    artist: 'DigitalThreads',
    image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=800&q=80',
    type: 'Wearables',
    rarity: 'Epic',
    price: 3.8,
    likes: 194,
    comments: 31,
    description: 'Limited edition virtual fashion piece',
    metadata: {
      tokenId: '0xa0e1f2',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-13',
    },
  },
  {
    id: '11',
    name: 'Fractal Symphony',
    artist: 'MathArt Collective',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80',
    type: 'Art',
    rarity: 'Legendary',
    price: 5.7,
    likes: 228,
    comments: 36,
    description: 'Mathematical beauty rendered in infinite detail',
    metadata: {
      tokenId: '0xb1f2a3',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-11',
    },
  },
  {
    id: '12',
    name: 'Bass Drop #808',
    artist: 'SoundScape Labs',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    type: 'Music',
    rarity: 'Rare',
    price: 0.9,
    likes: 142,
    comments: 19,
    description: 'Exclusive electronic music track with visual accompaniment',
    metadata: {
      tokenId: '0xc2a3b4',
      blockchain: 'Polkadot',
      mintedDate: '2024-10-22',
      edition: '808/1000',
    },
  },
];
