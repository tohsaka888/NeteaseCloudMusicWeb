import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoContainer = styled.h1`
  width: 157px;
  height: 100%;
  margin-right: 20px;
  cursor: pointer;
  background-position: 0 0;
  background: url("https://s2.music.126.net/style/web2/img/frame/topbar.png?32476bd7999f0ca50f39eacc56efed81");
`;

export default function Logo() {
  const navigate = useNavigate();
  return (
    <LogoContainer
      onClick={() => {
        navigate("/");
      }}
    />
  );
}
