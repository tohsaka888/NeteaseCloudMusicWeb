import { Typography } from "antd";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CurrentTimeContext } from "../../context/Context";
import useHttpRequest from "../../hooks/useHttpRequest";
import useLrcParser from "../../hooks/useLrcParser";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 80px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export default function Lyric() {
  const params = useParams();
  const data = useHttpRequest({
    api: "/lyric",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  const { currentTime } = useContext(CurrentTimeContext);
  const lyric = useLrcParser(data);
  return (
    <Flex>
      <Container style={{ borderRight: "1px solid #dfdfdf" }}>
        <Typography style={{ lineHeight: 1.1 }}>
          {lyric?.slice(0, lyric.length / 2).map((item, index) => {
            const exp =
              currentTime <= item.endTime && currentTime >= item.startTime;
            return (
              <Typography.Paragraph
                key={index}
                style={{
                  fontSize: "12px",
                  color: exp ? "red" : "black",
                  fontWeight: exp ? "bold" : "normal",
                  textShadow: exp ? "1px 1px 1px gray" : "",
                }}
              >
                {item.content}
              </Typography.Paragraph>
            );
          })}
        </Typography>
      </Container>
      <Container>
        <Typography style={{ lineHeight: 1.1 }}>
          {lyric?.slice(lyric.length / 2, lyric.length).map((item, index) => {
            const exp =
              currentTime <= item.endTime && currentTime >= item.startTime;
            return (
              <Typography.Paragraph
                key={index}
                style={{
                  fontSize: "12px",
                  color: exp ? "red" : "black",
                  fontWeight: exp ? "bold" : "normal",
                  textShadow: exp ? "1px 1px 1px gray" : "",
                }}
              >
                {item.content}
              </Typography.Paragraph>
            );
          })}
        </Typography>
      </Container>
    </Flex>
  );
}
