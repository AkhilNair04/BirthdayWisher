import { useEffect, useState } from "react";

const balloons = ["🎈", "🎈", "🎈"];

const FloatingBalloons = () => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => [...prev, Date.now()]);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {items.map((id) => (
        <span
          key={id}
          className="absolute text-3xl animate-float"
          style={{
            left: Math.random() * 100 + "vw",
          }}
        >
          {balloons[Math.floor(Math.random() * balloons.length)]}
        </span>
      ))}
    </>
  );
};

export default FloatingBalloons;