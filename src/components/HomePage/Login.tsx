import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: url("https://s2.music.126.net/style/web2/img/index/index.png?8529c8d5d3cdc7e325da5303feb9411d");
  height: 126px;
  padding-top: 0;
  background-position: 0 0;
  font-size: 12px;
  padding: 16px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export default function Login() {
  return (
    <Container>
      登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
      <Button
        className="login"
        style={{
          color: "white",
          width: "100px",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "8px",
        }}
      >
        用户登录
      </Button>
    </Container>
  );
}
