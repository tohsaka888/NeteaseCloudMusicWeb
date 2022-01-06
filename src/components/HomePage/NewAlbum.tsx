import { StarFilled } from "@ant-design/icons";
import { Carousel, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNewAlbum } from "../../request/HomePage/newAlbum";
import "../../styles/HomePage.css";
import LoadingArea from "../Common/LoadingArea";

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
  cursor: pointer;
`;

const Mask = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/coverall.png?f9954d6e46647002f5b5a3baee070deb");
  position: absolute;
  background-position: -1px -570px;
  width: 118px;
  height: 100px;
  cursor: pointer;
`;

const Title = styled.div`
  height: 33px;
  width: 100%;
  border-bottom: 2px solid #c10d0c;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
`;

const Front = styled.div`
  display: flex;
  align-items: center;
`;

export default function NewAlbum() {
  const [albums, setAlbums] = useState<any[]>([]);
  const navigator = useNavigate();
  useEffect(() => {
    const sendRequest = async () => {
      const data = await getNewAlbum();
      if (data && !data.fail) {
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
          <div>新碟上架</div>
        </Front>
      </Title>
      <Container>
        <Carousel dots={false}>
          {albums.map((album, index) => {
            return (
              <Area key={index} className="album">
                {album.map((item: any, i: number) => {
                  return (
                    <Album key={i}>
                      <Mask
                        onClick={() => {
                          navigator(`/playlist/${item.id}`);
                        }}
                      />
                      <CoverImage
                        src={item.picUrl}
                        onClick={() => {
                          navigator(`/playlist/${item.id}`);
                        }}
                      />
                      <Typography style={{ lineHeight: 1, marginTop: "8px" }}>
                        <Typography.Paragraph
                          ellipsis={{ rows: 1 }}
                          style={{ lineHeight: 1, marginBottom: "3px" }}
                        >
                          {item.name}
                        </Typography.Paragraph>
                        <Typography.Paragraph
                          ellipsis={{ rows: 1 }}
                          style={{ lineHeight: 1 }}
                        >
                          {item.artists.map((artist: any, i: number) => {
                            return (
                              <Typography.Text
                                key={i}
                                style={{ fontSize: "10px", color: "#666" }}
                              >
                                {artist.name}
                              </Typography.Text>
                            );
                          })}
                        </Typography.Paragraph>
                      </Typography>
                    </Album>
                  );
                })}
              </Area>
            );
          })}
        </Carousel>
        {albums.length === 0 && <LoadingArea height={"23vh"} />}
      </Container>
    </>
  );
}
