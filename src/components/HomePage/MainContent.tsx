import { ArrowRightOutlined, StarFilled } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import HotPlaylists from "./HotPlaylists";

const Containner = styled.div`
  width: 48vw;
  height: 100%;
  border: 1px solid #cecece;
  padding: 20px 20px 40px;
`;

const Title = styled.div`
  height: 33px;
  width: 100%;
  border-bottom: 2px solid #c10d0c;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const SimpleMenu = styled.div`
  display: flex;
  align-items: center;
  height: 33px;
  font-size: 12px;
  margin-left: 16px;
`;

const Item = styled.div`
  font-size: 12px;
  margin-right: 8px;
  color: #666;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Front = styled.div`
  display: flex;
  align-items: center;
`;

const More = styled.div`
  text-align: right;
  color: #666;
  font-size: 12px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

export default function MainContent() {
  return (
    <Containner>
      <Title>
        <Front>
          <StarFilled style={{ color: "#c10d0c", marginRight: "6px" }} />
          <div>热门推荐</div>
          <SimpleMenu>
            <Item>华语</Item>
            <Item>|</Item>
            <Item>流行</Item>
            <Item>|</Item>
            <Item>摇滚</Item>
            <Item>|</Item>
            <Item>民谣</Item>
            <Item>|</Item>
            <Item>电子</Item>
          </SimpleMenu>
        </Front>
        <More>
          更多
          <ArrowRightOutlined
            style={{
              color: "#8a060b",
              fontSize: 10,
              fontWeight: "bold",
              marginLeft: "6px",
            }}
          />
        </More>
      </Title>
      <HotPlaylists />
      <Title>
        <Front>
          <StarFilled style={{ color: "#c10d0c", marginRight: "6px" }} />
          <div>个性推荐</div>
        </Front>
      </Title>
    </Containner>
  );
}
