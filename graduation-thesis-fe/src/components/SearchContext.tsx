"use client";
import React, { createContext, useState} from "react";

export const SearchContext = createContext<SearchContextProps>({
  searchQuery: "",
  handleSearch: () => {},
  handleConnect1: () => {},
  isLoggedIn: false,
  cartCheck: false,
  addToCart:() => {},
  user: null,
  setUser: () => {},
});

interface SearchContextProps {
  isLoggedIn: boolean;
  searchQuery: string;
  cartCheck: boolean;
  handleSearch: (query: string) => void;
  handleConnect1: (query1: boolean) => void;
  addToCart: (query2: boolean) => void;
  user: any,
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCheck, setCartCheck] = useState(false);
  const [user, setUser] = useState(null);

  const addToCart = (cart: boolean) => {
    setCartCheck(cart);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleConnect1 = (query1: boolean) => {
    setIsLoggedIn(query1);
  };

  return (
    <SearchContext.Provider
      value={{ isLoggedIn, handleConnect1, searchQuery, handleSearch,cartCheck, addToCart, user, setUser }}
    >
      {children}
    </SearchContext.Provider>
  );
};
