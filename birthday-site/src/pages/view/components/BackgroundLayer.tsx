type BackgroundLayerProps = {
  background: string; // hex / gradient string
  animation?: "none" | "soft" | "pulse";
};

const BackgroundLayer = ({
  background,
  animation = "none",
}: BackgroundLayerProps) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base Background */}
      <div
        className={`w-full h-full ${
          animation === "pulse" ? "animate-bgPulse" : ""
        }`}
        style={{
          background: background,
        }}
      />

      {/* Soft Glow Overlay (optional subtle effect) */}
      {animation === "soft" && (
        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl" />
      )}
    </div>
  );
};

export default BackgroundLayer;