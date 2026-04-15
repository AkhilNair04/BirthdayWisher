import Memories from "../pageTypes/Memories";
import Message from "../pageTypes/Message";
import Final from "../pageTypes/Final";

const PageRenderer = ({ page, onNext, globalData }: any) => {
  // If the step exceeded the pages array, show Final page automatically
  if (!page) return <Final data={globalData} />;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center animate-in fade-in slide-in-from-right duration-700">
      {page.type === "memories" && <Memories data={page} onNext={onNext} />}
      {page.type === "message" && <Message data={page} onNext={onNext} globalData={globalData} />}
    </div>
  );
};

export default PageRenderer;