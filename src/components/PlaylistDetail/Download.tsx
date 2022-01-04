import { List } from "antd";
import React from "react";
import styled from "styled-components";
import { Header } from "./Subscribers";
import { Artists } from "../SongDetail/SemiPlaylists";

const imageData = [
  "https://s2.music.126.net/style/web2/img/sprite.png?201c50fb4ce8f73c73f43cc15ba1bc14",
];

const Image = styled.div<{ imgUrl: string }>`
  background: url(${({ imgUrl }) => imgUrl});
  height: 64px;
  margin-bottom: 10px;
  background-position: -5px -392px;
  margin: 0px auto;
  width: 200px;
  margin-top: 24px;
  text-align: center;
`;

export default function Download() {
  return (
    <>
      <Header style={{ marginTop: "16px" }}>网易云音乐多端下载</Header>
      <List
        header={null}
        dataSource={imageData}
        renderItem={(item) => (
          <>
            <Image imgUrl={item} />
            <Artists style={{ marginLeft: "12px", width: "100%" }}>
              同步歌单，随时畅听320k好音乐
            </Artists>
          </>
        )}
      />
    </>
  );
}
