/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:49:54
 * @Description: 请填写简介
 */
import { httpHeader } from "./BaseUrl";
import { networkError } from "./Errors";
import { PlayUrl } from "./PlayUri";

export const getMusicUrl = async (id: number) => {
  try {
    const res = await fetch(`${PlayUrl}/song/url?id=${id}&realIP=116.25.146.177`, {
      method: "GET",
      headers: httpHeader,
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return networkError;
  }
};
