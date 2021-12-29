import { useEffect, useState } from "react";
import { networkError } from "../request/Errors";
import { getLoginStatus } from "../request/Header/Login";

export default function useLoginStatus() {
  const [loginStatus, setLoginStatus] = useState<any>({ code: 301 });
  useEffect(() => {
    const sendRequest = async () => {
      try {
        const data = await getLoginStatus();
        setLoginStatus(data.data);
      } catch (error) {
        return networkError;
      }
    };
    sendRequest();
  }, []);
  return loginStatus;
}
