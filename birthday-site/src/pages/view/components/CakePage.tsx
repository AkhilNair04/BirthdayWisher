import { useState, useEffect, useRef } from "react";

const CakePage = ({ age, onDone }: { age: number; onDone: () => void }) => {
  const [blown, setBlown] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [step, setStep] = useState(0); 
  /* Steps:
    1: Bottom Cake Layer
    2: Lower Cream Layer
    3: Middle Cake Layer
    4: Upper Cream Layer
    5: Top Cake Layer
    6: Topmost Dripping Cream (Overlapping)
    7: Candle (Slightly above)
  */
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Sequential Build: Bottom -> Cream -> Middle -> Cream -> Top -> TopCream -> Candle
    setTimeout(() => setStep(1), 300);   // Bottom Cake
    setTimeout(() => setStep(2), 900);   // Lower Cream
    setTimeout(() => setStep(3), 1500);  // Middle Cake
    setTimeout(() => setStep(4), 2100);  // Upper Cream
    setTimeout(() => setStep(5), 2700);  // Top Cake
    setTimeout(() => setStep(6), 3300);  // Topmost Overlapping Cream
    setTimeout(() => setStep(7), 4100);  // Candle
  }, []);

  useEffect(() => {
    let animationId: number;
    const initMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioContextRef.current = context;
        const analyser = context.createAnalyser();
        const microphone = context.createMediaStreamSource(stream);
        microphone.connect(analyser);
        analyser.fftSize = 512;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const checkBlowing = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
          if (volume > 65 && step === 7) { 
            setBlown(true);
            setTimeout(onDone, 2000);
          } else if (!blown) {
            animationId = requestAnimationFrame(checkBlowing);
          }
        };
        checkBlowing();
      } catch (err) { console.error("Mic Error:", err); }
    };
    if (step === 7) initMic();
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [blown, onDone, step]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-transparent overflow-hidden">
      
      <div className="relative flex flex-col items-center">
        
        {/* 🕯️ Candle - Positioned just above the topmost cream */}
        <div 
          onMouseMove={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={`transition-all duration-1000 z-50 mb-1 ${step >= 7 ? 'translate-y-0 opacity-100' : '-translate-y-96 opacity-0'}`}
        >
          <div className="relative text-7xl font-black text-pink-600 drop-shadow-lg">
            {age}
            {step >= 7 && !blown && (
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-5 h-8 bg-orange-500 rounded-full blur-sm 
                ${isHovering ? 'animate-ping duration-75' : 'animate-pulse'}`} 
              />
            )}
          </div>
        </div>

        {/* 🍦 Topmost Overlapping Cream - Anchored to Top Layer */}
        <div className={`relative z-40 w-[180px] h-[40px] transition-all duration-700 mb-[-25px] 
          ${step >= 6 ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'}`} 
          style={{ transformOrigin: 'top' }}
        >
          <svg width="180" height="60" viewBox="0 0 180 60" fill="none" className="drop-shadow-xl">
            <rect width="180" height="25" rx="8" fill="white" />
            <path 
              d="M0 20 Q 20 50 40 20 Q 60 60 80 20 Q 95 55 115 20 Q 135 65 155 20 Q 170 45 180 20" 
              fill="white" 
            />
          </svg>
        </div>

        {/* 🎂 Realistic Cake Layers Construction */}
        <div className="flex flex-col-reverse items-center space-y-[-2px]">
          {/* 1. Bottom Cake Layer */}
          <div className={`h-14 bg-gradient-to-b from-pink-300 to-pink-500 border-b-4 border-pink-600 shadow-xl transition-all duration-1000 w-[240px] rounded-xl
            ${step >= 1 ? 'translate-y-0 opacity-100' : '-translate-y-[1000px] opacity-0'}`} />
          
          {/* 2. Lower Cream Layer */}
          <div className={`h-3 bg-white w-[230px] rounded-full z-10 transition-all duration-700 
            ${step >= 2 ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />

          {/* 3. Middle Cake Layer */}
          <div className={`h-14 bg-gradient-to-b from-pink-300 to-pink-500 border-b-4 border-pink-600 shadow-xl transition-all duration-1000 w-[210px] rounded-xl
            ${step >= 3 ? 'translate-y-0 opacity-100' : '-translate-y-[1000px] opacity-0'}`} />

          {/* 4. Upper Cream Layer */}
          <div className={`h-3 bg-white w-[200px] rounded-full z-10 transition-all duration-700 
            ${step >= 4 ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`} />

          {/* 5. Top Cake Layer */}
          <div className={`h-14 bg-gradient-to-b from-pink-300 to-pink-500 border-b-4 border-pink-600 shadow-xl transition-all duration-1000 w-[180px] rounded-xl
            ${step >= 5 ? 'translate-y-0 opacity-100' : '-translate-y-[1000px] opacity-0'}`} />
            
        </div>
      </div>

      <div className="mt-20 text-center z-10">
        <h2 className="text-3xl font-black text-white italic tracking-[0.2em] opacity-80 animate-pulse uppercase">
          {step < 7 ? 'Baking with Love...' : 'Blow the candles!'}
        </h2>
      </div>

      {/* Manual Fallback */}
      {step >= 7 && (
        <div className="absolute inset-0 cursor-pointer z-[100]" onClick={() => { setBlown(true); setTimeout(onDone, 1500); }} />
      )}
    </div>
  );
};

export default CakePage;