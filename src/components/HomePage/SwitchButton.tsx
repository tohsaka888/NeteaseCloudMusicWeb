import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import styled from "styled-components";
import { BannerContext } from "../../context/HomePage/Context";

type Props = {
  direction: string;
};

const Container = styled.div<Props>`
  position: absolute;
  z-index: 1000;
  height: 273px;
  display: flex;
  align-items: center;
  left: ${({ direction }) => (direction === "left" ? "12vw" : "85vw")};
  font-weight: 100;
`;

export default function SwitchButton({ direction }: Props) {
  const props = useContext(BannerContext);
  return (
    <Container direction={direction}>
      {direction === "left" && (
        <LeftOutlined
          onClick={() => {
            props?.bannerRef.current?.prev();
          }}
          style={{
            color: "white",
            fontSize: "3rem",
            fontWeight: 100,
            cursor: "pointer",
          }}
        />
      )}
      {direction === "right" && (
        <RightOutlined
          onClick={() => {
            props?.bannerRef.current?.next();
          }}
          style={{
            color: "white",
            fontSize: "3rem",
            fontWeight: 100,
            cursor: "pointer",
          }}
        />
      )}
    </Container>
  );
}
