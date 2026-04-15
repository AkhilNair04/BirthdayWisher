import type { BirthdayData } from "../types";

export const parseData = (): BirthdayData | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("data");
    const key = params.get("key");

    if (encoded) {
      const decoded = atob(encoded);
      return JSON.parse(decoded);
    }

    if (key) {
      try {
        const raw = localStorage.getItem("bw_links") || "{}";
        const map = JSON.parse(raw);
        const stored = map[key];
        if (!stored) return null;
        const decoded = atob(stored);
        return JSON.parse(decoded);
      } catch (err) {
        console.error("Error reading short link:", err);
        return null;
      }
    }

    return null;
  } catch (err) {
    console.error("Error parsing data:", err);
    return null;
  }
};