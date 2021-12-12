import { BaseUrl, httpHeader } from "../BaseUrl";
import { networkError } from "../Errors";

const getTopArtists = async () => {
  try {
    const res = await fetch(`${BaseUrl}/top/artists?limit=5`, {
      mode: "cors",
      method: "POST",
      headers: httpHeader,
    });
    const data = await res.json();
    return data.code === 200 ? data.artists : networkError;
  } catch (error) {
    return networkError;
  }
};

export { getTopArtists };
