import React from "react";
import styled from "styled-components";
import Download from "./Download";
import SemiPlaylists from "./SemiPlaylists";
import SemiSongs from "./SemiSongs";

const Container = styled.div`
  width: 25%;
  border-left: 1px solid #dfdfdf;
  display: flex;
  flex-direction: column;
  min-width: 240px;
`;

export default function RightPart() {
  return (
    <Container>
      <SemiPlaylists />
      <SemiSongs />
      <Download />
    </Container>
  );
}
