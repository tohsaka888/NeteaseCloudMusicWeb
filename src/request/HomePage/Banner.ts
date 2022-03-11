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
  const res = await fetch(`${BaseUrl}/banner`, {
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
