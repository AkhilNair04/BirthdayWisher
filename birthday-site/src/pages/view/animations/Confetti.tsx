import { useEffect } from "react";
import confetti from "canvas-confetti";

const Confetti = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default Confetti;