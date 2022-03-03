import { Box, Flex } from "@chakra-ui/react";
import { Popover } from "antd";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SearchContext } from "../../context/Search/SearchContext";
import { BaseUrl, httpHeader } from "../../request/BaseUrl";

type Props = {
  children: ReactNode;
};

type ResultType = {
  albums: any[];
  artists: any[];
  songs: any[];
  playlists: any[];
};

const SearchTitle = styled.div`
  font-size: 12px;
  color: #666666;
`;

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 180px;
  padding-left: 8px;
  margin-bottom: 4px;
  cursor: pointer;
  :hover {
    background-color: #f2f2fc;
  }
`;

const SearchResult = () => {
  const searchProps = useContext(SearchContext);
  const [result, setResult] = useState<ResultType>({
    albums: [],
    artists: [],
    songs: [],
    playlists: [],
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (searchProps?.searchValue) {
      const sendRequest = async () => {
        const res = await fetch(
          `${BaseUrl}/search/suggest?keywords=${searchProps.searchValue}&type=web`,
          {
            method: "GET",
            headers: httpHeader,
            credentials: "include",
            mode: "cors",
          }
        );
        const data = await res.json();
        setResult(data.result);
      };
      sendRequest();
    }
  }, [searchProps?.searchValue]);
  return (
    <Flex w={["15vw"]} flexDir="column">
      <Flex justify={"center"}>
        <Flex flex={1} justify="flex-end" mr={"8px"}>
          音乐
        </Flex>
        <Box borderLeft="1px solid #DDDDDD" flex={3}>
          {result && result.songs ? (
            result.songs.map((song, index) => (
              <Ellipsis
                key={index}
                onClick={() => {
                  navigate(`/song/${song.id}`);
                }}
              >
                {song.name}
              </Ellipsis>
            ))
          ) : (
            <Ellipsis>暂无结果</Ellipsis>
          )}
        </Box>
      </Flex>
      <Flex justify={"center"}>
        <Flex flex={1} justify="flex-end" mr={"8px"}>
          歌手
        </Flex>
        <Box
          borderLeft="1px solid #DDDDDD"
          borderTop={"1px solid #DDDDDD"}
          flex={3}
        >
          {result && result.artists ? (
            result.artists.map((artist, index) => (
              <Ellipsis key={index} onClick={() => {}}>
                {artist.name}
              </Ellipsis>
            ))
          ) : (
            <Ellipsis>暂无结果</Ellipsis>
          )}
        </Box>
      </Flex>
      <Flex justify={"center"}>
        <Flex flex={1} justify="flex-end" mr={"8px"}>
          歌单
        </Flex>
        <Box
          borderLeft="1px solid #DDDDDD"
          borderTop={"1px solid #DDDDDD"}
          flex={3}
        >
          {result && result.playlists ? (
            result.playlists.map((playlist, index) => (
              <Ellipsis key={index} onClick={() => {navigate(`/playlist/${playlist.id}`)}}>{playlist.name}</Ellipsis>
            ))
          ) : (
            <Ellipsis>暂无结果</Ellipsis>
          )}
        </Box>
      </Flex>
      <Flex justify={"center"}>
        <Flex flex={1} justify="flex-end" mr={"8px"}>
          专辑
        </Flex>
        <Box
          borderLeft="1px solid #DDDDDD"
          borderTop={"1px solid #DDDDDD"}
          flex={3}
        >
          {result && result.albums ? (
            result.albums.map((album, index) => (
              <Ellipsis key={index}>{album.name}</Ellipsis>
            ))
          ) : (
            <Ellipsis>暂无结果</Ellipsis>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

function SearchModal({ children }: Props) {
  const searchProps = useContext(SearchContext);
  return (
    <Popover
      content={SearchResult}
      // visible={!!searchProps?.searchValue}
      trigger={"focus"}
      placement={"bottomLeft"}
      title={
        <SearchTitle>搜"{searchProps?.searchValue}"相关的用户</SearchTitle>
      }
    >
      {children}
    </Popover>
  );
}

export default SearchModal;
