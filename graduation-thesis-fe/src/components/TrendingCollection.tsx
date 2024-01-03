"use client";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/trendingcollection.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const TrendingCollection = () => {
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
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
    arrows: true,
  };
  return (
    <>
      <div className={styles.heading}>Trending Collection</div>
      <div className={styles.carousel}>
        <Slider {...settings}>
          <div>
            <Card
              className={styles.card}
              style={{
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                margin: "10px",
              }}
            >
              <div className={styles.card_container}>
                <Image
                  src="/image/doodle4.avif"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/doodle1.avif"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/doodle2.avif"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/doodle3.avif"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
              </div>
              <div>
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    position: "absolute",
                    marginLeft: "35%",
                    marginTop: "-25px",
                    background: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/image/col1.png"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    loading="lazy"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "30px 10px 0px 10px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Doodles
                  </Text>
                  <Button
                    style={{
                      fontSize: "14px",
                      background: "transparent",
                      border: "1px solid black",
                    }}
                  >
                    12 items
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card
              className={styles.card}
              style={{
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                margin: "10px",
              }}
            >
              <div className={styles.card_container}>
                <Image
                  src="/image/collection5.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/collection6.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/collection3.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/collection2.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
              </div>
              <div>
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    position: "absolute",
                    marginLeft: "35%",
                    marginTop: "-25px",
                    background: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/image/col2.jpg"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    loading="lazy"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "30px 10px 0px 10px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Lucky Zeros
                  </Text>
                  <Button
                    style={{
                      fontSize: "14px",
                      background: "transparent",
                      border: "1px solid black",
                    }}
                  >
                    4 items
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          <div>
            <Card
              className={styles.card}
              style={{
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                margin: "10px",
              }}
            >
              <div className={styles.card_container}>
                <Image
                  src="/image/bear1.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/bear4.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/bear3.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/bear2.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
              </div>
              <div>
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    position: "absolute",
                    marginLeft: "35%",
                    marginTop: "-25px",
                    background: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/image/bear.avif"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    loading="lazy"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "30px 10px 0px 10px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    PhantaBear
                  </Text>
                  <Button
                    style={{
                      fontSize: "14px",
                      background: "transparent",
                      border: "1px solid black",
                    }}
                  >
                    7 items
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card
              className={styles.card}
              style={{
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                margin: "10px",
              }}
            >
              <div className={styles.card_container}>
                <Image
                  src="/image/nakamigo1.avif"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/nakamigo3.avif"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/nakamigo4.avif"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/nakamigo2.avif"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
              </div>
              <div>
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    position: "absolute",
                    marginLeft: "35%",
                    marginTop: "-25px",
                    background: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/image/nakamigo.avif"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    loading="lazy"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "30px 10px 0px 10px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Nakamigos
                  </Text>
                  <Button
                    style={{
                      fontSize: "14px",
                      background: "transparent",
                      border: "1px solid black",
                    }}
                  >
                    10 items
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div>
            <Card
              className={styles.card}
              style={{
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                margin: "10px",
              }}
            >
              <div className={styles.card_container}>
                <Image
                  src="/image/fox1.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/fox2.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/fox3.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
                <Image
                  src="/image/fox4.png"
                  alt=""
                  style={{ width: "155px", height: "105px" }}
                  loading="lazy"
                />
              </div>
              <div>
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    position: "absolute",
                    marginLeft: "35%",
                    marginTop: "-25px",
                    background: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src="/image/fox.png"
                    alt=""
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                    loading="lazy"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: "30px 10px 0px 10px",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    FoxFam
                  </Text>
                  <Button
                    style={{
                      fontSize: "14px",
                      background: "transparent",
                      border: "1px solid black",
                    }}
                  >
                    18 items
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </Slider>
      </div>
    </>
  );
};

export default TrendingCollection;
