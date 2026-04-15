import { useEffect, useState } from "react";

const Sparkles = () => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => [...prev, Date.now()]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {items.map((id) => (
        <span
          key={id}
          className="absolute text-xl animate-float"
          style={{
            left: Math.random() * 100 + "vw",
          }}
        >
          ✨
        </span>
      ))}
    </>
  );
};

export default Sparkles;