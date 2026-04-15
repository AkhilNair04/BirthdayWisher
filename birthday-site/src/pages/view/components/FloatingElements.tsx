import FloatingHearts from "../animations/FloatingHearts";
import FloatingBalloons from "../animations/FloatingBalloons";
import Sparkles from "../animations/Sparkles";
import Confetti from "../animations/Confetti";

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <FloatingHearts />
      <FloatingBalloons />
      <Sparkles />
      <Confetti />
    </div>
  );
};

export default FloatingElements;