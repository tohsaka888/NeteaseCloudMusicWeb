import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #f1f1f1;
  height: 126px;
  padding-top: 0;
  background-position: 0 0;
  font-size: 12px;
  padding: 16px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border: 1px solid #cecece;
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
