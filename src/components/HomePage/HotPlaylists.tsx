import { Col, message, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { sendRequest } from "../../request/HomePage/HotPlaylists";
import "../../styles/HomePage.css";

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
`;

const Mask = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?875fada230905865047312b7cad556bd");
  position: absolute;
  background-position: 0 0;
  width: 140px;
  height: 140px;
  bottom: 58px;
`;

const PlaylistBottom = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?875fada230905865047312b7cad556bd");
  background-position: 0 -537px;
  height: 27px;
  width: 140px;
  bottom: 0;
  position: absolute;
`;

const BottomIcon = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/iconall.png?05d79bb7dd58d4f453ef3cbb47dd0f78");
  background-position: 0 -24px;
  float: left;
  width: 14px;
  height: 11px;
  margin: 9px 5px 9px 10px;
  position: absolute;
  bottom: -1px;
`;

const BottomIconPlay = styled.div`
  position: absolute;
  right: 10px;
  bottom: 4px;
  width: 16px;
  height: 17px;
  background-position: 0 0;
  background-image: url("https://s2.music.126.net/style/web2/img/iconall.png?05d79bb7dd58d4f453ef3cbb47dd0f78");
`;

const PlayCount = styled.div`
  position: absolute;
  bottom: 4px;
  color: #ccc;
  float: left;
  left: 28px;
  font-size: 12px;
`;

const { Paragraph } = Typography;

export default function HotPlaylists() {
  const [hotplaylists, setHotPlaylists] = useState<any[]>([]);
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
    <Row justify="space-around">
      {hotplaylists.length !== 0 &&
        hotplaylists.map((item, index) => {
          return (
            <Col span={6} key={index}>
              <Container>
                <CoverImage src={item.coverImgUrl} />
                <Mask>
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
        })}
    </Row>
  );
}
