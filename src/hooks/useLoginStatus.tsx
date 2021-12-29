import { useCallback, useContext } from "react";
import { LoginContext } from "../context/Context";
// import { networkError } from "../request/Errors";
import { getLoginStatus } from "../request/Header/Login";

export default function useLoginStatus() {
  const loginProps = useContext(LoginContext);

  const sendRequest = useCallback(() => {
    setTimeout(async () => {
      const data = await getLoginStatus();
      loginProps?.setLoginStatus(data.data);
    }, 500);
  }, [loginProps]);
  return sendRequest;
}
