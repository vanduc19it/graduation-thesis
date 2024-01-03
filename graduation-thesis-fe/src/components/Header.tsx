"use client";
import React from "react";
import Navbar from "./Navbar";
import Slider1 from "./Slider";
import styles from "../styles/header.module.scss";
const Header = () => {

  return (
    <div
      className={styles.header}
    >
      <Navbar />
      <Slider1 />
    </div>
  );
};

export default Header;
