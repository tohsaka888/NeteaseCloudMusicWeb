import { PlayCircleOutlined } from "@ant-design/icons";
import { List } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useHttpRequest from "../../hooks/useHttpRequest";

export const ListHeader = styled.div`
  padding-left: 8px;
  font-size: 14px;
  font-weight: bold;
`;

type ItemProps = {
  item: any;
  index: number;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  padding: 5%;
  padding-top: 10%;
`;

const MusicName = styled.div`
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  cursor: pointer;
`;

const Artists = styled.div`
  font-size: 10px;
  width: 100%;
  color: #cecece;
`;

const Items = ({ item, index }: ItemProps) => {
  const navigator = useNavigate();
  return (
    <Container>
      <Flex
        onClick={() => {
          navigator(`/song/${item.id}`);
        }}
      >
        <MusicName>{item.name}</MusicName>
        <Artists>{item.artists.map((item: any) => item.name)}</Artists>
      </Flex>
      <PlayCircleOutlined style={{ fontSize: "16px", color: "#cecece" }} />
    </Container>
  );
};

export default function SemiSongs() {
  const params = useParams();
  const songs = useHttpRequest({
    api: "/simi/song",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  return (
    <List
      header={<ListHeader>相似歌曲</ListHeader>}
      dataSource={songs.songs || []}
      renderItem={(item, index) => <Items item={item} index={index} />}
    />
  );
}
