import { Button, message, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Draggable, {
  DraggableBounds,
  DraggableEventHandler,
} from "react-draggable";
import styled from "styled-components";
import {
  checkQRStatus,
  createQRCode,
  createQRKey,
} from "../../request/Header/Login";
import "../../styles/Header.css";

const Title = styled.div`
  text-align: left;
  &:hover {
    cursor: move;
  }
`;
const LoginImage = styled.div`
  background-image: url("https://s2.music.126.net/style/web2/img/qr_guide.png?7ef838ff1a2a41bd5f79df00dcfe5a04");
  float: left;
  width: 150px;
  height: 265px;
  background-size: contain;
`;

const Container = styled.div`
  height: max-content;
  margin: 0 auto;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QRCodeArea = styled.div`
  margin-left: 25px;
  width: 12vw;
  height: 220px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QRCodeTitle = styled.div`
  font-size: 1.3rem;
  text-align: center;
`;

const QrCode = styled.img`
  width: 160px;
  height: 160px;
`;

const QrInfo = styled.div`
  margin-top: 8px;
  font-size: 13px;
`;

const QrLink = styled.span`
  color: #0c73c2;
  cursor: pointer;
`;

const AnotherLogin = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  text-align: center;
  width: 17vh;
  margin-left: auto;
  margin-right: auto;
  padding: 3px 5px;
  border-radius: 15px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 16px;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const [visible, setVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  // const [qrStatus, setQrStatus] = useState<any>();
  // const qrStatusRef = useRef<any>();
  // const [id, setId] = useState<any>();
  const [bounds, setBounds] = useState<DraggableBounds>({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef<HTMLDivElement>();
  const onStart: DraggableEventHandler = (event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };
  const okEvent = () => {
    setVisible(false);
  };
  const cancelEvent = () => {
    setVisible(false);
  };
  useEffect(() => {
    let id: NodeJS.Timeout;
    const callback = async (key: string) => {
      const data = await checkQRStatus(key);
      if (data.code === 800 || data.code === 803) {
        clearInterval(id);
        if (data.code === 803) {
          message.success("登录成功");
        }
        setVisible(false);
      }
    };
    const sendRequest = async () => {
      const key: string = await createQRKey();
      if (key && visible) {
        const data = await createQRCode(key);
        setQrUrl(data);
        id = setInterval(() => {
          callback(key);
        }, 3000);
      }
    };
    if (visible) {
      sendRequest();
    }
  }, [visible]);
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type="primary"
        shape="round"
        className="login"
      >
        登录
      </Button>
      <Modal
        visible={visible}
        onOk={okEvent}
        onCancel={cancelEvent}
        footer={null}
        bodyStyle={{
          minHeight: "332px",
          width: "40vw",
        }}
        title={
          <Title
            onMouseOver={() => {
              setDisabled(false);
            }}
            onMouseLeave={() => {
              setDisabled(true);
            }}
          >
            登录
          </Title>
        }
        modalRender={(modal) => (
          <Draggable disabled={disabled} bounds={bounds} onStart={onStart}>
            <Container
              ref={(refs) => {
                if (refs) {
                  draggleRef.current = refs;
                }
              }}
            >
              {modal}
            </Container>
          </Draggable>
        )}
      >
        <LoginContainer>
          <LoginImage />
          <QRCodeArea>
            <QRCodeTitle>扫码登录</QRCodeTitle>
            <QrCode src={qrUrl} alt="qrUrl" />
            <QrInfo>
              使用 <QrLink>网易云音乐APP</QrLink> 扫码登录
            </QrInfo>
          </QRCodeArea>
        </LoginContainer>
        <AnotherLogin>选择其他方式登录</AnotherLogin>
      </Modal>
    </>
  );
}
