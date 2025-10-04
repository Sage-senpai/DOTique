import React, { useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeInUp } from "react-native-reanimated";
import { styles } from "./OnboardingScreen.Styles";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to DOTique 👗",
    desc: "Your Web3 fashion hub powered by Polkadot.",
    //image: require("../../../assets/onboarding1.png"),
  },
  {
    id: "2",
    title: "Create Your DOTvatar ✨",
    desc: "Design unique digital avatars styled with NFT fashion.",
    //image: require("../../../assets/onboarding2.png"),
  },
  {
    id: "3",
    title: "Own Fashion NFTs 👜",
    desc: "Mint, trade, and showcase exclusive fashion pieces.",
    //image: require("../../../assets/onboarding3.png"),
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = async () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    } else {
      // ✅ Save flag so onboarding won’t show again for same user
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Animated.Image
              source={item.image}
              style={styles.image}
              resizeMode="contain"
              entering={FadeInUp.delay(100).duration(700)}
            />
            <Animated.Text
              style={styles.title}
              entering={FadeInUp.delay(200).duration(700)}
            >
              {item.title}
            </Animated.Text>
            <Animated.Text
              style={styles.desc}
              entering={FadeInUp.delay(400).duration(700)}
            >
              {item.desc}
            </Animated.Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, currentIndex === i && styles.dotActive]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
