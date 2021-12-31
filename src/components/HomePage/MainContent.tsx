import React from "react";
import styled from "styled-components";
import DailyRecommend from "./DailyRecommend";
import HotPlaylists from "./HotPlaylists";
import NewAlbum from "./NewAlbum";
import Toplist from "./Toplist";

const Containner = styled.div`
  width: 75%;
  height: 100%;
  border: 1px solid #cecece;
  padding: 20px 20px 40px;
  min-width: 675px;
`;

export default function MainContent() {
  return (
    <Containner>
      <HotPlaylists />
      <DailyRecommend />
      <NewAlbum />
      <Toplist />
    </Containner>
  );
}
