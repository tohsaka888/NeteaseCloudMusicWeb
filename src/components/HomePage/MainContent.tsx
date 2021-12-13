import React from "react";
import styled from "styled-components";
import DailyRecommend from "./DailyRecommend";
import HotPlaylists from "./HotPlaylists";

const Containner = styled.div`
  width: 48vw;
  height: 100%;
  border: 1px solid #cecece;
  padding: 20px 20px 40px;
`;

export default function MainContent() {
  return (
    <Containner>
      <HotPlaylists />
      <DailyRecommend />
    </Containner>
  );
}
