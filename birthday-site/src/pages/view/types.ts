export type Theme = {
  background: string;
  font: string;
  animation: "none" | "soft" | "pulse";
};

export type AITheme = {
  secondaryColor: string;
  gradient: string;
  glassIntensity: number;
  accentColor: string;
};

export type Page = {
  type: "memories" | "message" | "final";
  text?: string;
  images: string[];
  notes?: string[];
  font?: string;
  fontColor?: string;
};

export type BirthdayData = {
  preview: {
    name: string;
    age: number;
    vibe: "Birthday" | "Anniversary";
    font: string;
    fontColor: string;
  };
  aiTheme: AITheme | null;
  background: string;
  pages: Page[];
  theme?: Theme; 
};