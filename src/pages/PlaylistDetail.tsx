import { Spin } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import CommentList from "../components/CommentList/CommentList";
import MusicList from "../components/PlaylistDetail/MusicList";
import PlaylistInfo from "../components/PlaylistDetail/PlaylistInfo";
import SiderContent from "../components/PlaylistDetail/SiderContent";
import useHttpRequest from "../hooks/useHttpRequest";

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90vh;
  padding-bottom: "30vh";
  min-width: 750px;
`;

const Container = styled.div<{ isMy: boolean }>`
  background-color: white;
  border: 1px solid rgb(211, 211, 211);
  border-bottom: 0px;
  min-width: ${({ isMy }) => (isMy ? "750px" : "950px")};
  display: flex;
`;

export default function PlaylistDetail() {
  const params = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const data = useHttpRequest({
    api: "/playlist/detail",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (data.playlist && params.id && data.playlist.id === +params.id) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [data.playlist, params.id]);
  return (
    <Container isMy={location.pathname.includes("/my")}>
      <div
        style={{
          minWidth: !location.pathname.includes("/my") ? "710px" : undefined,
        }}
      >
        {isLoading ? (
          <LoadingContainer>
            <Spin tip="loading......" delay={300} />
          </LoadingContainer>
        ) : (
          <>
            <PlaylistInfo info={data.playlist} />
            <MusicList info={data.playlist} />
            <CommentList type={2} />
          </>
        )}
      </div>
      {!location.pathname.includes("/my") && <SiderContent />}
    </Container>
  );
}
