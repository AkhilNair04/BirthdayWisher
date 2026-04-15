import { useState } from "react";
import { parseData } from "./utils/parseData";
import BackgroundLayer from "./components/BackgroundLayer";
import FloatingElements from "./components/FloatingElements";
import CakePage from "./components/CakePage";
import PageRenderer from "./components/PageRenderer";
import PreviewIntro from "./components/PreviewIntro.tsx";

const ViewPage = () => {
  const [step, setStep] = useState(0);
  const data = parseData();

  if (!data) return <div className="text-white p-10 font-sans text-center">Invalid or Missing Link Data</div>;

  const next = () => setStep((s) => s + 1);

  return (
    <div style={{ fontFamily: data.preview?.font }} className="min-h-screen relative overflow-hidden">
      {/* Dynamic Background */}
      <BackgroundLayer 
        background={data.aiTheme?.gradient || data.background} 
        animation="soft" 
      />
      <FloatingElements />

      {/* Logic Flow */}
      {step === 0 && <PreviewIntro data={data} onProceed={next} />}

      {step === 1 && <CakePage age={data.preview?.age} onDone={next} />}

      {step > 1 && (
        <PageRenderer 
          page={data.pages[step - 2]} 
          onNext={next} 
          globalData={data}
        />
      )}
    </div>
  );
};

export default ViewPage;