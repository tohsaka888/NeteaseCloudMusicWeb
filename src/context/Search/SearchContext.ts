import React, { createContext } from "react";

type SearchProps = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchProps | null>(null)

export {SearchContext}