/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:51:13
 * @Description: 请填写简介
 */
import { BaseUrl } from "../BaseUrl";
import { networkError } from "../Errors";

const getRecommendPlaylists = async () => {
  try {
    const res = await fetch(`${BaseUrl}/recommend/resource?realIP=116.25.146.177`, {
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
