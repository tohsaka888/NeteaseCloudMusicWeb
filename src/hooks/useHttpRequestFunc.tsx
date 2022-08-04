/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:49:39
 * @Description: 请填写简介
 */
import { useCallback } from "react";
import { BaseUrl, httpHeader } from "../request/BaseUrl";

export default function useHttpRequestFunc() {
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
  const sendRequest = useCallback(
    async (
      api: string,
      data: string,
      method: string = "GET",
      credentials: RequestCredentials = "include",
      mode: RequestMode = "cors"
    ) => {
      const requestData = JSON.parse(data);
      if (method.toUpperCase() === "GET") {
        let queryString: string = jsonToQueryString(requestData);
        api += queryString;
      }
      const res = await fetch(`${BaseUrl}${api}?realIP=116.25.146.177`, {
        method: method,
        body: method.toUpperCase() === "POST" ? data : undefined,
        credentials: credentials,
        mode: mode,
        headers: httpHeader,
      });
      const resData = await res.json();
      return resData;
    },
    []
  );
  return sendRequest;
}
