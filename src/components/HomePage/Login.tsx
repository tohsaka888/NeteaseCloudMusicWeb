import { Button } from "antd";
import React, { useContext } from "react";
import styled from "styled-components";
import { LoginContext, VisibleContext } from "../../context/Context";
// import useLoginStatus from "../../hooks/useLoginStatus";
import "../../styles/HomePage.css";

type ContainerProps = {
  code: number;
};

const Container = styled.div<ContainerProps>`
  background: #f1f1f1;
  height: ${({ code }) => (code === 200 ? "185px" : "126px")};
  padding-top: 0;
  background-position: 0 0;
  font-size: 12px;
  padding: 16px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  border: 1px solid #cecece;
`;

const TopArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  height: 91px;
`;

const Avatar = styled.img`
  width: 90px;
  height: 90px;
  border: 1px solid #dadada;
  cursor: pointer;
`;

const TextArea = styled.div`
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const Nickname = styled.div`
  font-size: 15px;
  font-weight: bold;
  margin-right: 3px;
`;

const Vip = styled.img`
  width: 43px;
  height: 16px;
`;

const Level = styled.div`
  font-size: 12px;
  border: 1px solid #999;
  display: inline-block;
  overflow: hidden;
  line-height: 18px;
  color: #999;
  font-weight: bold;
  font-style: italic;
  border-radius: 15px;
  padding: 0px 8px;
  margin-bottom: 3px;
`;

const BottomArea = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
const Item = styled.div`
  border-right: 1px solid #cecece;
  padding: 2px 16px;
  margin-top: 5px;
  font-size: 10px;
`;

const Number = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export default function Login() {
  const props = useContext(VisibleContext);
  const loginProps = useContext(LoginContext);
  // const sendRequest = useLoginStatus();
  // useEffect(() => {
  //   sendRequest();
  // }, [sendRequest]);
  return (
    <>
      {!loginProps?.loginStatus.profile && (
        <Container code={loginProps?.loginStatus.code}>
          登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
          <Button
            onClick={() => {
              props?.setVisible(true);
            }}
            className="login"
            style={{
              color: "white",
              width: "100px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "8px",
            }}
          >
            用户登录
          </Button>
        </Container>
      )}
      {loginProps?.loginStatus.profile && (
        <Container code={loginProps?.loginStatus.code}>
          <TopArea>
            <Avatar src={loginProps?.loginStatus.profile.avatarUrl} />
            <div style={{ marginLeft: "8px" }}>
              <TextArea>
                <Nickname>{loginProps?.loginStatus.profile.nickname}</Nickname>
                <Vip
                  src={
                    "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4357872257/9f40/483a/0341/78d106c94bf17f8f1e98a2f6748061c4.png"
                  }
                />
              </TextArea>
              <Level>Lv.8</Level>
              <div>
                <Button
                  type="primary"
                  className="sign"
                  style={{ width: "90px", height: "30px" }}
                >
                  签到
                </Button>
              </div>
            </div>
          </TopArea>
          <BottomArea>
            <Item>
              <Number>3</Number>动态
            </Item>
            <Item>
              <Number>15</Number>粉丝
            </Item>
            <Item>
              <Number>6</Number>关注
            </Item>
          </BottomArea>
        </Container>
      )}
    </>
  );
}
