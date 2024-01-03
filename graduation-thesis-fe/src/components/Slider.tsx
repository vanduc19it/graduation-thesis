"use client";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/slider.module.scss";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Slider1 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      {/* <div style={{ width: "50vw" }}>
        <Text className={styles.heading}>
          Discover the unique digital art of NFT
        </Text>
        <Text>
          Digital marketplace for crypto collectibles and non-fungible tokens.
        </Text>
        <Text>Buy, sell, and discover exclusive digital assets.</Text>
        <div>
          <Button
            className={styles.btn}
            style={{ background: "white", width: "150px" }}
          >
            Explore
          </Button>
          <Link href="/createNewNFT">
            <Button
              className={styles.btn}
              style={{ background: "#3a9bfc", width: "150px", color: "white" }}
            >
              Create
            </Button>
          </Link>
        </div>
      </div> */}
      <div className={styles["btn_group"]}>
        <div>
          <Button
            className={`${styles.btn} ${styles.btn1}`} 
          >
            All
          </Button>
          <Button
            className={styles.btn}
          >
            Art
          </Button>
          <Button
            className={styles.btn}
          >
            Gaming
          </Button>
          <Button
            className={styles.btn}
          >
            Memberships
          </Button>
          <Button
            className={styles.btn}
          >
            PFPs
          </Button>
          <Button
            className={styles.btn}
          >
            Photography
          </Button>
          <Button
            className={styles.btn}
          >
            Music
          </Button>
        </div>
      </div>
      <div style={{ width: "100%", paddingBottom:"20px" }}>
        <Slider {...settings}>
          <div>
            <Card
              className={styles.card}
              style={{ borderRadius: "20px", width: "320px", padding: "0" }}
            >
              <Image
                src="/image/slider2.avif"
                alt=""
                style={{ borderRadius: "20px", width: "320px" }}
              />
              <div className={styles.text}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  The Sad Cats
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Floor: 0.04 ETH
                </Text>
              </div>
            </Card>
          </div>
          <div>
            <Card
              className={styles.card}
              style={{ borderRadius: "20px", width: "320px", padding: "0" }}
            >
              <Image
                src="/image/slider8.avif"
                alt=""
                style={{ borderRadius: "20px", width: "320px" }}
              />
              <div className={styles.text}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                 Satoshibles: Beary Christmas 
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Floor: 0.08 ETH
                </Text>
              </div>
            </Card>
          </div>

          <div>
            <Card
              className={styles.card}
              style={{ borderRadius: "20px", width: "320px",   padding: "0" }}
            >
              <Image
                src="/image/slider4.webp"
                alt=""
                style={{ borderRadius: "20px", width: "320px" }}
              />
              <div className={styles.text}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  The HUGG Pass
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                   Floor: 0.2 ETH
                </Text>
              </div>
            </Card>
          </div>

          <div>
            <Card
              className={styles.card}
              style={{ borderRadius: "20px", width: "320px", padding: "0" }}
            >
              <Image
                src="/image/slider7.avif"
                alt=""
                style={{ borderRadius: "20px", width: "320px", height:"320px", objectFit:"cover" }}
                className={styles.image}
              />
              <div className={styles.text}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  Boki Special Events
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Floor: 0.09 ETH
                </Text>
              </div>
            </Card>
          </div>
          <div>
            <Card
              className={styles.card}
              style={{ borderRadius: "20px", width: "320px", padding: "0" }}
            >
              <Image
                src="/image/slider10.avif"
                alt=""
                style={{ borderRadius: "20px", width: "320px" }}
              />
              <div className={styles.text}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  Lil Pudgys
                </Text>
                <Text
                  style={{
                    fontWeight: "600",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  Floor: 0.93 ETH
                </Text>
              </div>
            </Card>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Slider1;
