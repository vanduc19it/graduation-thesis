"use client";
import React, { createContext, useState, useEffect } from "react";

export const SearchContext = createContext<SearchContextProps>({
  searchQuery: "",
  handleSearch: () => {},
  handleConnect1: () => {},
  isLoggedIn: false,
});

interface SearchContextProps {
  isLoggedIn: boolean;
  searchQuery: string;
  handleSearch: (query: string) => void;
  handleConnect1: (query1: boolean) => void;
}

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleConnect1 = (query1: boolean) => {
    setIsLoggedIn(query1);
  };

  return (
    <SearchContext.Provider
      value={{ isLoggedIn, handleConnect1, searchQuery, handleSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};
