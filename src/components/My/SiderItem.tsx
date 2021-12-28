import { Typography } from "antd";
import React from "react";
import styled from "styled-components";

type Props = {
  info: any;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 60px;
`;

const CoverImage = styled.img`
  width: 50px;
  height: 50px;
`;

export default function SiderItem({ info }: Props) {
  return (
    <Container>
      <CoverImage src={info.coverImgUrl} />
      <Typography
        style={{ marginLeft: "8px", width: "125px", lineHeight: "22px" }}
      >
        <Typography.Text
          ellipsis={true}
          style={{ fontSize: "13px", lineHeight: "20px", fontWeight: "bold" }}
        >
          {info.name}
        </Typography.Text>
        <br />
        <Typography.Text
          style={{ fontSize: "12px", lineHeight: "20px", color: "#666" }}
          ellipsis={true}
        >
          {info.trackCount}首
        </Typography.Text>
      </Typography>
    </Container>
  );
}
