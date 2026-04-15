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

export type MemoriesPage = {
  type: "memories";
  font?: string;
  fontColor?: string;
  images: string[];
  notes: string[];
};

export type MessagePage = {
  type: "message";
  text: string;
  font?: string;
  fontColor?: string;
};

export type Page = MemoriesPage | MessagePage;

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
};