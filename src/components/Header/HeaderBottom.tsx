import React from "react";
import styled from "styled-components";
import { Menu } from "antd";
import '../../styles/Header.css'

const Container = styled.div`
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;
  height: 35px;
  display: flex;
  align-items: center;
`;

export default function HeaderBottom() {
  return (
    <Container>
      <Menu mode="horizontal" theme="dark" className="footer_menu">
        <Menu.Item key={"/"}>推荐</Menu.Item>
        <Menu.Item>排行榜</Menu.Item>
      </Menu>
    </Container>
  );
}
