import styled from "styled-components";
import { Button, Divider, Form, Input } from "antd";
import React, { useContext } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { getLoginStatus, mobileLogin } from "../../request/Header/Login";
import { VisibleContext } from "../../context/Context";
import useLoginStatus from "../../hooks/useLoginStatus";

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  font-size: 12px;
  color: #666666;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function MobileLogin({
  setLoginMethod,
}: {
  setLoginMethod: Function;
}) {
  const props = useContext(VisibleContext);
  const isLogin = useLoginStatus();
  const login = async (values: any) => {
    await mobileLogin(values.phone, values.password);
    await getLoginStatus();
    await isLogin();
    props?.setVisible(false);
  };
  return (
    <>
      <Form
        onFinish={login}
        style={{ width: "60%", marginLeft: "20%", verticalAlign: "middle" }}
      >
        <Form.Item wrapperCol={{ span: 24 }} name={"phone"}>
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} name={"password"}>
          <Input type={"password"} placeholder="请输入密码" />
        </Form.Item>
        <TextContainer>
          <Text style={{ fontWeight: "bold" }}>短信登录</Text>
          <Text>
            {/* <Checkbox style={{ marginRight: "5px" }} /> */}
            自动登录
          </Text>
        </TextContainer>
        <Form.Item>
          <Button
            type="primary"
            style={{ width: "100%", marginTop: "16px" }}
            htmlType="submit"
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <Divider style={{ marginTop: "60px" }} />
      <Footer>
        <Footer
          onClick={() => {
            setLoginMethod(0);
          }}
        >
          <LeftOutlined
            style={{ marginRight: "8px", color: "#0c72c3" }}
            color="#0c72c3"
          />
          <Text style={{ color: "#0c72c3" }}>其他方式登录</Text>
        </Footer>
        <Footer>
          <Text>没有账号?立即注册</Text>
          <RightOutlined style={{ marginLeft: "8px" }} />
        </Footer>
      </Footer>
    </>
  );
}
