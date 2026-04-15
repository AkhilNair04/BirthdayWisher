import confetti from "canvas-confetti";
import { useState } from "react";
import FloatingElements from "../components/FloatingElements";


const Final = ({ data }: any) => {
  // Collect all images from all pages to create a "Flow"
  const allImages = data.pages.flatMap((p: any) => p.images || []);

  const [bursts, setBursts] = useState<{ id: number; emoji: string; left: number }[]>([]);
  const spawn = () => {
    try { confetti({ particleCount: 80, spread: 120, origin: { y: 0.6 } }); } catch (e) { console.warn(e); }
    const emojis = ["🎈","❤️","✨"];
    const id = Date.now();
    const items = Array.from({length: 12}).map((_,i) => ({ id: id+i, emoji: emojis[i%emojis.length], left: Math.random()*100 }));
    setBursts(b => [...b, ...items]);
    setTimeout(() => setBursts(b => b.filter(x => x.id < id || x.id >= id+12)), 3000);
    // keep circulating floating elements visible via FloatingElements overlay
  };

  return (
    <div onClick={spawn} className="min-h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <FloatingElements />
      {bursts.map(b => <span key={b.id} className="absolute text-3xl animate-float z-50" style={{ left: `${b.left}%`, bottom: 0 }}>{b.emoji}</span>)}

      {/* Background Image Flow */}
      <div className="absolute inset-0 -z-10 flex flex-wrap gap-4 opacity-20 scale-110 pointer-events-none">
        {allImages.map((img: string, i: number) => (
            <img key={i} src={img} className="w-32 h-32 object-cover rounded-full animate-pulse" 
                 style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
      </div>

      <div className="z-10 bg-black/60 backdrop-blur-sm p-12 rounded-[4rem] border border-white/20 flex flex-col items-center">
        <svg viewBox="0 0 400 260" className="w-full max-w-lg overflow-visible mb-6 mx-auto">
            {/* lower the curve and increase viewBox height so tall fonts don't get clipped */}
            <path id="finalCurve" d="M 50,180 A 150,90 0 0,1 350,180" fill="transparent" />
            <text style={{ fill: data.preview?.fontColor, fontFamily: data.preview?.font }} className="font-black uppercase tracking-widest text-3xl md:text-4xl lg:text-5xl" dominantBaseline="middle">
              <textPath xlinkHref="#finalCurve" startOffset="50%" textAnchor="middle">
                {`Forever ${data.preview?.vibe}`}
              </textPath>
            </text>
        </svg>

        <h2 className="text-6xl md:text-8xl font-black text-center" style={{ color: data.preview?.fontColor }}>
            {data.preview?.name}
        </h2>
        
        {/* Main Final Image */}
        {allImages[0] && (
            <img src={allImages[0]} className="w-48 h-48 mx-auto mt-10 rounded-full border-4 border-pink-500 shadow-2xl animate-bounce" />
        )}
      </div>
    </div>
  );
};

export default Final;