import { Skeleton } from "antd";
import React from "react";
import styled from "styled-components";

type Props = {
  length?: number;
};

const Container = styled.div`
  padding: 24px;
`;

export default function SkeletonArea({ length = 1 }: Props) {
  const loadingArray = Array.from({ length }, (v, i) => i);
  return (
    <Container>
      {loadingArray.map((item, index) => {
        return <Skeleton key={index} avatar paragraph={{ rows: 5 }} active />;
      })}
    </Container>
  );
}
