import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingArea from "../components/Common/LoadingArea";
import LeftPart from "../components/SongDetail/LeftPart";
import RightPart from "../components/SongDetail/RightPart";
import { SongContext } from "../context/SongDetail/Context";
import useHttpRequest from "../hooks/useHttpRequest";

const Container = styled.div`
  margin: 0 auto;
  border-left: 1px solid #999999;
  border-right: 1px solid #999999;
  padding-top: 0px;
  background-color: white;
  display: flex;
  min-width: 950px;
  width: 64vw;
`;

export default function SongDetail() {
  const params = useParams();
  const song = useHttpRequest({
    api: "/song/detail",
    method: "GET",
    requestData: JSON.stringify({ ids: params.id }),
    credentials: "include",
  });
  return (
    <Container>
      <SongContext.Provider value={{ song: song }}>
        {song.songs ? (
          <>
            <LeftPart />
            <RightPart />
          </>
        ) : (
          <LoadingArea height="90vh" />
        )}
      </SongContext.Provider>
    </Container>
  );
}
