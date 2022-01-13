// 判断是否渲染手机端网页
import { useEffect, useState } from "react";

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const resizeEvent = () => {
      requestAnimationFrame(() => {
        if (navigator.userAgent.indexOf("Mobile") === -1) {
          setIsMobile(false);
        } else {
          setIsMobile(true);
        }
      });
    };
    resizeEvent();
    window.addEventListener("resize", resizeEvent);
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);
  return isMobile;
}
