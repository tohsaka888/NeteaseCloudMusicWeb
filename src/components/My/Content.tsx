import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <Layout.Content
      style={{
        height: "87vh",
        marginLeft: "13vw",
        position: "fixed",
        width: "50vw",
        borderLeft: "1px solid #f9f9f9",
        background: "white",
        borderRight: "2px solid #e2e2e2",
      }}
    >
      <Outlet />
    </Layout.Content>
  );
}
