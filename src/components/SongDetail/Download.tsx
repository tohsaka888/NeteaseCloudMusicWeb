import { List } from "antd";
import React from "react";
import styled from "styled-components";
import { Artists } from "./SemiPlaylists";
import { ListHeader } from "./SemiSongs";

const imageData = [
  "https://s2.music.126.net/style/web2/img/sprite.png?201c50fb4ce8f73c73f43cc15ba1bc14",
];

const Image = styled.div<{ imgUrl: string }>`
  background: url(${({ imgUrl }) => imgUrl});
  height: 65px;
  margin-bottom: 10px;
  background-position: -5px -392px;
  width: 80%;
  margin: 0px 10%;
  margin-top: 24px;
  text-align: center;
`;

export default function Download() {
  return (
    <List
      header={<ListHeader>网易云多端下载</ListHeader>}
      dataSource={imageData}
      renderItem={(item) => (
        <>
          <Image imgUrl={item} />
          <Artists style={{ marginLeft: "24px" }}>
            同步歌单，随时畅听320k好音乐
          </Artists>
        </>
      )}
    />
  );
}
