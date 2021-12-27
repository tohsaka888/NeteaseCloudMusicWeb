import { Avatar, Button } from "antd";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import {
  CommentOutlined,
  DownloadOutlined,
  HeartOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

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
`;

const Tag = styled.div`
  background: url("https://s2.music.126.net/style/web2/img/icon.png?53579242470df956200c5383fe1455f0")
    no-repeat 0 9999px;
  width: 54px;
  height: 24px;
  background-position: 0 -243px;
`;

const MusicName = styled.h2`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  margin-top: 0.5rem;
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
`;

const Time = styled.div`
  font-size: 12px;
  margin-left: 12px;
`;

export default function PlaylistInfo({ info }: Props): JSX.Element {
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
        <Creator style={{ marginTop: "14px" }}>
          <Button type="primary" icon={<PlayCircleOutlined size={80} />}>
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
      </TextArea>
    </Container>
  );
}
