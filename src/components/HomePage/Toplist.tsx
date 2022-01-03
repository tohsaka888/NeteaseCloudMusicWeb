import { StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import useHttpRequest from "../../hooks/useHttpRequest";
import "../../styles/HomePage.css";
import ToplistDetail from "./ToplistDetail";

const Container = styled.div`
  background: #f5f5f5;
  margin-top: 16px;
  border: 1px solid #d3d3d3;
  border-right: none;
  border-bottom: none;
  display: flex;
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
  const soaringList = useHttpRequest({
    api: "/playlist/detail",
    credentials: "include",
    method: "GET",
    requestData: JSON.stringify({ id: 19723756 }),
  });
  const newList = useHttpRequest({
    api: "/playlist/detail",
    credentials: "include",
    method: "GET",
    requestData: JSON.stringify({ id: 3779629 }),
  });
  const originalList = useHttpRequest({
    api: "/playlist/detail",
    credentials: "include",
    method: "GET",
    requestData: JSON.stringify({ id: 2884035 }),
  });
  return (
    <>
      <Title>
        <Front>
          <StarFilled style={{ color: "#c10d0c", marginRight: "6px" }} />
          <div>榜单</div>
        </Front>
      </Title>
      <Container>
        <ToplistDetail list={soaringList.playlist || []} />
        <ToplistDetail list={newList.playlist || []} />
        <ToplistDetail list={originalList.playlist || []} />
      </Container>
    </>
  );
}
