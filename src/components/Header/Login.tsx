import { Button, Modal } from "antd";
import React, { useRef, useState } from "react";
import Draggable, {
  DraggableBounds,
  DraggableEventHandler,
} from "react-draggable";
import styled from "styled-components";
import "../../styles/Header.css";

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
  const Title = styled.div`
    &:hover {
      cursor: move;
    }
  `;
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
            <div
              ref={(refs) => {
                if (refs) {
                  draggleRef.current = refs;
                }
              }}
            >
              {modal}
            </div>
          </Draggable>
        )}
      ></Modal>
    </>
  );
}
