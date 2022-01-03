import { FileAddOutlined, PlayCircleOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";
import LoadingArea from "./LoadingArea";

type Props = {
  list: any;
};

const Container = styled.div`
  width: 33.33333%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Flex = styled.div<{ index: number }>`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  position: relative;
  border-bottom: 1px solid #d3d3d3;
  width: 100%;
  padding: 10px 0px;
  width: 100%;
  border-right: 1px solid #d3d3d3;
  background-color: ${({ index }) => (index % 2 ? "#f9f9f9" : "#eeebeb")};
`;

const CoverImage = styled.img`
  width: 80px;
  height: 80px;
  margin-left: 24px;
`;

const PlaylistName = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 24px;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
`;

const Number = styled.div<{ index: number }>`
  font-weight: bold;
  margin-right: 8px;
  color: ${({ index }) => (index <= 2 ? "#c10d0c" : "black")};
  font-size: 16px;
`;

export default function ToplistDetail({ list }: Props): JSX.Element {
  return (
    <Container>
      <Flex index={0}>
        <CoverImage src={list.coverImgUrl || ""} />
        <div style={{ marginLeft: "16px" }}>
          <PlaylistName>{list.name}</PlaylistName>
          <div style={{ marginTop: "8px" }}>
            <PlayCircleOutlined
              style={{ fontSize: "20px", color: "#999999" }}
            />
            <FileAddOutlined
              style={{ fontSize: "20px", color: "#999999", marginLeft: "8px" }}
            />
          </div>
        </div>
      </Flex>
      {list.tracks ? (
        list.tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <Flex key={index} index={index + 1}>
              <Item>
                <Number index={index}>{index + 1}</Number>
                {item.name}
              </Item>
            </Flex>
          );
        })
      ) : (
        <LoadingArea height="20vh" />
      )}
    </Container>
  );
}
