import { Avatar, Col, Row } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useHttpRequest from "../../hooks/useHttpRequest";
import LoadingArea from "../Common/LoadingArea";

export const Header = styled.div`
  padding: 5px 0px;
  border-bottom: 1px solid #cecece;
`;

export default function Subscribers() {
  const params = useParams();
  const data = useHttpRequest({
    api: "/playlist/subscribers",
    method: "GET",
    credentials: "include",
    requestData: JSON.stringify({ id: params.id }),
  });
  return (
    <>
      <Header>喜欢这个歌单的人</Header>
      <Row>
        {data.subscribers ? (
          data.subscribers.map((item: any, index: number) => {
            return (
              <Col
                span={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <Avatar src={item.avatarUrl} size={"large"} />
              </Col>
            );
          })
        ) : (
          <LoadingArea height="20vh" />
        )}
      </Row>
    </>
  );
}
