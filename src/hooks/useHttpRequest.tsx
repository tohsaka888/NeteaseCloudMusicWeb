import { useEffect, useState } from "react";
import { BaseUrl, httpHeader } from "../request/BaseUrl";
import { networkError } from "../request/Errors";

type Props = {
  api: string;
  method: string;
  credentials: RequestCredentials;
  requestData: string;
};

export default function useHttpRequest({
  api,
  method,
  credentials = "include",
  requestData,
}: Props) {
  const [data, setData] = useState<any>({});
  const jsonToQueryString = (json: any) => {
    if (JSON.stringify(json) !== "{}") {
      let queryString = "?";
      for (let key in json) {
        queryString += key + "=" + json[key] + "&";
      }
      return queryString;
    } else {
      return "";
    }
  };
  useEffect(() => {
    const sendReuqest = async () => {
      try {
        if (method.toUpperCase() === "POST") {
          const res = await fetch(`${BaseUrl}${api}`, {
            method: method,
            credentials: credentials,
            headers: httpHeader,
            body: requestData,
          });
          const data = await res.json();
          setData(data);
        } else if (method === "GET") {
          let queryString = jsonToQueryString(JSON.parse(requestData));
          const res = await fetch(`${BaseUrl}${api}${queryString}`, {
            method: method,
            credentials: credentials,
          });
          const data = await res.json();
          setData(data);
        }
      } catch (error) {
        setData(networkError);
      }
    };
    sendReuqest();
  }, [api, credentials, method, requestData]);
  return data;
}
