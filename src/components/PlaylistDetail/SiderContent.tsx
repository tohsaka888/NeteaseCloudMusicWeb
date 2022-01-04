import React from "react";
import styled from "styled-components";
import Download from "./Download";
import RecommendPlaylists from "./RecommendPlaylists";
import Subscribers from "./Subscribers";

const Container = styled.div`
  min-width: 240px;
  width: 33.3%;
  border-left: 1px solid #cecece;
  padding: 16px;
`;

export default function SiderContent() {
  return (
    <Container>
      <Subscribers />
      <RecommendPlaylists />
      <Download />
    </Container>
  );
}
