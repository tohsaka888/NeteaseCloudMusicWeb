/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:51:22
 * @Description: 请填写简介
 */
import { BaseUrl, httpHeader } from "../BaseUrl";
import { networkError } from "../Errors";

const getUserPlaylist = async (id: number, controller: AbortController) => {
  let signal = controller.signal
  try {
    const res = await fetch(`${BaseUrl}/user/playlist?realIP=116.25.146.177`, {
      method: "POST",
      body: JSON.stringify({ uid: id }),
      headers: httpHeader,
      signal
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return networkError;
  }
};

export { getUserPlaylist };
