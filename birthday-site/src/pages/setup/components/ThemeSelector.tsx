import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import MessageInput from "./MessageInput";

const PageBuilder = ({ pages, setPages }: any) => {
  const [googleFonts, setGoogleFonts] = useState<any[]>([]);
  const API_KEY = import.meta.env.VITE_GOOGLE_FONTS_API_KEY;

  useEffect(() => {
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setGoogleFonts(data.items || []));
  }, []);

  const updatePage = (i: number, data: any) => {
    const updated = [...pages];
    updated[i] = data;
    setPages(updated);
  };

  const loadFont = (family: string) => {
    if (!family) return;
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  };

  return (
    <div className="space-y-6">
      {pages.map((page: any, i: number) => (
        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl relative">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{page.type}</span>

            <div className="flex items-center gap-2">
              <input
                type="color"
                title="Text Color"
                value={page.fontColor || '#ffffff'}
                onChange={(e) => updatePage(i, { ...page, fontColor: e.target.value })}
                className="w-6 h-6 p-0 border-0 rounded-full bg-transparent cursor-pointer"
              />

              <select
                className="bg-black/60 text-xs p-2 rounded-lg border border-white/10 outline-none text-white min-w-[140px]"
                onChange={(e) => {
                  loadFont(e.target.value);
                  updatePage(i, { ...page, font: e.target.value });
                }}
                value={page.font || ''}
              >
                <option value="">Select Font</option>
                {googleFonts.slice(0, 50).map((f: any) => (
                  <option key={f.family} value={f.family}>{f.family}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <MessageInput 
              text={page.type === 'memories' ? (page.notes || []).join('\n') : page.text} 
              setText={(v) => updatePage(i, page.type === 'memories' ? {...page, notes: v.split('\n')} : {...page, text: v})} 
              selectedFont={page.font}
            />
            <ImageUploader images={page.images} setImages={(imgs) => updatePage(i, {...page, images: imgs})} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PageBuilder;