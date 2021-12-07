import { Layout } from "antd";
import React from "react";
import styled from "styled-components";
import Banner from "../components/HomePage/Banner";
import MainContent from "../components/HomePage/MainContent";
import SideContent from "../components/HomePage/SideContent";
import "../styles/HomePage.css";

const Container = styled.div`
  width: 64vw;
  margin: 0 18vw;
  display: flex;
  background-color: white;
  height: 100vh;
  box-sizing: border-box;
`;

export default function HomePage() {
  const { Content } = Layout;
  return (
    <Content className="content">
      <Banner />
      <Container>
        <MainContent />
        <SideContent />
      </Container>
    </Content>
  );
}
