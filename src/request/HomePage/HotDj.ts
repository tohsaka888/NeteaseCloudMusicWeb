import { BaseUrl } from "../BaseUrl";
import { networkError } from "../Errors";

const getHotDj = async () => {
  try {
    const res = await fetch(`${BaseUrl}/dj/toplist?type=hot&limit=5`, {
      method: "POST",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return networkError;
  }
};

export { getHotDj };
