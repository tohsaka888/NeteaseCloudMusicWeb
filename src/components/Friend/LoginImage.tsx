import React from "react";
import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
  background-color: white;
  width: 64vw;
  margin: 0 auto;
  border-left: 1px solid #cecece;
  border-right: 1px solid #cecece;
  min-width: 950px;
`;

const Image = styled.div`
  background: url("https://s2.music.126.net/style/web2/img/notlogin.jpg?c92f887d6f11a9988cf637682415413b");
  width: 902px;
  height: 414px;
  margin: 0 auto 0;
  padding-top: 70px;
  /* background-position: 0 70px; */
`;

export default function LoginImage() {
  return (
    <Flex>
      <Image />
    </Flex>
  );
}
