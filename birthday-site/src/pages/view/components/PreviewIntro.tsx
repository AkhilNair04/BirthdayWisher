const PreviewIntro = ({ data, onProceed }: any) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-1000">
      <div className="max-w-xl w-full">
        {/* Crescent Wish SVG */}
        <svg viewBox="0 0 400 200" className="w-full overflow-visible mb-4">
          <path id="previewCurve" d="M 50,150 A 150,80 0 0,1 350,150" fill="transparent" />
          <text 
            style={{ 
              fill: data.preview.fontColor || '#ffffff', 
              fontFamily: data.preview.font || 'Poppins' 
            }} 
            className="font-bold uppercase tracking-widest text-xl"
          >
            <textPath xlinkHref="#previewCurve" startOffset="50%" textAnchor="middle">
              Happy {data.preview.age}{data.preview.age === 1 ? 'st' : data.preview.age === 2 ? 'nd' : data.preview.age === 3 ? 'rd' : 'th'} {data.preview.vibe}
            </textPath>
          </text>
        </svg>

        {/* Straight Parallel Name */}
        <h2 
          className="text-6xl md:text-8xl font-black mt-2 break-words" 
          style={{ 
            color: data.preview.fontColor || '#ffffff', 
            fontFamily: data.preview.font || 'Poppins' 
          }}
        >
          {data.preview.name}
        </h2>

        <button 
          onClick={onProceed}
          className="mt-16 px-12 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full font-bold text-white hover:bg-white/20 hover:scale-105 transition-all shadow-xl"
        >
          Begin Experience →
        </button>
      </div>
    </div>
  );
};

export default PreviewIntro;