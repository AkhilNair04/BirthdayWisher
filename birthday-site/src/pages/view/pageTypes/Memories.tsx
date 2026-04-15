import confetti from "canvas-confetti";
import { useState } from "react";
import FloatingElements from "../components/FloatingElements";

const Memories = ({ data, onNext }: any) => {
  const [bursts, setBursts] = useState<{ id: number; emoji: string; left: number }[]>([]);

  const spawn = () => {
    try { confetti({ particleCount: 60, spread: 100, origin: { y: 0.7 } }); } catch (e) { console.warn(e); }
    const emojis = ["🎈","❤️","✨"];
    const id = Date.now();
    const items = Array.from({ length: 10 }).map((_, i) => ({ id: id + i, emoji: emojis[i % emojis.length], left: Math.random() * 100 }));
    setBursts(b => [...b, ...items]);
    setTimeout(() => setBursts(b => b.filter(x => x.id < id || x.id >= id + 10)), 3200);
    setTimeout(() => { try { onNext(); } catch {} }, 1200);
  };

  return (
    <div onClick={spawn} className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <FloatingElements />
      {bursts.map(b => (
        <span key={b.id} className="absolute text-3xl animate-float z-50" style={{ left: `${b.left}%`, bottom: 0 }}>{b.emoji}</span>
      ))}

      <div className="w-full max-w-5xl">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {data.images.map((img: string, i: number) => (
            <img
              key={i}
              src={img}
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg shadow-lg"
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <div className="text-sm text-white/80">Tap anywhere to celebrate →</div>
        </div>
      </div>
    </div>
  );
};

export default Memories;