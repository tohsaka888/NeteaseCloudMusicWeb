import { Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import "../../styles/Header.css";

export default function Search() {
  return (
    <Input
      className="search"
      placeholder="音乐/电台/用户"
      prefix={<SearchOutlined />}
    />
  );
}
