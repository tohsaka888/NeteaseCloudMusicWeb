/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:50:43
 * @Description: 请填写简介
 */
import { BaseUrl } from "../BaseUrl";

interface Banners {
  banners: Banner[];
  code: number;
}
interface Banner {
  imageUrl: string;
  targetId: number;
  adid: null;
  targetType: number;
  titleColor: string;
  typeTitle: string;
  url: null;
  exclusive: boolean;
  monitorImpress: null;
  monitorClick: null;
  monitorType: null;
  monitorImpressList: null;
  monitorClickList: null;
  monitorBlackList: null;
  extMonitor: null;
  extMonitorInfo: null;
  adSource: null;
  adLocation: null;
  adDispatchJson: null;
  encodeId: string;
  program: null;
  event: null;
  video: null;
  song: null;
  scm: string;
}

const sendRequest = async () => {
  const res = await fetch(`${BaseUrl}/banner?realIP=116.25.146.177`, {
    method: "POST",
    body: JSON.stringify({ type: 0 }),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  const data: Banners = await res.json();
  return data.banners;
};

export { sendRequest };
