import { useState, useEffect } from "react";
import PageBuilder from "./components/PageBuilder";

const SetupPage = () => {
  const [background, setBackground] = useState("#11121e");
  const [vibe, setVibe] = useState<"Birthday" | "Anniversary">("Birthday");
  const [fontColor, setFontColor] = useState("#ffffff");
  const [font, setFont] = useState("Poppins");
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [pages, setPages] = useState<any[]>([]);
  const [aiTheme, setAiTheme] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [allFonts, setAllFonts] = useState<any[]>([]);

  const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;

  const getOrdinal = (n: number) => {
    const s = ["th", "st", "nd", "rd"], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  useEffect(() => {
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setAllFonts(data.items?.slice(0, 50) || []));
  }, []);

  useEffect(() => {
    if (!font) return;
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, '+')}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, [font]);

  const generateAITheme = async () => {
    setLoadingAi(true);
    const internalVibe = vibe === "Anniversary" ? "Romantic/Anniversary" : "Birthday/Party";
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{
            role: "user",
            content: `Generate a JSON theme for ${internalVibe}. Base Color: ${background}. 
            Return: secondaryColor, gradient (CSS), glassIntensity (0-1), accentColor. 
            Keep it strictly JSON.`
          }],
          response_format: { type: "json_object" }
        })
      });
      const data = await response.json();
      setAiTheme(JSON.parse(data.choices[0].message.content));
    } catch (e) {
      console.error("AI Sync failed", e);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleGenerateLink = () => {
    if (!name.trim()) {
      alert("Please enter a name first!");
      return;
    }

    const payload = {
      preview: { name: name.trim(), age, vibe, font, fontColor },
      aiTheme,
      background,
      pages,
    };

    try {
      const jsonString = JSON.stringify(payload);
      let encoded = btoa(unescape(encodeURIComponent(jsonString)));
      encoded = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

      if (encoded.length > 7500) {
        alert("Link too long! Please remove some images or shorten your notes.");
        return;
      }

      setGeneratedLink(`${window.location.origin}/view?data=${encoded}`);
      setShowPopup(true);
    } catch (e) {
      alert("Failed to generate link. Try reducing image sizes.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050508] text-white p-6 lg:p-12 font-poppins">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        
        <section className="col-span-12 lg:col-span-7 space-y-6">
          <h1 className="text-5xl font-black italic tracking-tighter">THE HAPPY WISHER</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <label className="text-[10px] font-bold uppercase text-pink-500 mb-2 block">Identity</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Recipient Name" className="w-full bg-black/40 p-3 rounded-xl mb-3 outline-none border border-white/5 focus:border-pink-500/50" />
              <input type="number" min="1" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full bg-black/40 p-3 rounded-xl outline-none border border-white/5" />
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <label className="text-[10px] font-bold uppercase text-pink-500 mb-2 block">Vibe & Style</label>
              <div className="flex flex-wrap gap-2 items-center">
                <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-0" />
                <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} className="w-8 h-8 rounded-full cursor-pointer bg-transparent border-0" />
                <select value={font} onChange={(e) => setFont(e.target.value)} className="bg-black/40 p-2 rounded-lg text-xs outline-none flex-1">
                  {allFonts.map(f => <option key={f.family} value={f.family}>{f.family}</option>)}
                </select>
                <select value={vibe} onChange={(e) => setVibe(e.target.value as any)} className="bg-black/40 p-2 rounded-lg text-xs outline-none">
                  <option value="Birthday">Birthday</option>
                  <option value="Anniversary">Anniversary</option>
                </select>
                <button onClick={generateAITheme} className="text-xs bg-pink-500/20 px-3 py-2 rounded-lg border border-pink-500/50 hover:bg-pink-500/40 transition">
                  {loadingAi ? "..." : "AI Sync"}
                </button>
              </div>
            </div>
          </div>

          <PageBuilder pages={pages} setPages={setPages} googleFonts={allFonts} />
          
          <div className="flex gap-4">
            <button onClick={() => setPages([...pages, {type:'memories', images:[], notes:[], font, fontColor}])} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition">+ Scene</button>
            <button onClick={() => setPages([...pages, {type:'message', text:'', images:[], font, fontColor}])} className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition">+ Message</button>
          </div>
        </section>

        <section className="col-span-12 lg:col-span-5 sticky top-12 h-fit">
          <div className="w-full aspect-[3/4] rounded-[3rem] overflow-hidden relative shadow-2xl transition-all duration-700" style={{ background: aiTheme?.gradient || background }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <svg viewBox="0 0 400 200" className="w-full h-auto overflow-visible mb-[-20px]">
                <path id="curve" d="M 50,150 A 150,80 0 0,1 350,150" fill="transparent" />
                <text style={{ fill: fontColor, fontFamily: font }} className="font-bold uppercase tracking-[0.2em] text-xl">
                  <textPath xlinkHref="#curve" startOffset="50%" textAnchor="middle">
                    Happy {getOrdinal(age)} {vibe}
                  </textPath>
                </text>
              </svg>
              <h2 className="text-5xl md:text-7xl font-black leading-tight break-words w-full" style={{ color: fontColor, fontFamily: font }}>
                {name || "Recipient"}
              </h2>
            </div>
          </div>
          <button onClick={handleGenerateLink} className="w-full mt-6 py-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-[2rem] font-bold uppercase tracking-widest shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all">Generate Link</button>
        </section>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-white/10 p-8 rounded-[2.5rem] max-w-lg w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 text-pink-500">Share Your Wish!</h3>
            <p className="text-gray-400 text-sm mb-6">Your magic link is ready to be shared with {name}.</p>
            <div className="bg-black/40 p-4 rounded-xl mb-6 text-xs font-mono text-gray-400 break-all border border-white/5 max-h-32 overflow-y-auto">
              {generatedLink}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { navigator.clipboard.writeText(generatedLink); alert("Copied!"); }} className="flex-1 py-4 bg-pink-500 rounded-2xl font-bold hover:bg-pink-400 transition">Copy Link</button>
              <button onClick={() => setShowPopup(false)} className="px-8 py-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default SetupPage;