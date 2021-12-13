import { StarFilled } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getRecommendPlaylists } from "../../request/HomePage/RecommendPlaylists";

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
  bottom: 88px;
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

const Title = styled.div`
  height: 33px;
  width: 100%;
  border-bottom: 2px solid #c10d0c;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const Front = styled.div`
  display: flex;
  align-items: center;
`;

const { Paragraph, Text } = Typography;

export default function DailyRecommend() {
  const [visible, setVisible] = useState<boolean>(false);
  const [dailyPlaylists, setDailyPlaylists] = useState<any[]>([]);
  useEffect(() => {
    const sendRequest = async () => {
      const data = await getRecommendPlaylists();
      if (data.code === 200) {
        setDailyPlaylists(data.recommend.slice(0, 4));
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    sendRequest();
  }, []);
  return (
    <>
      {visible && (
        <>
          <Title>
            <Front>
              <StarFilled style={{ color: "#c10d0c", marginRight: "6px" }} />
              <div>个性推荐</div>
            </Front>
          </Title>
          <Row justify="space-around">
            {dailyPlaylists.length !== 0 &&
              dailyPlaylists.map((item, index) => {
                return (
                  <Col span={6} key={index}>
                    <Container>
                      <CoverImage src={item.picUrl} />
                      <Mask>
                        <PlaylistBottom />
                        <BottomIcon />
                        <PlayCount>{item.playcount}</PlayCount>
                        <BottomIconPlay />
                      </Mask>
                      <Typography
                        style={{
                          width: "140px",
                          lineHeight: "1.3",
                          marginTop: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <Paragraph
                          ellipsis={{ rows: 2 }}
                          style={{ marginBottom: "0px" }}
                        >
                          {item.name}
                        </Paragraph>
                        <Text
                          style={{
                            fontSize: "10px",
                            color: "#999",
                          }}
                        >
                          {item.copywriter}
                        </Text>
                      </Typography>
                    </Container>
                  </Col>
                );
              })}
          </Row>
        </>
      )}
    </>
  );
}
