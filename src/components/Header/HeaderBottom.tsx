import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../styles/Header.css";

type Props = {
  defaultSelectedKey: string;
};

const Container = styled.div<{ show: boolean }>`
  background-color: #c20c0c;
  border-bottom: 1px solid #a40011;
  height: ${({ show }) => (show ? "35px" : "5px")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.div`
  background-color: transparent;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 200px;
`;

type ItemProps = {
  selectedKey: string;
  name: string;
};

const Item = styled.div<ItemProps>`
  display: flex;
  align-items: center;
  color: white;
  font-size: 12px;
  padding: 0px 16px;
  height: 80%;
  margin: 10% 8px;
  min-width: fit-content;
  background-color: ${({ selectedKey, name }) =>
    selectedKey === name ? "#9B0909" : "transparent"};
  border-radius: 16px;
  &:hover {
    background-color: #9b0909;
    cursor: pointer;
    border-radius: 16px;
  }
`;

export default function HeaderBottom({ defaultSelectedKey }: Props) {
  const [selectedKey, setSelectKey] = useState<string>(defaultSelectedKey);
  const navigate = useNavigate();
  const location = useLocation();
  const moveTo = (route: string) => {
    navigate(route);
    setSelectKey(route);
  };
  return (
    <Container show={location.pathname === "/"}>
      {location.pathname === "/" && (
        <Menu>
          <Item
            selectedKey={selectedKey}
            name="/"
            onClick={() => {
              moveTo("/");
            }}
          >
            推荐
          </Item>
          <Item
            selectedKey={selectedKey}
            name="discover/toplist"
            onClick={() => {
              moveTo("discover/toplist");
            }}
          >
            排行榜
          </Item>
          <Item
            selectedKey={selectedKey}
            name="discover/playlist"
            onClick={() => {
              moveTo("discover/playlist");
            }}
          >
            歌单
          </Item>
          <Item
            selectedKey={selectedKey}
            name="discover/djradio"
            onClick={() => {
              moveTo("discover/djradio");
            }}
          >
            主播电台
          </Item>
          <Item
            selectedKey={selectedKey}
            name="discover/artist"
            onClick={() => {
              moveTo("discover/artist");
            }}
          >
            歌手
          </Item>
          <Item
            selectedKey={selectedKey}
            name="discover/album"
            onClick={() => {
              moveTo("discover/album");
            }}
          >
            新碟上架
          </Item>
        </Menu>
      )}
    </Container>
  );
}
