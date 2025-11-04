// src/data/dummyUsers.ts
export default [
  {
    id: "dummy-1",
    name: "Jane Doe",
    username: "janedoe",
    avatar: "/images/avatar1.png",
    bio: "Exploring creativity in Web3 ✨",
    posts: [
      {
        id: "post-1",
        type: "post",
        content: "This is a dummy post for preview.",
        image: "/images/post1.png",
      },
      {
        id: "nft-1",
        type: "nft",
        title: "Dreamscape NFT",
        image: "/images/nft1.png",
      },
    ],
  },
  {
    id: "dummy-2",
    name: "Dev Artist",
    username: "devartist",
    avatar: "/images/avatar2.png",
    bio: "Building art through code 👩🏽‍💻",
    posts: [
      {
        id: "post-2",
        type: "nft",
        title: "Glitchverse",
        image: "/images/nft2.png",
      },
    ],
  },
];
