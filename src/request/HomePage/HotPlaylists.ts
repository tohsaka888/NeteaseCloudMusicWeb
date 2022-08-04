/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:51:00
 * @Description: 请填写简
 */
import { BaseUrl } from "../BaseUrl";
import { networkError } from "../Errors";

const sendRequest = async () => {
  try {
    const res = await fetch(`${BaseUrl}/top/playlist?realIP=116.25.146.177`, {
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
