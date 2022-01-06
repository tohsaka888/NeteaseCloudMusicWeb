import { Flex } from "@chakra-ui/react";
import { Typography } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useHttpRequest from "../../hooks/useHttpRequest";
import LoadingArea from "../Common/LoadingArea";
import { Header } from "./Subscribers";

const CoverImage = styled.img`
  width: 60px;
  height: 60px;
`;

export default function RecommendPlaylists() {
  const params = useParams();
  const data = useHttpRequest({
    api: "/related/playlist",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  const navigator = useNavigate();
  return (
    <>
      <Header style={{ marginTop: "16px" }}>相关歌单推荐</Header>
      {data.playlists ? (
        data.playlists.map((item: any, index: number) => {
          return (
            <Flex
              key={index}
              style={{ marginTop: "8px", cursor: "pointer" }}
              onClick={() => {
                navigator(`/playlist/${item.id}`);
              }}
            >
              <CoverImage src={item.coverImgUrl} />
              <Typography style={{ width: "150px", marginLeft: "8px" }}>
                <Typography.Paragraph ellipsis={{ rows: 1 }}>
                  {item.name}
                </Typography.Paragraph>
                <Typography.Paragraph
                  style={{ fontSize: "12px", color: "#666666" }}
                >
                  By: &nbsp;{item.creator.nickname}
                </Typography.Paragraph>
              </Typography>
            </Flex>
          );
        })
      ) : (
        <LoadingArea height="40vh" />
      )}
    </>
  );
}
