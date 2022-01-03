import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <Layout.Content
      style={{
        height: "90vh",
        marginLeft: "15vw",
        position: "fixed",
        width: "67vw",
        borderLeft: "1px solid #f9f9f9",
        background: "#f9f9f9",
        borderRight: "2px solid #e2e2e2",
        overflow: "auto",
        paddingRight: "18vw",
        borderBottomWidth: "0px",
        minWidth: "950px",
      }}
    >
      <div style={{ background: "white", height: "100%" }}>
        <Outlet />
      </div>
    </Layout.Content>
  );
}
