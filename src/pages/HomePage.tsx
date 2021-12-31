import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Banner from "../components/HomePage/Banner";
import MainContent from "../components/HomePage/MainContent";
import SideContent from "../components/HomePage/SideContent";
import { getLoginStatus } from "../request/Header/Login";
import "../styles/HomePage.css";

const Container = styled.div`
  width: 64vw;
  margin: 0 18vw;
  display: flex;
  background-color: white;
  box-sizing: border-box;
  min-width: 900px;
`;

export default function HomePage() {
  const { Content } = Layout;
  const [userData, setUserData] = useState<any>();
  useEffect(() => {
    const sendRequest = async () => {
      const data = await getLoginStatus();
      sessionStorage.setItem("userData", data);
      setUserData(userData);
    };
    if (sessionStorage.getItem("userData")) {
    } else {
      sendRequest();
      setUserData(userData);
    }
    // console.log(sessionStorage.getItem("userData"));
  }, [userData]);
  return (
    <Content className="content" style={{ minWidth: "1300px" }}>
      <Banner />
      <Container>
        <MainContent />
        <SideContent />
      </Container>
    </Content>
  );
}
