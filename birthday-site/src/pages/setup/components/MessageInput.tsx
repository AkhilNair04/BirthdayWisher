type Props = {
  text: string;
  setText: (v: string) => void;
  selectedFont?: string; 
  color?: string;        
};

const MessageInput = ({ text, setText, selectedFont, color }: Props) => {
  return (
    <div className="w-full">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-white/10 p-4 w-full bg-black/20 rounded-2xl outline-none focus:ring-1 ring-pink-500/50 transition-all placeholder:text-gray-600"
        placeholder="Type your message here..."
        style={{ 
          fontFamily: selectedFont || 'inherit', 
          color: color || '#ffffff',
          minHeight: '140px',
          resize: 'none'
        }}
      />
    </div>
  );
};

export default MessageInput;