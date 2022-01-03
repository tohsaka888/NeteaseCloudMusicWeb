import { Layout } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import Content from "../components/My/Content";
import Sider from "../components/My/Sider";
import { LoginContext, VisibleContext } from "../context/Context";
import "../styles/MyMusic.css";

const Container = styled.div`
  height: 90vh;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginImage = styled.div`
  background: url("https://s2.music.126.net/style/web2/img/mymusic.png?b88819140383f3852a929febcaf805ac");
  width: 807px;
  height: 268px;
  /* background-position: 0 104px; */
  padding-top: 104px;
  cursor: pointer;
`;

export default function MyMusic() {
  const { loginStatus } = useContext(LoginContext);
  const props = useContext(VisibleContext);
  return (
    <Layout className="container">
      {loginStatus.profile ? (
        <>
          <Sider />
          <Content />
        </>
      ) : (
        <Container>
          <LoginImage
            onClick={() => {
              props?.setVisible(true);
            }}
          />
        </Container>
      )}
    </Layout>
  );
}
