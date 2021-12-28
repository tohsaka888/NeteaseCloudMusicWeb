import { networkError } from "./Errors";
import { PlayUrl } from "./PlayUri";

export const getMusicUrl = async (id: number) => {
  try {
    const res = await fetch(`${PlayUrl}/song/url?id=${id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return networkError;
  }
};
