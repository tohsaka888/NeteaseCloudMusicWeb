import { StarFilled } from "@ant-design/icons";
import styled from "styled-components";
import "../../styles/HomePage.css";

const Container = styled.div`
  padding: 0px 18px;
  background: #f5f5f5;
  border: 1px solid #fff;
  margin-top: 16px;
  padding-bottom: 36px;
  border: 1px solid #d3d3d3;
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
