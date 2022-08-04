/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:50:32
 * @Description: 请填写简
 */
import { BaseUrl, httpHeader } from "../BaseUrl";
import { networkError } from "../Errors";

const getTopArtists = async () => {
  try {
    const res = await fetch(`${BaseUrl}/top/artists?limit=5&realIP=116.25.146.177`, {
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
