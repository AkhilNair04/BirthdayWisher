import type { BirthdayData } from "../types";

export const encodeData = (data: BirthdayData) => {
  return btoa(JSON.stringify(data));
};