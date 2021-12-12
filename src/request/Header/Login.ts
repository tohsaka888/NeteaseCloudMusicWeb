// import { message } from "antd";
import { BaseUrl, httpHeader } from "../BaseUrl";
import { networkError } from "../Errors";

// 先生产二维码Key
const createQRKey = async () => {
  try {
    const res = await fetch(`${BaseUrl}/login/qr/key`);
    const data = await res.json();
    return data.code === 200 ? data.data.unikey : networkError;
  } catch (error) {
    return networkError;
  }
};

const createQRCode = async (key: string) => {
  try {
    const res = await fetch(`${BaseUrl}/login/qr/create`, {
      method: "POST",
      body: JSON.stringify({ key: key, qrimg: true }),
      headers: httpHeader,
    });
    const data = await res.json();
    return data.code ? data.data.qrimg : networkError;
  } catch (error) {
    return networkError;
  }
};

// 获取二维码当前状态
const checkQRStatus = async (key: string) => {
  const date = Date.now()
  const res = await fetch(`${BaseUrl}/login/qr/check?key=${key}&timerstamp=${date}`);
  const data = await res.json();
  return data;
  // const eventSource = new EventSource(`${BaseUrl}/login/qr/check?key=${key}`, {
  //   withCredentials: true,
  // });
  // eventSource.onmessage = function (e) {
  //   console.log(e.data);
  // };
};

export { createQRCode, createQRKey, checkQRStatus };