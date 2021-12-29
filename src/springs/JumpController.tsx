import React, { ReactNode } from "react";
import { useSpring, animated, config } from "react-spring";

type Props = {
  children: ReactNode;
  isShow?: boolean;
};

export default function JumpController({ children, isShow = false }: Props) {
  const props = useSpring({
    from: {
      height: isShow ? "10px" : "60px",
      overflow: "hidden",
    },
    to: {
      height: isShow ? "60px" : "10px",
    },
    config: config.wobbly,
  });
  return <animated.div style={props}>{children}</animated.div>;
}
