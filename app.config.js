import 'dotenv/config';

export default {
  expo: {
    name: "dotique",
    slug: "dotique",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: { 
      supportsTablet: true,
      bundleIdentifier: "com.sagesenpai.dotique",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.sagesenpai.dotique"
    },
    web: { 
      favicon: "./assets/favicon.png" 
    },
    extra: {
      eas: {
        projectId: "aa4d5058-ca64-459b-9c68-8ca744a2dc09"
      },
      SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
      POLKADOT_WS: process.env.EXPO_PUBLIC_POLKADOT_WS,
      PINATA_JWT: process.env.EXPO_PUBLIC_PINATA_JWT
    }
  }
};