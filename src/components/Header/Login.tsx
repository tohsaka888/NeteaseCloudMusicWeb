import { Button, Modal } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Draggable, {
  DraggableBounds,
  DraggableEventHandler,
} from "react-draggable";
import styled from "styled-components";
import { createQRCode, createQRKey } from "../../request/Header/Login";
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
  width: 125px;
  height: 220px;
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
  width: 10vw;
  height: 220px;
  text-align: center;
`;

const QRCodeTitle = styled.div`
  font-size: 1.5rem;
`;

export default function Login() {
  const [visible, setVisible] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
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
    createQRKey();
  }, [])
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
        bodyStyle={{
          minHeight: "332px",
          width: "40vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "38px 0 20px",
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
        <LoginImage />
        <QRCodeArea>
          <QRCodeTitle>扫码登录</QRCodeTitle>
        </QRCodeArea>
      </Modal>
    </>
  );
}
