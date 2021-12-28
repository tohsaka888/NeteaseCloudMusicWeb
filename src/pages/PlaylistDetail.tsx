import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import MusicList from "../components/PlaylistDetail/MusicList";
import PlaylistInfo from "../components/PlaylistDetail/PlaylistInfo";
import useHttpRequest from "../hooks/useHttpRequest";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  padding-bottom: "30vh";
`;

const Container = styled.div`
  background-color: white;
  border: 1px solid rgb(211, 211, 211);
  border-bottom: 0px;
`;

export default function PlaylistDetail() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const data = useHttpRequest({
    api: "/playlist/detail",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  useEffect(() => {
    if (data.playlist && params.id && data.playlist.id === +params.id) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data.playlist, params.id]);
  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <Spin tip="loading......" delay={300} />
        </LoadingContainer>
      ) : (
        <>
          <PlaylistInfo info={data.playlist} />
          <MusicList info={data.playlist} />
        </>
      )}
    </Container>
  );
}
