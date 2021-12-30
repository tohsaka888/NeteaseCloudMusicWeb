import {
  LeftCircleOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { Affix } from "antd";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { CurrentTimeContext, MusicPlayContext } from "../../context/Context";
import JumpController from "../../springs/JumpController";
import { MdGraphicEq } from "react-icons/md";
import moment from "moment";

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
  margin-left: 16px;
`;

const TimeArea = styled.div`
  font-style: italic;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 16px;
`;

export default function MusicController() {
  const props = useContext(MusicPlayContext);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  // const [currentTime, setCurrentTime] = useState<number>(0);
  const [playStatus, setPlayStatus] = useState<boolean>(false);
  const { currentTime, setCurrentTime } = useContext(CurrentTimeContext);
  const intervalIdRef = useRef<any>(0);
  const params = useLocation();
  const playMusic = useCallback(() => {
    setPlayStatus(true);
    props?.controllerRef.current?.play();
  }, [props?.controllerRef]);
  const callback = useCallback(() => {
    setCurrentTime(props?.controllerRef.current?.currentTime || 0);
  }, [props?.controllerRef, setCurrentTime]);
  useEffect(() => {
    console.log(111);
    switch (playStatus) {
      case false:
        if (intervalIdRef.current) {
          clearInterval(intervalIdRef.current);
          // console.log("pause");
        }
        break;
      case true:
        let id = setInterval(() => {
          callback();
        }, 500);
        setPlaying(true);
        intervalIdRef.current = id;
        // console.log("play");
        break;
    }
  }, [callback, playStatus, props?.controllerRef, setCurrentTime]);
  const pauseMusic = () => {
    setPlayStatus(false);
    props?.controllerRef.current?.pause();
    setPlaying(false);
  };
  const dragStart = (value: number) => {
    setPlayStatus(false);
  };
  const onDragging = useCallback((value) => {
    setCurrentTime(value);
  }, [setCurrentTime]);
  const dragEnd = useCallback(
    (value: number) => {
      setCurrentTime(value);
      if (props?.controllerRef.current) {
        props.controllerRef.current.currentTime = value;
      }
      playMusic();
    },
    [playMusic, props?.controllerRef, setCurrentTime]
  );
  return (
    <Affix
      offsetBottom={0}
      style={{
        position:
          params.pathname === "/" ||
          params.pathname.includes("/playlist") ||
          params.pathname.includes("/song")
            ? "sticky"
            : "absolute",
        bottom: 0,
      }}
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
              aria-label="slider-ex-4"
              defaultValue={0}
              value={currentTime}
              max={props?.controllerRef.current?.duration || 1}
              width={"45vw"}
              // onDragStart={dragStart}
              onChangeStart={dragStart}
              onChange={onDragging}
              onChangeEnd={dragEnd}
            >
              <SliderTrack bg="red.100">
                <SliderFilledTrack bg="tomato" />
              </SliderTrack>
              <SliderThumb boxSize={4}>
                <Box color="tomato" as={MdGraphicEq} />
              </SliderThumb>
            </Slider>
            <TimeArea>
              {moment(currentTime * 1000).format("mm:ss")}/
              {moment(
                (props?.controllerRef.current &&
                  props?.controllerRef.current.duration * 1000) ||
                  0
              ).format("mm:ss")}
            </TimeArea>
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
              if (refs && props?.controllerRef) {
                props.controllerRef.current = refs;
              }
            }}
          />
        </Container>
      </JumpController>
    </Affix>
  );
}
