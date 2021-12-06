import { Button } from "antd";
import React from "react";
import "../../styles/Header.css";

export default function Login() {
  return (
    <>
      <Button type="primary" shape="round" className="login">
        登录
      </Button>
    </>
  );
}
