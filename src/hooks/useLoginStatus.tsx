import { useEffect, useState } from "react";
import { getLoginStatus } from "../request/Header/Login";

export default function useLoginStatus() {
  const [loginStatus, setLoginStatus] = useState<any>({code: 301});
  useEffect(() => {
    const sendRequest = async () => {
      const data = await getLoginStatus();
      setLoginStatus(data.data);
    };
    sendRequest();
  }, []);
  return loginStatus;
}
