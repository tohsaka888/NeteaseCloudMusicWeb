import styled from "styled-components";
import React from "react";
import { Spin } from "antd";

type Props = {
  height: string;
  width?: string;
  style?: React.CSSProperties;
};

const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

export default function LoadingArea({ height, width = "100%", style }: Props) {
  return (
    <Container height={height} width={width} style={style}>
      <Spin size="large" tip="Loading......" />
    </Container>
  );
}
