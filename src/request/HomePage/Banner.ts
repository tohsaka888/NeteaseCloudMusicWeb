import { BaseUrl } from "../BaseUrl";
import { networkError } from "../Errors";

const sendRequest = async () => {
  try {
    const res = await fetch(`${BaseUrl}/banner`, {
      method: "POST",
      body: JSON.stringify({ type: 0 }),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });
    const data = await res.json();
    return data.code === 200 ? data.banners : networkError;
  } catch (error) {
    return networkError;
  }
};

export { sendRequest };
