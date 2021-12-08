import { BaseUrl } from "../BaseUrl";
import { networkError } from "../Errors";

const sendRequest = async () => {
  try {
    const res = await fetch(`${BaseUrl}/top/playlist`, {
      method: "POST",
      body: JSON.stringify({ limit: 8, order: "hot" }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await res.json();
    return data.code === 200 ? data.playlists : networkError;
  } catch (error) {
    return networkError;
  }
};

export { sendRequest };
