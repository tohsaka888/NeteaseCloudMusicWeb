// import { message } from "antd";
import { BaseUrl, httpHeader } from "../BaseUrl";
import { networkError } from "../Errors";

/**
 * 先生成二维码Key
 * @date 2021-12-28
 * @returns {any}
 */
const createQRKey = async () => {
  try {
    const res = await fetch(`${BaseUrl}/login/qr/key`, {
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    return data.code === 200 ? data.data.unikey : networkError;
  } catch (error) {
    return networkError;
  }
};

/**
 * 创建二维码
 * @date 2021-12-28
 * @param {any} key:string
 * @returns {any}
 */
const createQRCode = async (key: string) => {
  try {
    const res = await fetch(`${BaseUrl}/login/qr/create`, {
      method: "POST",
      body: JSON.stringify({ key: key, qrimg: true }),
      headers: httpHeader,
      mode: "cors",
      credentials: "include",
    });
    const data = await res.json();
    return data.code ? data.data.qrimg : networkError;
  } catch (error) {
    return networkError;
  }
};

/**
 * 获取二维码当前状态
 * @date 2021-12-28
 * @param {any} key:string
 * @returns {any}
 */
const checkQRStatus = async (key: string) => {
  const date = Date.now();
  const res = await fetch(
    `${BaseUrl}/login/qr/check?key=${key}&timerstamp=${date}`,
    {
      mode: "cors",
      credentials: "include",
      // headers: httpHeader,
    }
  );
  const data = await res.json();
  return data;
  // const eventSource = new EventSource(`${BaseUrl}/login/qr/check?key=${key}`, {
  //   withCredentials: true,
  // });
  // eventSource.onmessage = function (e) {
  //   console.log(e.data);
  // };
};

/**
 * 获取登录状态
 * @date 2021-12-28
 * @returns {any}
 */
const getLoginStatus = async () => {
  try {
    const res = await fetch(`${BaseUrl}/login/status`, {
      method: "POST",
      headers: httpHeader,
      credentials: "include",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return networkError;
  }
};

export { createQRCode, createQRKey, checkQRStatus, getLoginStatus };
