import { BaseUrl, httpHeader } from "../BaseUrl";
import { networkError } from "../Errors";

const getUserPlaylist = async (id: number) => {
  try {
    const res = await fetch(`${BaseUrl}/user/playlist`, {
      method: "POST",
      body: JSON.stringify({ uid: id }),
      headers: httpHeader,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return networkError;
  }
};

export { getUserPlaylist };
