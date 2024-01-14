"use client";
import { Button, Card, Image, Text } from "@chakra-ui/react";
import React from "react";
import styles from "../styles/topcreator.module.scss";
import { BsRocketTakeoff } from "react-icons/bs";
const TopCreator = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "35px",
        }}
      >
        <div className={styles.heading}>Popular Creators ⚡</div>
        <div className={styles.heading}>
          <Button
            style={{
              borderRadius: "20px",
              background: "transparent",
              border: "2px solid #ae4cff",
              color: "#ae4cff",
            }}
          >
            <BsRocketTakeoff style={{ marginRight: "4px" }} />
            View Rankings
          </Button>
        </div>
      </div>

      <div className={styles.container}>
        <Card
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/image/bgauthor1.jpg"
            alt=""
            style={{
              width: "100%",
              height: "130px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Image
            src="/image/avatar_1.jpg"
            alt=""
            style={{
              width: "60px",
              borderRadius: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.card_body}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Azul Hull
                  </Text>
                  <svg
                    style={{ marginTop: "-4px" }}
                    height={20}
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <Text
                  style={{
                    fontSize: "13px",
                    color: "#222",
                    fontWeight: "600",
                    display: "flex",
                  }}
                >
                  128.50 MATIC
                </Text>
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  background: "#ae4cff",
                  color: "white",
                  marginRight: "14px",
                }}
              >
                + Follow
              </Button>
            </div>
          </div>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/image/bgauthor2.jpg"
            alt=""
            style={{
              width: "100%",
              height: "130px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Image
            src="/image/avatar_2.jpg"
            alt=""
            style={{
              width: "60px",
              borderRadius: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.card_body}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Malakai Cey
                  </Text>
                  <svg
                    style={{ marginTop: "-4px" }}
                    height={20}
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <Text
                  style={{
                    fontSize: "13px",
                    color: "#222",
                    fontWeight: "600",
                    display: "flex",
                  }}
                >
                  120.70 MATIC
                </Text>
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  background: "#ae4cff",
                  color: "white",
                  marginRight: "14px",
                }}
              >
                + Follow
              </Button>
            </div>
          </div>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/image/bgauthor3.jpg"
            alt=""
            style={{
              width: "100%",
              height: "130px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Image
            src="/image/avatar_3.jpg"
            alt=""
            style={{
              width: "60px",
              borderRadius: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.card_body}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Karli Costa
                  </Text>
                  <svg
                    style={{ marginTop: "-4px" }}
                    height={20}
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <Text
                  style={{
                    fontSize: "13px",
                    color: "#222",
                    fontWeight: "600",
                    display: "flex",
                  }}
                >
                  116.78 MATIC
                </Text>
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  background: "#ae4cff",
                  color: "white",
                  marginRight: "14px",
                }}
              >
                + Follow
              </Button>
            </div>
          </div>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/image/bgauthor4.jpg"
            alt=""
            style={{
              width: "100%",
              height: "130px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Image
            src="/image/avatar_4.jpg"
            alt=""
            style={{
              width: "60px",
              borderRadius: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.card_body}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Anthony Wat
                  </Text>
                  <svg
                    style={{ marginTop: "-4px" }}
                    height={20}
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <Text
                  style={{
                    fontSize: "13px",
                    color: "#222",
                    fontWeight: "600",
                    display: "flex",
                  }}
                >
                  112.34 MATIC
                </Text>
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  background: "#ae4cff",
                  color: "white",
                  marginRight: "14px",
                }}
              >
                + Follow
              </Button>
            </div>
          </div>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/image/bgauthor5.jpg"
            alt=""
            style={{
              width: "100%",
              height: "130px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Image
            src="/image/avatar_5.jpg"
            alt=""
            style={{
              width: "60px",
              borderRadius: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.card_body}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Amaris Pitt
                  </Text>
                  <svg
                    style={{ marginTop: "-4px" }}
                    height={20}
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <Text
                  style={{
                    fontSize: "13px",
                    color: "#222",
                    fontWeight: "600",
                    display: "flex",
                  }}
                >
                  110.30 MATIC
                </Text>
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  background: "#ae4cff",
                  color: "white",
                  marginRight: "14px",
                }}
              >
                + Follow
              </Button>
            </div>
          </div>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/image/bgauthor9.webp"
            alt=""
            style={{
              width: "100%",
              height: "130px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Image
            src="/image/avatar_6.jpg"
            alt=""
            style={{
              width: "60px",
              borderRadius: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.card_body}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Charlize Ray
                  </Text>
                  <svg
                    style={{ marginTop: "-4px" }}
                    height={20}
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <Text
                  style={{
                    fontSize: "13px",
                    color: "#222",
                    fontWeight: "600",
                    display: "flex",
                  }}
                >
                  108.90 MATIC
                </Text>
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  background: "#ae4cff",
                  color: "white",
                  marginRight: "14px",
                }}
              >
                + Follow
              </Button>
            </div>
          </div>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/image/bgauthor7.jpg"
            alt=""
            style={{
              width: "100%",
              height: "130px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Image
            src="/image/avatar_7.jpg"
            alt=""
            style={{
              width: "60px",
              borderRadius: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.card_body}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Mike Orr
                  </Text>
                  <svg
                    style={{ marginTop: "-4px" }}
                    height={20}
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <Text
                  style={{
                    fontSize: "13px",
                    color: "#222",
                    fontWeight: "600",
                    display: "flex",
                  }}
                >
                  105.67 MATIC
                </Text>
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  background: "#ae4cff",
                  color: "white",
                  marginRight: "14px",
                }}
              >
                + Follow
              </Button>
            </div>
          </div>
        </Card>
        <Card
          style={{
            boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
            borderRadius: "30px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            src="/image/bgauthor8.jpg"
            alt=""
            style={{
              width: "100%",
              height: "130px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
          <Image
            src="/image/avatar_8.jpg"
            alt=""
            style={{
              width: "60px",
              borderRadius: "50%",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
            loading="lazy"
          />
          <div className={styles.card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div className={styles.card_body}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    Jessica Mai
                  </Text>
                  <svg
                    style={{ marginTop: "-4px" }}
                    height={20}
                    viewBox="0 0 17 17"
                    fill="none"
                  >
                    <path
                      d="M7.66691 2.62178C8.12691 2.22845 8.88025 2.22845 9.34691 2.62178L10.4002 3.52845C10.6002 3.70178 10.9736 3.84178 11.2402 3.84178H12.3736C13.0802 3.84178 13.6602 4.42178 13.6602 5.12845V6.26178C13.6602 6.52178 13.8002 6.90178 13.9736 7.10178L14.8802 8.15512C15.2736 8.61512 15.2736 9.36845 14.8802 9.83512L13.9736 10.8884C13.8002 11.0884 13.6602 11.4618 13.6602 11.7284V12.8618C13.6602 13.5684 13.0802 14.1484 12.3736 14.1484H11.2402C10.9802 14.1484 10.6002 14.2884 10.4002 14.4618L9.34691 15.3684C8.88691 15.7618 8.13358 15.7618 7.66691 15.3684L6.61358 14.4618C6.41358 14.2884 6.04025 14.1484 5.77358 14.1484H4.62025C3.91358 14.1484 3.33358 13.5684 3.33358 12.8618V11.7218C3.33358 11.4618 3.19358 11.0884 3.02691 10.8884L2.12691 9.82845C1.74025 9.36845 1.74025 8.62178 2.12691 8.16178L3.02691 7.10178C3.19358 6.90178 3.33358 6.52845 3.33358 6.26845V5.12178C3.33358 4.41512 3.91358 3.83512 4.62025 3.83512H5.77358C6.03358 3.83512 6.41358 3.69512 6.61358 3.52178L7.66691 2.62178Z"
                      fill="#38BDF8"
                      stroke="#38BDF8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6.08691 8.98833L7.69358 10.6017L10.9136 7.375"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <Text
                  style={{
                    fontSize: "13px",
                    color: "#222",
                    fontWeight: "600",
                    display: "flex",
                  }}
                >
                  102.34 MATIC
                </Text>
              </div>

              <Button
                style={{
                  borderRadius: "20px",
                  background: "#ae4cff",
                  color: "white",
                  marginRight: "14px",
                }}
              >
                + Follow
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default TopCreator;
