import { Grid, GridItem } from "@chakra-ui/react";
import { Pagination, Typography } from "antd";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  BottomIcon,
  BottomIconPlay,
  PlayCount,
  PlaylistBottom,
} from "../HomePage/HotPlaylists";
import LoadingArea from "../HomePage/LoadingArea";

type Props = {
  playlists: any[];
  total: number;
  category: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const CoverImage = styled.img`
  width: 140px;
  height: 140px;
  min-width: 140px;
  min-height: 140px;
  margin-bottom: 8px;
  position: relative;
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 140px;
  left: auto;
  right: auto;
  cursor: pointer;
  background-position: 0 0;
  background: url("https://s2.music.126.net/style/web2/img/coverall.png?f3140a480b5eaf3860e3f4b3d2515d75");
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Content({ playlists, total, category }: Props) {
  const navigator = useNavigate();
  const params = useParams();
  const onChange = useCallback(
    (page: number) => {
      navigator(
        `/discover/playlist/${JSON.stringify({
          category: category,
          page: page,
        })}`,
        { replace: true }
      );
      window.scrollTo({ top: 0 });
      window.location.reload();
    },
    [category, navigator]
  );
  return (
    <>
      {playlists.length !== 0 ? (
        <Grid templateColumns={"repeat(5, 1fr)"} gap={6}>
          {playlists.map((item: any, index: number) => {
            return (
              <GridItem key={index}>
                <Container>
                  <CoverImage src={item.coverImgUrl} />
                  <Mask
                    onClick={() => {
                      navigator(`/playlist/${item.id}`);
                    }}
                  />
                  <PlaylistBottom style={{ bottom: "8px" }} />
                  <BottomIcon style={{ bottom: "6px", left: "10px" }} />
                  <PlayCount style={{ bottom: "12px", left: "38px" }}>
                    {item.playCount}
                  </PlayCount>
                  <BottomIconPlay style={{ bottom: "12px", right: "20px" }} />
                </Container>
                <Flex>
                  <Typography style={{ width: "140px", cursor: "pointer" }}>
                    <Typography.Paragraph ellipsis={{ rows: 2 }}>
                      {item.name}
                    </Typography.Paragraph>
                  </Typography>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      ) : (
        <LoadingArea height="80vh" />
      )}
      <Flex style={{ marginTop: "24px" }}>
        <Pagination
          pageSize={35}
          total={total}
          showSizeChanger={false}
          current={JSON.parse(params.playlistParams || "{}")?.page || 1}
          onChange={onChange}
          showQuickJumper={true}
          showPrevNextJumpers={true}
        />
      </Flex>
    </>
  );
}
