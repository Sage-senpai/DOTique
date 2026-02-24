import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { setHasSeenOnboarding } from "../../services/preferencesService";
import "./onboarding.scss";

interface Slide {
  id: string;
  title: string;
  desc: string;
  avatar: string;
  bgColor: string;
}

const slides: Slide[] = [
  {
    id: "1",
    title: "Welcome to DOTique",
    desc: "Your Web3 fashion hub powered by Polkadot. Create, collect, and showcase digital fashion.",
    avatar: "DOT",
    bgColor: "#60519B",
  },
  {
    id: "2",
    title: "Design Your DOTvatar",
    desc: "Create unique 3D avatars and dress them with exclusive NFT fashion pieces.",
    avatar: "3D",
    bgColor: "#1E202C",
  },
  {
    id: "3",
    title: "Mint and Trade NFTs",
    desc: "Design fashion NFTs, mint them on Polkadot, and trade in our marketplace.",
    avatar: "NFT",
    bgColor: "#31323E",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);

  const completeOnboarding = useCallback(async () => {
    await setHasSeenOnboarding(true);
    navigate("/home");
  }, [navigate]);

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = window.setInterval(() => {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(intervalRef.current!);
        void completeOnboarding();
      }
    }, 3000);

    return () => clearInterval(intervalRef.current!);
  }, [completeOnboarding, currentIndex, isPaused]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      void completeOnboarding();
    }
  };

  const handleSkip = () => {
    void completeOnboarding();
  };

  return (
    <div className="onboarding-container">
      <button className="skip-button" onClick={handleSkip}>
        Skip
      </button>

      <div
        className="onboarding-slide"
        style={{ backgroundColor: slides[currentIndex].bgColor }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="illustration-container">
          <div className="illustration">{slides[currentIndex].avatar}</div>
        </div>

        <div className="content-container">
          <h2 className="title">{slides[currentIndex].title}</h2>
          <p className="description">{slides[currentIndex].desc}</p>
        </div>

        <div className="footer">
          <div className="pagination">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`dot ${currentIndex === i ? "active-dot" : ""}`}
              />
            ))}
          </div>
          <button className="onboarding-button" onClick={handleNext}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
