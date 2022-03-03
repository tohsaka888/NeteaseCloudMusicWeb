import { Popover } from "antd";
import React, { ReactNode, useContext, useEffect } from "react";
import styled from "styled-components";
import { useFetch } from "usehooks-ts";
import { SearchContext } from "../../context/Search/SearchContext";
import { BaseUrl, httpHeader } from "../../request/BaseUrl";

type Props = {
  children: ReactNode;
};

const SearchTitle = styled.div`
  font-size: 12px;
  color: #666666;
`;

const SearchResult = () => {
  const searchProps = useContext(SearchContext);
  const { data, error } = useFetch<any>(`${BaseUrl}/search`, {
    method: "POST",
    headers: httpHeader,
    body: JSON.stringify({ keywords: searchProps?.searchValue }),
    credentials: "include",
  });
  return <></>;
};

function SearchModal({ children }: Props) {
  const searchProps = useContext(SearchContext);
  return (
    <Popover
      content={SearchResult}
      visible={!!searchProps?.searchValue}
      placement={"bottomLeft"}
      title={
        <SearchTitle>搜"{searchProps?.searchValue}"相关的用户</SearchTitle>
      }
    >
      {children}
    </Popover>
  );
}

export default SearchModal;
