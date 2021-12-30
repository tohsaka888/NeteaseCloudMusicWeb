import React from "react";
import styled from "styled-components";
import Lyric from "./Lyric";
import MusicInfo from "./MusicInfo";

const Container = styled.div`
  width: 80%;
  margin-top: 24px;
`;

export default function LeftPart() {
  return (
    <Container>
      <MusicInfo />
      <Lyric />
    </Container>
  );
}
