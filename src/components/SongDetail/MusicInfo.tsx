import React, { useContext } from "react";
import {
  CommentOutlined,
  DownloadOutlined,
  HeartOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import styled from "styled-components";
import { SongContext } from "../../context/SongDetail/Context";
import usePlayMusic from "../../hooks/usePlayMusic";
import { MusicPlayContext } from "../../context/Context";

const CoverImage = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  position: relative;
  margin-top: 38px;
  margin-left: 38.5px;
`;

const Mask = styled.div`
  background: url("https://s2.music.126.net/style/web2/img/coverall.png?f3140a480b5eaf3860e3f4b3d2515d75");
  position: absolute;
  width: 206px;
  height: 205px;
  top: 115px;
  left: 20vw;
  background-position: -140px -580px;
`;

const InfoArea = styled.div`
  margin-left: 250px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  width: 54px;
  height: 24px;
  background: url("https://s2.music.126.net/style/web2/img/icon.png?b910a5e81fe15123e35c6ea675391090");
  background-position: 0 -463px;
`;

const MusicName = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-left: 8px;
`;

const GrayText = styled.div`
  color: #999;
  font-size: 13px;
`;

const BlueText = styled.div`
  color: #0c73c2;
  font-size: 13px;
  font-weight: bold;
  margin-left: 8px;
`;

const Flex = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  margin-top: 16px;
`;

export default function MusicInfo(): JSX.Element {
  const { song } = useContext(SongContext);
  const props = useContext(MusicPlayContext);
  const playMusic = usePlayMusic();
  return (
    <>
      {song.songs.length !== 0 && (
        <>
          <Mask>
            <CoverImage src={song.songs[0].al.picUrl} />
          </Mask>
          <InfoArea>
            <Title>
              <Tag />
              <MusicName>{song.songs[0].name || ""}</MusicName>
            </Title>
            <Flex>
              <GrayText>歌手:</GrayText>
              <BlueText>
                {song.songs[0].ar.map((item: any) => {
                  return item.name;
                })}
              </BlueText>
            </Flex>
            <Flex>
              <GrayText>所属专辑:</GrayText>
              <BlueText>{song.songs[0].al.name}</BlueText>
            </Flex>
            <Flex>
              <Button
                onClick={() => {
                  playMusic(song.songs[0].id);
                  props?.setRecord(song.songs[0]);
                }}
                type="primary"
                icon={<PlayCircleOutlined size={80} />}
              >
                播放
              </Button>
              <Button style={{ marginLeft: "8px" }} icon={<HeartOutlined />}>
                收藏
              </Button>
              <Button style={{ marginLeft: "8px" }} icon={<DownloadOutlined />}>
                下载
              </Button>
              <Button style={{ marginLeft: "8px" }} icon={<CommentOutlined />}>
                评论
              </Button>
            </Flex>
          </InfoArea>
        </>
      )}
    </>
  );
}
