import { FileAddOutlined, PlayCircleOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
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
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 24px;
  justify-content: flex-start;
  text-align: left;
  width: 100%;
`;

const Mask = styled.div`
  background: url("https://s2.music.126.net/style/web2/img/coverall.png?ab14b6bc1d7f9b6791c1cdbe2747b54d");
  position: absolute;
  width: 80px;
  height: 80px;
  background-position: -145px -57px;
  margin-left: 24px;
  cursor: pointer;
`;

const Number = styled.div<{ index: number }>`
  font-weight: bold;
  margin-right: 8px;
  color: ${({ index }) => (index <= 2 ? "#c10d0c" : "black")};
  font-size: 16px;
`;

const MusicName = styled.div`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  :hover {
    text-decoration: underline;
  }
`;

export default function ToplistDetail({ list }: Props): JSX.Element {
  const navigator = useNavigate();
  return (
    <Container>
      <Flex index={0}>
        <CoverImage src={list.coverImgUrl || ""} />
        <Mask
          onClick={() => {
            navigator(`/playlist/${list.id}`);
          }}
        />
        <div style={{ marginLeft: "16px" }}>
          <PlaylistName
            onClick={() => {
              navigator(`/playlist/${list.id}`);
              window.scroll({ top: 0 });
            }}
          >
            {list.name}
          </PlaylistName>
          <div style={{ marginTop: "8px" }}>
            <PlayCircleOutlined
              style={{ fontSize: "20px", color: "#999999" }}
              onClick={() => {
                navigator(`/playlist/${list.id}`);
                window.scroll({ top: 0 });
              }}
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
                <MusicName
                  onClick={() => {
                    navigator(`/song/${item.id}`);
                    window.scroll({ top: 0 });
                  }}
                >
                  {item.name}
                </MusicName>
              </Item>
            </Flex>
          );
        })
      ) : (
        <LoadingArea height="60vh" />
      )}
    </Container>
  );
}
