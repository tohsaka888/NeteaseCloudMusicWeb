import {
  LeftCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { Affix, Slider } from "antd";
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { MusicPlayContext } from "../../context/Context";
import JumpController from "../../springs/JumpController";

const Container = styled.div`
  background-color: #333333;
  height: 70px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControllerMain = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 60px;
  justify-content: center;
`;

const CoverImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 3px;
  margin-right: 16px;
`;

const TextArea = styled.div`
  display: flex;
  flex-direction: column;
  width: "5vw";
  margin-right: 16px;
`;

const MusicName = styled.div`
  font-size: 14px;
  color: white;
`;

const Artist = styled.div`
  font-size: 12px;
  color: #cecece;
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function MusicController() {
  const props = useContext(MusicPlayContext);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>(0);
  const controllerRef = useRef<HTMLAudioElement>();
  const playMusic = (event: any) => {
    let id = setInterval(() => {
      setCurrentTime(controllerRef.current?.currentTime || 0);
    }, 500);
    setPlaying(true);
    setIntervalId(id);
    controllerRef.current?.play();
  };
  const pauseMusic = (event: any) => {
    console.log(intervalId);
    clearInterval(intervalId);
    controllerRef.current?.pause();
    setPlaying(false);
  };
  return (
    <Affix
      offsetBottom={0}
      style={{ position: "sticky", bottom: 0 }}
    >
      <JumpController isShow={isShow}>
        <Container
          onMouseOver={() => {
            setIsShow(true);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setIsShow(false);
            }, 500);
          }}
        >
          <ControllerMain>
            <CoverImage
              src={
                props?.record.al
                  ? props?.record.al.picUrl
                  : "https://s4.music.126.net/style/web2/img/default/default_album.jpg"
              }
            />
            <TextArea>
              <MusicName>
                {props?.record.name ? props?.record.name : "暂无播放中的音乐~"}
              </MusicName>
              <Artist>
                {props?.record.ar
                  ? props.record.ar.map((item: any) => item.name)
                  : "暂无歌手"}
              </Artist>
            </TextArea>
            <Slider
              style={{ width: "40vw" }}
              trackStyle={{ color: "red" }}
              handleStyle={{ color: "red" }}
              value={currentTime}
              max={controllerRef.current?.duration}
            />
            <ButtonArea>
              <LeftCircleOutlined
                style={{ color: "white", fontSize: "25px" }}
              />
              {props?.musicUrl && playing ? (
                <PauseCircleOutlined
                  onClick={pauseMusic}
                  style={{
                    color: "white",
                    fontSize: "30px",
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                />
              ) : (
                <PlayCircleOutlined
                  onClick={playMusic}
                  style={{
                    color: "white",
                    fontSize: "30px",
                    marginLeft: "8px",
                    marginRight: "8px",
                  }}
                />
              )}
              <RightCircleOutlined
                style={{ color: "white", fontSize: "25px" }}
              />
            </ButtonArea>
          </ControllerMain>
          <audio
            src={props?.musicUrl}
            autoPlay={true}
            onCanPlay={playMusic}
            onPause={pauseMusic}
            ref={(refs) => {
              if (refs) {
                controllerRef.current = refs;
              }
            }}
          />
        </Container>
      </JumpController>
    </Affix>
  );
}
