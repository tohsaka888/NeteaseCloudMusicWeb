import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getHotDj } from "../../request/HomePage/HotDj";

const Container = styled.div`
  background-color: transparent;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  border-bottom: 1px solid gray;
  padding: 3px 5px;
  margin: 8px 10px;
  font-size: 12px;
`;

const More = styled.div`
  font-weight: normal;
`;

const Item = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  padding: 0px 16px;
`;

const CoverImage = styled.img`
  width: 60px;
  height: 60px;
`;

export default function HotDj() {
  const [hotDj, setHotDj] = useState<any[]>([]);
  useEffect(() => {
    const sendRequest = async () => {
      const data = await getHotDj();
      if (data.code === 200) {
        setHotDj(data.toplist);
      }
    };
    sendRequest();
  }, []);
  return (
    <Container>
      <Title>
        热门主播<More>查看全部{" >"}</More>
      </Title>
      {hotDj.map((item, index) => {
        return (
          <Item key={index}>
            <CoverImage src={item.dj.avatarUrl} />
            <Typography
              style={{ lineHeight: 1.2, width: "150px", marginLeft: "10px" }}
            >
              <Typography.Paragraph
                ellipsis={{ rows: 2 }}
                style={{
                  marginBottom: "5px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {item.dj.nickname}
              </Typography.Paragraph>
              <Typography.Paragraph
                ellipsis={{ rows: 2 }}
                style={{ margin: 0, fontSize: "10px" }}
              >
                {item.dj.signature || "这个人很懒,没有留下签名"}
              </Typography.Paragraph>
            </Typography>
          </Item>
        );
      })}
    </Container>
  );
}
