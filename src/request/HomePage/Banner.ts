import { BaseUrl } from "../BaseUrl";

const sendRequest = async () => {
  const res = await fetch(`${BaseUrl}/banner`, {
    method: "POST",
    body: JSON.stringify({ type: 0 }),
  });
  const data = await res.json();
  return data.code === 200
    ? data.banners
    : { errmsg: "请求失败,请检查网络配置" };
};

export { sendRequest };
