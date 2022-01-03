import { BaseUrl } from "../BaseUrl";
import { networkError } from "../Errors";

const getRecommendPlaylists = async () => {
  try {
    const res = await fetch(`${BaseUrl}/recommend/resource`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return networkError;
  }
};

export { getRecommendPlaylists };
