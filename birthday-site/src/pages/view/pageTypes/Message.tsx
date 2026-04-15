import confetti from "canvas-confetti";
import { useState } from "react";
import FloatingElements from "../components/FloatingElements";

// quick emoji burst renderer used on click
type Burst = { id: number; emoji: string; left: number };

const Message = ({ data, onNext, globalData }: any) => {
  const images = data.images?.length > 0 ? data.images : (globalData.pages[0]?.images || []);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const spawnBurst = () => {
    // confetti burst
    try { confetti({ particleCount: 80, spread: 120, origin: { y: 0.6 } }); } catch (e) { console.warn(e); }

    const emojis = ["🎈", "❤️", "✨"];
    const id = Date.now();
    const items = Array.from({ length: 12 }).map((_, i) => ({ id: id + i, emoji: emojis[i % emojis.length], left: Math.random() * 100 }));
    setBursts((b) => [...b, ...items]);
    setTimeout(() => setBursts((b) => b.filter(x => x.id < id || x.id >= id + 12)), 3000);
    // auto-advance after the celebration
    setTimeout(() => { try { onNext(); } catch {} }, 1200);
  };

  return (
    <div onClick={spawnBurst} className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8 text-center relative">
      <FloatingElements />
      {/* render burst emojis */}
      {bursts.map(b => (
        <span key={b.id} className="absolute text-3xl animate-float z-50" style={{ left: `${b.left}%`, bottom: 0 }}>{b.emoji}</span>
      ))}

      <div className="max-w-4xl w-full z-10">
        <p className="text-3xl sm:text-4xl md:text-6xl font-black mb-12 sm:mb-16 leading-tight" 
           style={{ color: data.fontColor || 'white', fontFamily: data.font || 'inherit' }}>
          {data.text || "Thinking of you!"}
        </p>

        <div className="flex gap-10 justify-center items-center">
          {images.slice(0, 2).map((img: string, i: number) => (
            <div key={i} className="relative group">
                <div className="absolute -inset-2 bg-pink-500 rounded-full blur opacity-30 group-hover:opacity-60 transition"></div>
                <div className="w-40 h-40 md:w-64 md:h-64 overflow-hidden relative" 
                    style={{ 
                        clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")',
                        transform: 'scale(2.5)' 
                    }}>
                    <img src={img} className="w-full h-full object-cover" style={{ transform: 'scale(0.5)' }} />
                </div>
            </div>
          ))}
        </div>

        {/* auto-advance on click — no manual continue button */}
      </div>
    </div>
  );
};

export default Message;