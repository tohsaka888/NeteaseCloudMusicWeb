import React from "react";
import styled from "styled-components";

type Props = {
  total: number;
  type?: string;
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Total = styled.div`
  font-size: 12px;
  color: #999999;
  margin-left: 16px;
`;

export default function ListHeader({ total, type = "" }: Props) {
  return (
    <Container>
      <Title>{type === "hot" ? "热门评论" : "最新评论"}</Title>
      <Total>共有{total}条评论</Total>
    </Container>
  );
}
