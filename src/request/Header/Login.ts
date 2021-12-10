import { BaseUrl } from "../BaseUrl";
import { networkError } from "../Errors";

// 先生产二维码Key
const createQRKey = async () => {
  try {
    const res = await fetch(`${BaseUrl}/login/qr/key`);
    const data = await res.json();
    return data.code === 200 ? data : networkError;
  } catch (error) {
    return networkError;
  }
};

// 通过key取生成二维码 使用SSE
const createQRCode = async (key: string) => {
  const res = await fetch(`${BaseUrl}/login/qr/create`, {
    method: "POST",
    body: JSON.stringify({ key: key }),
  });
  const data = await res.json();
  console.log(data);
};

// 获取二维码当前状态
const checkQRStatus = async (key: string) => {
  // const res = await fetch(`${BaseUrl}/login/qr/check?key=${key}`, {
  //   method: "POST",
  //   body: JSON.stringify({ key: key }),
  // });
  // const data = await res.json();
  // console.log(data);
  const eventSource = new EventSource(`${BaseUrl}/login/qr/check?key=${key}`, {
    withCredentials: true,
  });
  eventSource.onmessage = function (e) {
    console.log(e.data);
  };
};

export { createQRCode, createQRKey, checkQRStatus };
