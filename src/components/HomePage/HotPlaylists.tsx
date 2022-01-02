import { ArrowRightOutlined, StarFilled } from "@ant-design/icons";
import { Col, message, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { sendRequest } from "../../request/HomePage/HotPlaylists";
import "../../styles/HomePage.css";
import LoadingArea from "./LoadingArea";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

const CoverImage = styled.img`
  width: 140px;
  height: 140px;
  position: relative;
  cursor: pointer;
`;

const Mask = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?875fada230905865047312b7cad556bd");
  position: absolute;
  background-position: 0 0;
  width: 140px;
  height: 140px;
  bottom: 56px;
  cursor: pointer;
`;

export const PlaylistBottom = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?875fada230905865047312b7cad556bd");
  background-position: 0 -537px;
  height: 27px;
  width: 140px;
  bottom: 0;
  position: absolute;
`;

export const BottomIcon = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/iconall.png?05d79bb7dd58d4f453ef3cbb47dd0f78");
  background-position: 0 -24px;
  float: left;
  width: 14px;
  height: 11px;
  margin: 9px 5px 9px 10px;
  position: absolute;
  bottom: -1px;
`;

export const BottomIconPlay = styled.div`
  position: absolute;
  right: 10px;
  bottom: 4px;
  width: 16px;
  height: 17px;
  background-position: 0 0;
  background-image: url("https://s2.music.126.net/style/web2/img/iconall.png?05d79bb7dd58d4f453ef3cbb47dd0f78");
`;

export const PlayCount = styled.div`
  position: absolute;
  bottom: 4px;
  color: #ccc;
  float: left;
  left: 28px;
  font-size: 12px;
`;

const Title = styled.div`
  height: 33px;
  width: 100%;
  border-bottom: 2px solid #c10d0c;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const SimpleMenu = styled.div`
  display: flex;
  align-items: center;
  height: 33px;
  font-size: 12px;
  margin-left: 16px;
`;

const Item = styled.div`
  font-size: 12px;
  margin-right: 8px;
  color: #666;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Front = styled.div`
  display: flex;
  align-items: center;
`;

const More = styled.div`
  text-align: right;
  color: #666;
  font-size: 12px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

const { Paragraph } = Typography;

export default function HotPlaylists() {
  const [hotplaylists, setHotPlaylists] = useState<any[]>([]);
  const navigator = useNavigate();
  useEffect(() => {
    const getHotPlaylists = async () => {
      const data = await sendRequest();
      if (!data.fail) {
        setHotPlaylists(data);
      } else {
        message.error({ content: data.errmsg, key: "networkError" });
      }
    };
    getHotPlaylists();
  }, []);
  return (
    <>
      <Title>
        <Front>
          <StarFilled style={{ color: "#c10d0c", marginRight: "6px" }} />
          <div>热门推荐</div>
          <SimpleMenu>
            <Item>华语</Item>
            <Item>|</Item>
            <Item>流行</Item>
            <Item>|</Item>
            <Item>摇滚</Item>
            <Item>|</Item>
            <Item>民谣</Item>
            <Item>|</Item>
            <Item>电子</Item>
          </SimpleMenu>
        </Front>
        <More>
          更多
          <ArrowRightOutlined
            style={{
              color: "#8a060b",
              fontSize: 10,
              fontWeight: "bold",
              marginLeft: "6px",
            }}
          />
        </More>
      </Title>
      <Row justify="space-around">
        {hotplaylists.length !== 0 ? (
          hotplaylists.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <Container>
                  <CoverImage src={item.coverImgUrl} />
                  <Mask
                    onClick={() => {
                      navigator(`/playlist/${item.id}`);
                    }}
                  >
                    <PlaylistBottom />
                    <BottomIcon />
                    <PlayCount>{item.playCount}</PlayCount>
                    <BottomIconPlay />
                  </Mask>
                  <Typography style={{ width: "140px" }}>
                    <Paragraph ellipsis={{ rows: 2 }}>{item.name}</Paragraph>
                  </Typography>
                </Container>
              </Col>
            );
          })
        ) : (
          <LoadingArea height="30vh" />
        )}
      </Row>
    </>
  );
}
