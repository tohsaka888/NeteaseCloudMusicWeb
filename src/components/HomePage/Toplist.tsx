import { StarFilled } from "@ant-design/icons";
import { Carousel, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getNewAlbum } from "../../request/HomePage/newAlbum";
import "../../styles/HomePage.css";

const Container = styled.div`
  padding: 0px 18px;
  background: #f5f5f5;
  border: 1px solid #fff;
  margin-top: 16px;
  padding-bottom: 36px;
  border: 1px solid #d3d3d3;
`;

const Area = styled.div`
  display: flex !important;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 184px;
`;

const Album = styled.div`
  width: 100px;
  height: 100px;
`;

const CoverImage = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
`;

const Mask = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?f9954d6e46647002f5b5a3baee070deb");
  position: absolute;
  background-position: -1px -570px;
  width: 118px;
  height: 100px;
`;

const Title = styled.div`
  height: 33px;
  width: 100%;
  border-bottom: 2px solid #c10d0c;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const Front = styled.div`
  display: flex;
  align-items: center;
`;

export default function Toplist() {
  const [albums, setAlbums] = useState<any[]>([]);
  useEffect(() => {
    const sendRequest = async () => {
      const data = await getNewAlbum();
      if (data && !data.fail) {
        console.log(data);
        setAlbums(data.album);
      }
    };
    sendRequest();
  }, []);
  return (
    <>
      <Title>
        <Front>
          <StarFilled style={{ color: "#c10d0c", marginRight: "6px" }} />
          <div>榜单</div>
        </Front>
      </Title>
      <Container></Container>
    </>
  );
}
