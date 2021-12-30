import { LikeOutlined } from "@ant-design/icons";
import { Comment, Divider, List } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
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

const Action = ({ item }: { item: any }) => {
  return (
    <Flex>
      <Reply>回复</Reply>
      <LikeOutlined style={{ color: "#0c73c2" }} />
      <LikedCount>{item.likedCount}</LikedCount>
    </Flex>
  );
};

const MusicComment = ({ item, index }: Props) => {
  return (
    <>
      <Comment
        content={item.content}
        avatar={item.user.avatarUrl}
        author={item.user.nickname}
        datetime={item.timeStr}
        actions={[<Action item={item} />]}
      />
      {item.beReplied.length !== 0 &&
        item.beReplied.map((replyItem: any, index: number) => {
          return (
            <Comment
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
  const data = useHttpRequest({
    api: "/comment/music",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  return (
    <Container>
      <List
        style={{ marginTop: "24px" }}
        header={
          <ListHeader
            total={data.hotComments && data.hotComments.length}
            type="hot"
          />
        }
        dataSource={data.hotComments}
        pagination={{ pageSize: 5 }}
        renderItem={(item, index) => <MusicComment item={item} index={index} />}
      />

      <List
        style={{ marginTop: "24px" }}
        header={<ListHeader total={data.comments && data.comments.length} />}
        dataSource={data.comments}
        pagination={{ pageSize: 10 }}
        renderItem={(item, index) => <MusicComment item={item} index={index} />}
      />
    </Container>
  );
}
