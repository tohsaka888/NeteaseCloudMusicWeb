import { Avatar, Button, Typography } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import {
  CommentOutlined,
  DownloadOutlined,
  HeartOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import usePlayMusic from "../../hooks/usePlayMusic";
import { MusicPlayContext } from "../../context/Context";
import { Tag as AntdTag } from "antd";
import { Flex } from "@chakra-ui/react";

type Props = {
  info: any;
};

const Container = styled.div`
  display: flex;
  padding: 40px;
`;

const ImgContainer = styled.div`
  border: 1px solid #cecece;
  padding: 4px;
`;

const MusicPicture = styled.img`
  width: 208px;
  height: 208px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const Tag = styled.div`
  background: url("https://s2.music.126.net/style/web2/img/icon.png?53579242470df956200c5383fe1455f0")
    no-repeat 0 9999px;
  width: 54px;
  height: 24px;
  background-position: 0 -243px;
`;

const MusicName = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  /* margin-top: 0.5rem; */
  margin-left: 8px;
  font-size: 18px;
  font-weight: bold;
`;

const TextArea = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 16px;
  height: 203px;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 12px;
  color: #0c73c2;
  margin-left: 3px;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Creator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
`;

const Time = styled.div`
  font-size: 12px;
  margin-left: 12px;
`;

export default function PlaylistInfo({ info }: Props): JSX.Element {
  const playMusic = usePlayMusic();
  const props = useContext(MusicPlayContext);
  const createRandomColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ",0.8)";
  };
  return (
    <Container>
      <ImgContainer>
        <MusicPicture src={info.coverImgUrl} />
      </ImgContainer>
      <TextArea>
        <Title>
          <Tag />
          <MusicName>{info.name}</MusicName>
        </Title>
        <Creator>
          <Avatar src={info.creator.avatarUrl} />
          <UserName>{info.creator.nickname}</UserName>
          <Time>
            {moment(info.createTime).format("YYYY-MM-DD")}&nbsp;&nbsp;创建
          </Time>
        </Creator>
        <Creator style={{ marginTop: "12px" }}>
          <Button
            type="primary"
            icon={<PlayCircleOutlined size={80} />}
            onClick={() => {
              let id = (info.tracks[0] && info.tracks[0].id) || -1;
              if (id !== -1) {
                playMusic(id);
                props?.setRecord(info.tracks[0]);
              }
            }}
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
        </Creator>
        <Flex style={{ marginTop: "12px" }}>
          {info.tags.length !== 0 ? (
            info.tags.map((item: any, index: number) => {
              return <AntdTag color={createRandomColor()}>{item}</AntdTag>;
            })
          ) : (
            <AntdTag color={createRandomColor()}>暂无标签</AntdTag>
          )}
        </Flex>
        <Typography style={{ marginTop: "12px", maxWidth: "600px" }}>
          <Typography.Paragraph
            ellipsis={{ rows: 2, expandable: true, symbol: "展开" }}
          >
            {info.description || "这个歌单没有描述哦~"}
          </Typography.Paragraph>
        </Typography>
      </TextArea>
    </Container>
  );
}
