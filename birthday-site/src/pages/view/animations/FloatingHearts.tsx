import { useEffect, useState } from "react";

const FloatingHearts = () => {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => [...prev, Date.now()]);
    }, 600);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {items.map((id) => (
        <span
          key={id}
          className="absolute text-2xl animate-float"
          style={{
            left: Math.random() * 100 + "vw",
          }}
        >
          ❤️
        </span>
      ))}
    </>
  );
};

export default FloatingHearts;