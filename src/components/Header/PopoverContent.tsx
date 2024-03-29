/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:49:00
 * @Description: 请填写简介
 */
// import { Menu } from "antd";
import styled from "styled-components";
import React, { useCallback, useContext } from "react";
import { BaseUrl, httpHeader } from "../../request/BaseUrl";
import { LoginContext } from "../../context/Context";
// import useLoginStatus from "../../hooks/useLoginStatus";
const Container = styled.div``;

const Item = styled.p`
  cursor: pointer;
  :hover {
    color: red;
  }
`;

export default function PopoverContent() {
  const props = useContext(LoginContext);
  // const isLogin = useLoginStatus();
  const logout = useCallback(async () => {
    const res = await fetch(`${BaseUrl}/logout?realIP=116.25.146.177`, {
      method: "POST",
      credentials: "include",
      headers: httpHeader,
    });
    const data = await res.json();
    if (data.code === 200) {
      localStorage.removeItem("loginStatus");
      // isLogin();
      props.setLoginStatus({ profile: null });
      props?.setIsLogin(false);
    }
  }, [props]);
  return (
    <Container>
      <Item key={"logout"} onClick={logout}>
        退出登录
      </Item>
    </Container>
  );
}
