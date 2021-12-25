import { Layout } from "antd";
import React from "react";
import Content from "../components/My/Content";
import Sider from "../components/My/Sider";
import "../styles/MyMusic.css"

export default function MyMusic() {
  return (
    <Layout className="container">
      <Sider />
      <Content />
    </Layout>
  );
}
