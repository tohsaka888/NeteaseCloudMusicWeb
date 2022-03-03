import { Input } from "antd";
import React, { useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "../../styles/Header.css";
import SearchModal from "../SearchModal";
import { SearchContext } from "../../context/Search/SearchContext";

export default function Search() {
  const searchProps = useContext(SearchContext);
  return (
    <SearchModal>
      <Input
        className="search"
        placeholder="音乐/电台/用户"
        onChange={(e) => {
          searchProps?.setSearchValue(e.target.value)
        }}
        prefix={<SearchOutlined />}
      />
    </SearchModal>
  );
}
