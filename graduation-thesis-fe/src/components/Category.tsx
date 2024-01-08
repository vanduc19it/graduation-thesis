"use client";
import { Card, Image, Text } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/category.module.scss";
const Category = () => {
  return (
    <>
      <div className={styles.heading}>Explore Categories 🚀</div>
      <div className={styles.container}>
        <Card
          className={styles.card}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Image src="/image/11.png" alt="" loading="lazy" />
          <div className={styles.category_img}>
            {" "}
            <Image src="/image/1.svg" alt="" loading="lazy" />
          </div>
          <div className={styles.card_body}>
            <Text
              style={{ fontWeight: "600", color: "#484848", fontSize: "18px" }}
            >
              Art
            </Text>
          </div>
        </Card>
        <Card
          className={styles.card}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Image src="/image/22.png" alt="" loading="lazy" />
          <div className={styles.category_img}>
            {" "}
            <Image src="/image/2.svg" alt="" loading="lazy" />
          </div>
          <div className={styles.card_body}>
            <Text
              style={{ fontWeight: "600", color: "#484848", fontSize: "18px" }}
            >
              Collectibles
            </Text>
          </div>
        </Card>
        <Card
          className={styles.card}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Image src="/image/33.png" alt="" loading="lazy" />
          <div className={styles.category_img}>
            {" "}
            <Image src="/image/3.svg" alt="" loading="lazy" />
          </div>
          <div className={styles.card_body}>
            <Text
              style={{ fontWeight: "600", color: "#484848", fontSize: "18px" }}
            >
              Music
            </Text>
          </div>
        </Card>
        <Card
          className={styles.card}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Image src="/image/44.png" alt="" loading="lazy" />
          <div className={styles.category_img}>
            {" "}
            <Image src="/image/4.svg" alt="" loading="lazy" />
          </div>
          <div className={styles.card_body}>
            <Text
              style={{ fontWeight: "600", color: "#484848", fontSize: "18px" }}
            >
              Photography
            </Text>
          </div>
        </Card>
        <Card
          className={styles.card}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Image src="/image/55.png" alt="" loading="lazy" />
          <div className={styles.category_img}>
            {" "}
            <Image src="/image/5.svg" alt="" loading="lazy" />
          </div>

          <div className={styles.card_body}>
            <Text
              style={{ fontWeight: "600", color: "#484848", fontSize: "18px" }}
            >
              Video
            </Text>
          </div>
        </Card>

        <Card
          className={styles.card}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Image src="/image/66.png" alt="" loading="lazy" />
          <div className={styles.category_img}>
            {" "}
            <Image src="/image/6.svg" alt="" loading="lazy" />
          </div>

          <div className={styles.card_body}>
            <Text
              style={{ fontWeight: "600", color: "#484848", fontSize: "18px" }}
            >
              Utility
            </Text>
          </div>
        </Card>
        <Card
          className={styles.card}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Image src="/image/77.png" alt="" loading="lazy" />
          <div className={styles.category_img}>
            {" "}
            <Image src="/image/7.svg" alt="" loading="lazy" />
          </div>
          <div className={styles.card_body}>
            <Text
              style={{ fontWeight: "600", color: "#484848", fontSize: "18px" }}
            >
              Sport
            </Text>
          </div>
        </Card>
        <Card
          className={styles.card}
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
          }}
        >
          <Image src="/image/88.png" alt="" loading="lazy" />
          <div className={styles.category_img}>
            {" "}
            <Image src="/image/8.svg" alt="" loading="lazy" />
          </div>

          <div className={styles.card_body}>
            <Text
              style={{ fontWeight: "600", color: "#484848", fontSize: "18px" }}
            >
              Virtual Worlds
            </Text>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Category;
