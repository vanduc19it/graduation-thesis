"use client";
import Marketplace from "@/components/Marketplace";
import Auction from "@/components/Auction";
import TopCreator from "@/components/TopCreator";
import TrendingCollection from "@/components/TrendingCollection";
import Category from "@/components/Category";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "react-chatbot-kit";
import config from '../app/chatbot/config.js';
import MessageParser from '../app/chatbot/MessageParser.jsx';
import ActionProvider from '../app/chatbot/ActionProvider.jsx';
import 'react-chatbot-kit/build/main.css'
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import { useState } from "react";
import styles from "../styles/app.module.scss"
export default function Home() {

  const [showBot, toggleBot] = useState(false);

  return (
    <main  style={{position:"relative"}}>
      <Header />
      {/* <TrendingCollection /> */}
      <Auction />
      <Marketplace />
      <TopCreator />
      <Category />
      <Footer />
      <div className={styles["custom-chatbot-container"]}>
      {showBot && (
        <Fade big>
          <div className={styles["app-chatbot-container"]}>
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
            />
          </div>
        </Fade>
      )}
       <Flip left cascade >
        <button
          className={styles["app-chatbot-button"]}
          onClick={() => toggleBot((prev) => !prev)}
        >
          <div>Bot</div>
          <svg viewBox="0 0 640 512" className={styles["app-chatbot-button-icon"]}>
            <path d="M192,408h64V360H192ZM576,192H544a95.99975,95.99975,0,0,0-96-96H344V24a24,24,0,0,0-48,0V96H192a95.99975,95.99975,0,0,0-96,96H64a47.99987,47.99987,0,0,0-48,48V368a47.99987,47.99987,0,0,0,48,48H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a47.99987,47.99987,0,0,0,48-48V240A47.99987,47.99987,0,0,0,576,192ZM96,368H64V240H96Zm400,48a48.14061,48.14061,0,0,1-48,48H192a48.14061,48.14061,0,0,1-48-48V192a47.99987,47.99987,0,0,1,48-48H448a47.99987,47.99987,0,0,1,48,48Zm80-48H544V240h32ZM240,208a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,240,208Zm160,0a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,400,208ZM384,408h64V360H384Zm-96,0h64V360H288Z"></path>
          </svg>
        </button>
      </Flip>
      </div>
      
    </main>
  );
}
