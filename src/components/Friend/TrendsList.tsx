import { Box, Flex, Avatar, Text, Image } from "@chakra-ui/react";
import { List, message, Skeleton, Typography, Divider } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { BaseUrl, httpHeader } from "../../request/BaseUrl";
import ImageViewer from "react-simple-image-viewer";
import ShowImage from "./ShowImage";
import { CommentOutlined, LikeOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  width: 64vw;
  margin: 0px auto;
  background: white;
  min-height: 90vh;
  min-width: 950px;
`;

const ListHeader = styled.div`
  display: flex;
  font-size: 24px;
  justify-content: space-between;
  margin-bottom: 0px;
  border-bottom: 2px solid #c20c0c;
  padding: 8px 16px;
  margin: 0px 16px;
`;

type ItemProps = {
  item: any;
  index: number;
};

const RenderItem = ({ item, index }: ItemProps) => {
  const data = JSON.parse(item.json);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const showPicture = useCallback((pics: any[], i: number) => {
    let src: string[] = [];
    pics.forEach((item) => {
      src.push(item.originUrl);
    });
    setImgSrc(src);
    setImgIndex(i);
    setIsOpen(true);
  }, []);
  return (
    <React.Fragment key={index}>
      <Box margin={["8px", "24px"]} width={"100%"}>
        <Flex width={"100%"}>
          <Avatar src={item.user.avatarUrl} marginRight={"8px"} />
          <Box>
            <Typography
              style={{
                fontSize: "15px",
                lineHeight: "1",
                marginTop: "5px",
                width: "100%",
              }}
            >
              <Typography.Paragraph style={{ color: "#0c73c2" }}>
                {item.user.nickname}
              </Typography.Paragraph>
              <Typography.Paragraph style={{ fontSize: "12px" }}>
                {moment(item.showTime).format("YYYY-MM-DD hh:mm")}
              </Typography.Paragraph>
            </Typography>
            {item.actName && (
              <Text _hover={{ textDecoration: "underline" }} color="#0c73c2">
                #{item.actName}#
              </Text>
            )}
            <Text width={"850px"} whiteSpace={"pre-line"}>
              {data.msg}
            </Text>
            {data.song && (
              <Box
                padding={"8px"}
                background={"#f5f5f5"}
                marginTop={"16px"}
                width={"850px"}
              >
                <Flex align={"center"}>
                  <Image
                    src={data.song.album.picUrl}
                    width={"55px"}
                    height={"55px"}
                  />
                  <Box marginLeft={"16px"}>
                    <Text fontSize={"16px"} fontWeight={"bold"}>
                      {data.song.name}
                    </Text>
                    <Text fontSize={"12px"} marginTop={"8px"}>
                      {data.song.artists.map((item: any) => item.name)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            )}
            <Box marginTop={"8px"}>
              {item.pics.length !== 0 && item.pics.length > 2 ? (
                <>
                  <Flex>
                    {item.pics
                      .slice(0, item.pics.length / 2)
                      .map((value: any, i: number) => {
                        return (
                          <ShowImage
                            i={i}
                            key={i}
                            item={item}
                            value={value}
                            onClick={() => {
                              showPicture(item.pics, i);
                            }}
                          />
                        );
                      })}
                  </Flex>
                  <Flex>
                    {item.pics
                      .slice(item.pics.length / 2, item.pics.length)
                      .map((value: any, i: number) => {
                        return (
                          <ShowImage
                            i={i}
                            key={i}
                            item={item}
                            value={value}
                            onClick={() => {
                              showPicture(item.pics, i);
                            }}
                          />
                        );
                      })}
                  </Flex>
                </>
              ) : (
                <Flex>
                  {item.pics.map((value: any, i: number) => (
                    <ShowImage
                      i={i}
                      key={i}
                      value={value}
                      item={item}
                      onClick={() => {
                        showPicture(item.pics, i);
                      }}
                    />
                  ))}
                </Flex>
              )}
              {isOpen && (
                <ImageViewer
                  src={imgSrc}
                  backgroundStyle={{ background: "#2222223b" }}
                  currentIndex={imgIndex}
                  onClose={() => {
                    setIsOpen(false);
                  }}
                />
              )}
            </Box>
            <Box marginTop={"8px"}>
              <Flex align={"center"} justify={"flex-end"}>
                <LikeOutlined
                  style={{ fontSize: "16px", color: "rgb(12, 115, 194)" }}
                />
                <Text
                  margin={[0, "8px"]}
                  fontSize={"16px"}
                  borderRight={"1px solid #cecece"}
                  paddingRight={"8px"}
                >
                  {item.info.likedCount}
                </Text>
                <CommentOutlined
                  style={{ fontSize: "16px", color: "rgb(12, 115, 194)" }}
                />
                <Text fontSize={"16px"} margin={[0, "8px"]}>
                  {"评论"}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Divider />
    </React.Fragment>
  );
};

export default function TrendsList() {
  const lasttimeRef = useRef<number>(-1);
  const [event, setEvent] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const sendRequest = useCallback(async () => {
    try {
      const res = await fetch(
        `${BaseUrl}/event?lasttime=${lasttimeRef.current}`,
        {
          method: "GET",
          credentials: "include",
          headers: httpHeader,
        }
      );
      const data = await res.json();
      setHasMore(data.more);
      if (data.event) {
        setEvent((e) => [...e, ...data.event]);
        lasttimeRef.current = data.lasttime;
      }
    } catch (error) {
      message.error("网络错误请检查网络设置");
      console.log(error);
    }
  }, []);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  return (
    <Container id="target">
      <ListHeader>动态</ListHeader>
      <InfiniteScroll
        next={sendRequest}
        dataLength={event.length}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>到底啦,再怎么翻也没有了~ 🤐</Divider>}
        style={{ overflowX: "hidden" }}
      >
        <List
          header={null}
          dataSource={event}
          renderItem={(item, index) => <RenderItem item={item} index={index} />}
        />
      </InfiniteScroll>
    </Container>
  );
}
