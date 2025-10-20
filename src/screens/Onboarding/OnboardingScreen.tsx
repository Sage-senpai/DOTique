import  { useState, useRef, useEffect } from "react";
import "./onboarding.scss";
import { useNavigate } from "react-router-dom";

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
    avatar: "👗",
    bgColor: "#60519B",
  },
  {
    id: "2",
    title: "Design Your DOTvatar",
    desc: "Create unique 3D avatars and dress them with exclusive NFT fashion pieces.",
    avatar: "🎨",
    bgColor: "#1E202C",
  },
  {
    id: "3",
    title: "Mint & Trade NFTs",
    desc: "Design fashion NFTs, mint them on Polkadot, and trade in our marketplace. remember to route to DOTvatar screen after onboarding and not home screen when ready",
    avatar: "💎",
    bgColor: "#31323E",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = window.setInterval(() => {
      if (currentIndex < slides.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(intervalRef.current!);
        localStorage.setItem("hasSeenOnboarding", "true");
        navigate("/home");
      }
    }, 3000);

    return () => clearInterval(intervalRef.current!);
  }, [currentIndex, isPaused, navigate]);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("hasSeenOnboarding", "true");
      navigate("/home");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/home");
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
              ></div>
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
