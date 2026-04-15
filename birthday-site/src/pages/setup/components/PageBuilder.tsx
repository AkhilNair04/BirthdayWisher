import ImageUploader from "./ImageUploader";
import MessageInput from "./MessageInput";

const PageBuilder = ({ pages, setPages, googleFonts }: any) => {
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
        <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-3xl">
          <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase">{page.type}</span>
            
            <div className="flex items-center gap-2">
              {/* Restored: Color Picker for each page */}
              <input
                type="color"
                value={page.fontColor || '#ffffff'}
                onChange={(e) => updatePage(i, { ...page, fontColor: e.target.value })}
                className="w-6 h-6 p-0 border-0 rounded-full bg-transparent cursor-pointer"
              />

              {/* Restored: Font Dropdown for each page */}
              <select
                className="bg-black/60 text-xs p-2 rounded-lg border border-white/10 outline-none text-white max-w-[150px]"
                onChange={(e) => { 
                  loadFont(e.target.value); 
                  updatePage(i, { ...page, font: e.target.value }); 
                }}
                value={page.font || ''}
              >
                <option value="">Select Font</option>
                {googleFonts.map((f: any) => (
                  <option key={f.family} value={f.family}>{f.family}</option>
                ))}
              </select>
            </div>
          </div>

          <MessageInput 
            text={page.type === 'memories' ? (page.notes || []).join('\n') : page.text} 
            setText={(v) => updatePage(i, page.type === 'memories' ? {...page, notes: v.split('\n')} : {...page, text: v})} 
            selectedFont={page.font}
            color={page.fontColor}
          />
          <ImageUploader images={page.images} setImages={(imgs) => updatePage(i, {...page, images: imgs})} />
        </div>
      ))}
    </div>
  );
};

export default PageBuilder;