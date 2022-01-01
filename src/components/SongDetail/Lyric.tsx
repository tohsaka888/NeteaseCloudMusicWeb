import { TranslationOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useContext, useState } from "react";
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
  align-items: stretch;
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
  const [isTanslate, setIstranslate] = useState<boolean>(false);
  const lyric = useLrcParser(data);
  return (
    <>
      {data.tlyric && (
        <div style={{ marginLeft: "90px", marginTop: "24px" }}>
          <Button
            type="link"
            icon={<TranslationOutlined />}
            onClick={() => {
              setIstranslate(!isTanslate);
            }}
          >
            翻译歌词
          </Button>
        </div>
      )}
      <Flex style={{ marginTop: "30px" }}>
        {lyric && lyric?.length >= 20 && (
          <>
            <Container style={{ borderRight: "1px solid #dfdfdf" }}>
              <Typography style={{ lineHeight: 1.1 }}>
                {lyric?.slice(0, lyric.length / 2).map((item, index) => {
                  const exp =
                    currentTime <= item.endTime &&
                    currentTime >= item.startTime;
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
                      <Typography.Text>{item.content}</Typography.Text>
                      <br />
                      <Typography.Text>
                        {isTanslate && (item.contentZH || item.content)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  );
                })}
                {lyric.length % 2 !== 0 && (
                  <>
                    <Typography.Text>&nbsp;</Typography.Text>
                    <br />
                    {isTanslate && <Typography.Text>&nbsp;</Typography.Text>}
                  </>
                )}
              </Typography>
            </Container>
            <Container>
              <Typography style={{ lineHeight: 1.1 }}>
                {lyric
                  ?.slice(lyric.length / 2, lyric.length)
                  .map((item, index) => {
                    const exp =
                      currentTime <= item.endTime &&
                      currentTime >= item.startTime;
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
                        <Typography.Text>{item.content}</Typography.Text>
                        <br />
                        <Typography.Text>
                          {isTanslate && (item.contentZH || item.content)}
                        </Typography.Text>
                      </Typography.Paragraph>
                    );
                  })}
              </Typography>
            </Container>
          </>
        )}
        {lyric && lyric.length < 20 && (
          <Container style={{ width: "100%" }}>
            <Typography style={{ lineHeight: 1.1 }}>
              <Typography.Paragraph>
                {lyric?.map((item, index) => {
                  const exp =
                    currentTime <= item.endTime &&
                    currentTime >= item.startTime;
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
                      <Typography.Text>{item.content}</Typography.Text>
                      <br />
                      <Typography.Text>
                        {isTanslate && (item.contentZH || item.content)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  );
                })}
              </Typography.Paragraph>
            </Typography>
          </Container>
        )}
      </Flex>
    </>
  );
}
