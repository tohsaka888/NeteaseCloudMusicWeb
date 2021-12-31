import { LikeOutlined } from "@ant-design/icons";
import { Textarea } from "@chakra-ui/react";
import { Button, Comment, Divider, List } from "antd";
import React, { useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { LoginContext } from "../../context/Context";
import useHttpRequest from "../../hooks/useHttpRequest";
import ListHeader from "./ListHeader";

type Props = {
  item: any;
  index: number;
};

const Container = styled.div`
  margin: 0px 24px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`;

const Reply = styled.div`
  color: #0c73c2;
  border-right: 1px solid #cecece;
  padding-right: 8px;
  margin-right: 8px;
`;

const LikedCount = styled.div`
  color: #666666;
  margin-left: 4px;
`;

const Title = styled.div`
  padding: 8px 0px;
  font-size: 20px;
  border-bottom: 1px solid #cecece;
  margin-bottom: 16px;
  font-weight: bold;
  margin-top: 24px;
`;

const UserName = styled.div`
  font-size: 14px;
  color: #000;
  text-shadow: 1px 1px 1px #cecece;
  font-weight: bold;
`;

const Action = ({ item }: { item: any }) => {
  return (
    <Flex>
      <Reply>回复</Reply>
      <LikeOutlined style={{ color: "#0c73c2" }} />
      <LikedCount>{item.likedCount || 0}</LikedCount>
    </Flex>
  );
};

const MusicComment = ({ item, index }: Props) => {
  return (
    <>
      <Comment
        content={item.content}
        avatar={item.user.avatarUrl}
        author={<UserName>{item.user.nickname}</UserName>}
        datetime={item.timeStr}
        actions={[<Action item={item} />]}
      />
      {item.beReplied.length !== 0 &&
        item.beReplied.map((replyItem: any, index: number) => {
          return (
            <Comment
              key={index}
              style={{
                background: "#f4f4f4",
                border: "1px solid #dedede",
                paddingLeft: "40px",
                marginBottom: "16px",
              }}
              content={replyItem.content}
              avatar={replyItem.user.avatarUrl}
              author={replyItem.user.nickname}
              datetime={replyItem.timeStr}
              actions={[<Action item={replyItem} />]}
            />
          );
        })}
      <Divider style={{ margin: "8px" }} />
    </>
  );
};

export default function CommentList() {
  const params = useParams();
  const location = useLocation();
  const { loginStatus } = useContext(LoginContext);
  const data = useHttpRequest({
    api:
      location.pathname.includes("playlist") || location.pathname.includes("my")
        ? "/comment/playlist"
        : "/comment/music",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  return (
    <Container>
      <Title>评论区</Title>
      <Comment
        content={<Textarea rows={4} />}
        avatar={(loginStatus.profile && loginStatus.profile.avatarUrl) || ""}
        author={
          <UserName>
            {(loginStatus.profile && loginStatus.profile.nickname) ||
              "游客账户"}
          </UserName>
        }
        actions={[<Button type="primary">发送评论</Button>]}
      />
      <List
        style={{ marginTop: "24px" }}
        header={
          <ListHeader
            total={data.hotComments && data.hotComments.length}
            type="hot"
          />
        }
        dataSource={data.hotComments}
        pagination={{ pageSize: 5, size: "small" }}
        renderItem={(item, index) => <MusicComment item={item} index={index} />}
      />

      <List
        style={{ marginTop: "24px" }}
        header={<ListHeader total={data.comments && data.comments.length} />}
        dataSource={data.comments}
        pagination={{ pageSize: 10, size: "small" }}
        renderItem={(item, index) => <MusicComment item={item} index={index} />}
      />
    </Container>
  );
}
