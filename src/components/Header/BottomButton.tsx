import React from "react";
import styled from "styled-components";

const Buttom = styled.div`
  display: block;
  position: absolute;
  left: 50%;
  top: 48px;
  width: 0;
  height: 0;
  margin-left: -6px;
  overflow: hidden;
  z-index: 1000;
  border: 8px solid;
  border-color: transparent transparent #c20c0c;
`;

export default function BottomButton() {
  return <Buttom />;
}
