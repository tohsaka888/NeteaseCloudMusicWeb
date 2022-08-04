/*
 * @Author: tohsaka888
 * @Date: 2022-08-04 11:48:19
 * @LastEditors: tohsaka888
 * @LastEditTime: 2022-08-04 14:49:48
 * @Description: 请填写简介
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Content from "../components/playlist/Content";
import Header from "../components/playlist/Header";
import { BaseUrl } from "../request/BaseUrl";

const Container = styled.div`
  margin: 0px auto;
  width: 64vw;
  min-width: 950px;
  padding: 36px 24px;
  background-color: white;
  border-left: 1px solid #cecece;
  border-right: 1px solid #cecece;
`;

export default function Playlist() {
  const params = useParams();
  const [category, setCategory] = useState<string>("全部");
  const [page, setPage] = useState<number>(1);
  const [playlists, setPlaylist] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    const playlistParams = JSON.parse(params.playlistParams || "{}");
    if (playlistParams.category) {
      setCategory(playlistParams.category);
    }
    if (playlistParams.page) {
      setPage(playlistParams.page);
    }
  }, [params.playlistParams]);
  useEffect(() => {
    const sendReuqest = async () => {
      const res = await fetch(
        `${BaseUrl}/top/playlist?limit=35&offset=${35 * page}&cat=${category}&realIP=116.25.146.177`
      );
      const data = await res.json();
      console.log(data);
      setPlaylist(data.playlists);
      setTotal(data.total);
    };
    sendReuqest();
  }, [category, page]);
  return (
    <Container>
      <Header category={category} />
      <Content playlists={playlists} total={total} category={category} />
    </Container>
  );
}
