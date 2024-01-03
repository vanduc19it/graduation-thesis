"use client";
import { Avatar, Button } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/footer.module.scss";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_contact}>
        <div className={styles.ul}>
          <h3>Marketplace</h3>
          <ul>
            <li>Explore</li>
            <li>Blog</li>
            <li>How it works</li>
            <li>Jobs</li>
            <li>Help center</li>
          </ul>
        </div>
        <div className={styles.ul}>
          <h3>My Account</h3>
          <ul>
            <li>Profile</li>
            <li>Favorites</li>
            <li>Watchlist</li>
            <li>My Collections</li>
          </ul>
        </div>
        <div className={styles.ul}>
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Careers</li>
            <li>Ventures</li>
            <li>Grants</li>
          </ul>
        </div>
        <div className={styles.ul}>
          <h3>Stay in the loop</h3>
          <div className={styles.btn_contact}>
            <input placeholder="Email address" className={styles.input_email} />
            <Button className={styles.btn_email}>Subscribe</Button>
          </div>

          <div className={styles.contact}>
            <div className={styles.email}>
              <p>Email us</p>
              <h4>duc19it@gmail.com</h4>
            </div>
            <div className={styles.email}>
              <p>Call us</p>
              <h4>+84 354941620</h4>
            </div>
          </div>
          <p className={styles.copyright}>
            Copyright © 2022 by VANDUC19IT all rights reserved.
          </p>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.end}>
        <div className={styles.end_detail}>
          <p>Privacy</p>
          <p>Security</p>
          <p>Terms & Condition</p>
        </div>
        <div className={styles.social}>
          <Avatar className={styles.avatar} src="/facebook.png" size="sm" />
          <Avatar className={styles.avatar} src="/instagram.png" size="sm" />
          <Avatar className={styles.avatar} src="/linkedin.png" size="sm" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
