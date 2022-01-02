import { DownCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import styled from "styled-components";

type Props = {
  category?: string;
};

const Container = styled.div`
  display: flex;
  padding-bottom: 8px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #c20c0c;
`;

const Category = styled.div`
  font-size: 24px;
`;

export default function Header({ category = "全部" }: Props) {
  return (
    <Container>
      <Category>
        {category}
        <Button style={{ marginLeft: "8px", color: "#666666" }}>
          选择分类
          <DownCircleOutlined />
        </Button>
      </Category>
      <Button type="primary" style={{background: '#c20c0c'}}>热门</Button>
    </Container>
  );
}
