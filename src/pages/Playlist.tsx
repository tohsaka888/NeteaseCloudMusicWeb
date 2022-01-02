import React from "react";
import styled from "styled-components";
import Content from "../components/playlist/Content";
import Header from "../components/playlist/Header";

const Container = styled.div`
  margin: 0px auto;
  height: 64vw;
  min-width: 950px;
  padding: 36px 24px;
  background-color: white;
  border-left: 1px solid #cecece;
  border-right: 1px solid #cecece;
`;

export default function Playlist() {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  );
}
