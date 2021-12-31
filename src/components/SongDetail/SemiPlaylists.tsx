import { Divider, List } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useHttpRequest from "../../hooks/useHttpRequest";
import { ListHeader } from "./SemiSongs";

type ItemProps = {
  item: any;
  index: number;
};

const Container = styled.div`
  display: flex;
  padding: 5%;
  width: 100%;
`;

const CoverImage = styled.img`
  width: 50px;
  height: 50px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  cursor: pointer;
`;

const PlaylistName = styled.div`
  font-size: 14px;
  margin-left: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
`;

export const Artists = styled.div`
  font-size: 10px;
  width: 80%;
  color: #cecece;
  margin-left: 10px;
  margin-top: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const RenderItem = ({ item, index }: ItemProps) => {
  const navigator = useNavigate();
  return (
    <>
      <Container key={index}>
        <CoverImage src={item.coverImgUrl} />
        <Flex
          onClick={() => {
            navigator(`/playlist/${item.id}`);
          }}
        >
          <PlaylistName>{item.name}</PlaylistName>
          <Artists>
            By: &nbsp;
            {item.creator.nickname}
          </Artists>
        </Flex>
      </Container>
      <Divider style={{ margin: "2px" }} />
    </>
  );
};

export default function SemiPlaylists() {
  const params = useParams();
  const data = useHttpRequest({
    api: "/simi/playlist",
    credentials: "include",
    method: "GET",
    requestData: JSON.stringify({ id: params.id }),
  });
  return (
    <List
      header={<ListHeader>包含这首歌的歌单</ListHeader>}
      dataSource={data && data.playlists}
      renderItem={(item, index) => <RenderItem item={item} index={index} />}
    />
  );
}
