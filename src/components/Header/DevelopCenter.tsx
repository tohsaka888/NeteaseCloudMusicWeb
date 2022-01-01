import React from "react";
import styled from "styled-components";

const Button = styled.div`
  background-color: transparent;
  border-radius: 20px;
  font-size: 12px;
  border: 1px solid #4F4F4F;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cccccc;
  padding: 0 8px;
  margin-left: 20px;
  cursor: pointer;
  box-shadow: 0px 0px 1px 1px #4f4f4f;
  min-width: 100px;
`;

export default function DevelopCenter() {
  return <Button>创作者中心</Button>;
}
