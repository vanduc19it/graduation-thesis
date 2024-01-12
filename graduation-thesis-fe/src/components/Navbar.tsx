/* eslint-disable react/no-children-prop */
"use client";
import {
  Button,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { BiUserCircle, BiPencil } from "react-icons/bi";
import { MdOutlinePayment, MdWallet } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { BiCategoryAlt } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import styles from "../styles/navbar.module.scss";
import axios from "axios";
import { ethers } from "ethers";
import { SearchContext } from "./SearchContext";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import convertEthToUsd from "@/utils/covertCurrency";
import { toast } from 'react-toastify';


declare var window: any;
const Navbar = () => {
  const [provider, setProvider] = useState(null);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  const { isLoggedIn, handleConnect1, user, setUser } = useContext(SearchContext);
  const [login, setLogin] = useState(1);
  const router = useRouter();

  const [checkNavigateProfile, setCheckNavigateProfile] = useState(false);
  const handleConnectWallet = async () => {
    if (typeof window !== "undefined") {
      try {
        //init provider
        const provider: any = new ethers.providers.Web3Provider(
          window.ethereum
        );
        await provider.send("eth_requestAccounts", []);
        const signer: any = provider.getSigner();
        //get address and balance
        const address: any = await signer.getAddress();
        const bigBalance: any = await signer.getBalance();
        const balance: any = Number.parseFloat(
          ethers.utils.formatEther(bigBalance)
        );
        //set balance to state wallet
        setProvider(provider);
        localStorage.setItem("address", address);
        localStorage.setItem("balance", balance);
        setLogin(login + 1); //check login or not
        handleConnect1(true);
        if (address !== "") {
          handleCreateNewUser(address);

          toast.success('Connected wallet successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

          handleGetUser(address);
        }

        if (checkNavigateProfile) {
          router.push(`http://127.0.0.1:3000/profile`);
        }
      } catch (error) {
        alert("Please install metamask wallet and connect to continue!");
      }
    }
    onClose();
  };

  const [logout, setLogout] = useState(1);

  const handleLogout = () => {
    localStorage.setItem("address", "");
    localStorage.setItem("balance", "");
    setProvider(null);
    setLogout(logout + 1); //check logout
    handleConnect1(false);


    toast.success('You has been logged out successfully!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  useEffect(() => {
    const addressData: any = localStorage.getItem("address");
    const balanceData: any = localStorage.getItem("balance");
    const balanceData1: any = balanceData ? Number(balanceData) : 0;
    setAddress(addressData); //set address to state wallet
    setBalance(balanceData1);
  }, [isLoggedIn, logout, login]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenModal2,
    onOpen: onOpenModal2,
    onClose: onCloseModal2,
  } = useDisclosure();

  const { handleSearch, cartCheck, addToCart } = useContext(SearchContext);
  const [searchInput, setSearchInput] = useState("");

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      // Thực hiện tìm kiếm khi nhấn phím Enter
      handleSearch(searchInput);
    }
  };

  const handleCreateNewUser = async (address: string) => {
    const userData = {
      name: "Unnamed",
      wallet_address: address,
      avatar: "",
      cover_photo: "",
    };

    console.log(userData);

    try {
      const response = await axios.post(
        "http://localhost:5000/create_user",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNavigateProfile = () => {
    if (isLoggedIn) {
      //chuyen trang profile
      router.push(`http://127.0.0.1:3000/profile`);
    } else {
      //required login
      setCheckNavigateProfile(true);
      onOpen();
    }
  };

  const [cartItems, setCartItems] = useState<any>([]);
  useEffect(() => {
      if (isLoggedIn) {

          handleGetCart();
        
      } else {

        const storedCartItems = JSON.parse(
          localStorage.getItem("cartItems") || "[]"
        );
        setCartItems(storedCartItems);
      }
    

    if (isOpenModal2 || cartCheck) {
      if (address?.length > 0) {
        handleGetCart();
      } else {
      
        const storedCartItems = JSON.parse(
          localStorage.getItem("cartItems") || "[]"
        );
        setCartItems(storedCartItems);
      }
    }
    addToCart(false);
  }, [isOpenModal2, cartCheck, isLoggedIn]);

  const [totalPrice, setTotalPrice] = useState(0);
  const [usdPrice, setUsdPrice] = useState(0);

  // Effect này sẽ chạy mỗi khi cartItems thay đổi
useEffect(() => {
  if (cartItems?.length > 0) {
    const totalPrice = cartItems.reduce((total:number, item:any) => {
      total += parseFloat(item.price);
      return total;
    }, 0);

    setTotalPrice(totalPrice);
    convertEthToUsd(totalPrice).then((usdPrice:any) => {
      setUsdPrice(usdPrice);
    });
  }
}, [cartItems]);

  const handleGetCart = async () => {
    const addressData1: any = localStorage.getItem("address");
    try {
      const response = await axios.get(
        `http://localhost:5000/get_cart/${addressData1}`
      );

      if (response.status === 200) {
        setCartItems(response.data.cart);
      } else {
        console.error("Failed to get cart:", response.data.error);
      }
    } catch (error: any) {
      console.error("Error get cart:", error.message);
    }
  };

  console.log(totalPrice)

  const handleClearAll = async () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");

    if (address?.length > 0) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/clear_cart/${address}`
        );

        if (response.status === 200) {
          
        } else {
          console.error("Failed to clear cart:", response.data.error);
        }
      } catch (error: any) {
        console.error("Error clearing cart:", error.message);
      }
    }
    toast.success('You has been clear all cart successfully!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const handleRemoveItemCart = async (item: any) => {
    const updatedCart = cartItems.filter(
      (cartItem: any) => cartItem.itemId !== item.itemId
    );

    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    if (address?.length > 0) {
      console.log(item.itemId);
      try {
        const response = await axios.delete(
          `http://localhost:5000/remove_from_cart/${address}/${item.itemId}`
        );

        if (response.status === 200) {
          toast.success('Remove item from cart successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        } else {
          console.error(
            "Failed to remove item from cart:",
            response.data.error
          );
        }
      } catch (error: any) {
        console.error("Error remove item cart:", error.message);
      }
    }
    
  };

  const handleBuyCart = () => {
    toast.error('Complete purchase failed !', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  
  const handleGetUser = async (addressWallet: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get_user/${addressWallet}`
      );
      const data = response.data;
      console.log(data.user);
      setUser(data.user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const addressData: any = localStorage.getItem("address");
    handleGetUser(addressData)
    console.log("Dữ liệu người dùng:", user);
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader style={{ fontWeight: "700" }}>
            Choose Your Wallet
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className={styles.connect} onClick={handleConnectWallet}>
              <div className={styles.wallet}>
                <Image
                  src="/metamask.svg"
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                  loading="lazy"
                />
                <Text style={{ fontWeight: "700", marginLeft: "20px" }}>
                  Metamask
                </Text>
              </div>
              <div>
                <Button style={{ borderRadius: "15px" }} colorScheme="linkedin">
                  Popular
                </Button>
              </div>
            </div>
            <div className={styles.connect}>
              <div className={styles.wallet}>
                <Image
                  src="/coinbase.png"
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                  loading="lazy"
                />
                <Text style={{ fontWeight: "700", marginLeft: "20px" }}>
                  Coinbase Wallet
                </Text>
              </div>
              <div>
                <Button style={{ borderRadius: "15px" }} colorScheme="linkedin">
                  Popular
                </Button>
              </div>
            </div>
            <div className={styles.connect}>
              <div className={styles.wallet}>
                <Image
                  src="/phantom.svg"
                  alt=""
                  style={{ width: "50px", height: "50px" }}
                  loading="lazy"
                />
                <Text style={{ fontWeight: "700", marginLeft: "20px" }}>
                  Phantom
                </Text>
              </div>
              <div>
                <Button style={{ borderRadius: "15px" }}>Solana</Button>
              </div>
            </div>
            <div className={styles.connect}>
              <div className={styles.wallet}>
                <Image src="/bitkeep.png" alt="" loading="lazy" />
                <Text style={{ fontWeight: "700", marginLeft: "20px" }}>
                  Bitkeep
                </Text>
              </div>
              <div>
                <Button style={{ borderRadius: "15px" }}>BNB Chain</Button>
              </div>
            </div>
            <div className={styles.connect}>
              <div className={styles.wallet}>
                <Image src="/core.png" alt="" loading="lazy" />
                <Text style={{ fontWeight: "700", marginLeft: "20px" }}>
                  Core
                </Text>
              </div>
              <div>
                <Button style={{ borderRadius: "15px" }}>Avalanche</Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/logo.png"
              alt=""
              style={{ width: "30px", height: "48px", marginRight: "10px" }}
              loading="lazy"
            />
            <Text
              style={{ fontWeight: "600", fontSize: "18px", color: "white" }}
            >
              Digital World
            </Text>
          </Link>
        </div>
        <div className={styles.menu}>
          <Link
            style={{ fontWeight: "600", fontSize: "18px", color: "white" }}
            href="/"
          >
            Drops
          </Link>
          <Link
            style={{ fontWeight: "600", fontSize: "18px", color: "white" }}
            href="/"
          >
            Stats
          </Link>
          <div>
            <Link
              style={{ fontWeight: "600", fontSize: "18px", color: "white" }}
              href="/createNewNFT"
            >
              Create
            </Link>
          </div>
        </div>
        <div className={styles.search}>
          <InputGroup>
            <Input
              variant="filled"
              placeholder="Search items"
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ background: "rgba(255,255,255,0.2)", color: "white" }}
              className={styles.search}
            />
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={IoIosSearch} style={{ color: "white" }} />}
            />
          </InputGroup>
        </div>
        <div className={styles.button}>
          <div>
            <Button
              style={{
                borderRadius: "10px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
                marginRight: "10px",
              }}
              onClick={onOpen}
            >
              {address?.length > 0 ? (
                <>
                  <Image
                    src="/eth.png"
                    alt=""
                    style={{ width: "20px", marginRight: "5px" }}
                    loading="lazy"
                  />{" "}
                  <Text>{balance.toFixed(2)} ETH</Text>
                </>
              ) : (
                <>
                  <MdWallet style={{ marginRight: "5px" }} size={24} />
                  Login
                </>
              )}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                style={{
                  borderRadius: "10px",
                  padding: 10,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                }}
              >
                {address?.length > 0 ? (
                  <Image
                    src={user?.avatar ? user?.avatar : "/image/avatar-default-icon.png"}
                    alt=""
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                    }}
                    loading="lazy"
                  />
                ) : (
                  <BiUserCircle size={25} />
                )}
              </MenuButton>
              <MenuList>
                <p onClick={handleNavigateProfile}>
                  <MenuItem style={{ fontWeight: "700" }}>
                    <HiOutlineUser style={{ marginRight: "4px" }} size={18} />
                    Profile
                  </MenuItem>
                </p>
                <Link href="/">
                  <MenuItem style={{ fontWeight: "700" }}>
                    <BiCategoryAlt style={{ marginRight: "4px" }} size={18} />
                    My Collections
                  </MenuItem>
                </Link>
                <Link href="/createNewNFT">
                  <MenuItem style={{ fontWeight: "700" }}>
                    <BiPencil style={{ marginRight: "4px" }} size={18} />
                    Create
                  </MenuItem>
                </Link>
                <MenuItem style={{ fontWeight: "700" }} onClick={handleLogout}>
                  <FiLogOut style={{ marginRight: "4px" }} size={18} />
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <div>
            <Button
              style={{
                padding: 10,
                borderRadius: "10px",
                marginLeft: "10px",
                background: "rgba(255,255,255,0.2)",
                color: "white",
              }}
              onClick={onOpenModal2}
            >
                {cartItems?.length > 0 && ( 
                <Badge
                style={{
                  position: "absolute",
                  right: 4,
                  top: 4,
                  borderRadius: "50%",
                  background: "#ae4cff",
                  color: "white",
                  width: "16px",
                  height: "16px",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
               {cartItems?.length}
              </Badge>
              )
                }
             
              <BsCart4 size={22} />
            </Button>
          </div>
        </div>
      </div>
      {/* Drawer cart */}
      <Drawer
        isOpen={isOpenModal2}
        placement="right"
        onClose={onCloseModal2}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              Your cart <BsCart4 size={20} />
            </div>
          </DrawerHeader>
          <DrawerBody>
            {cartItems.length > 0 ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "black", fontWeight: "500" }}>
                    {cartItems.length} {cartItems.length > 1 ? "items" : "item"}
                  </Text>
                  <Text
                    style={{
                      cursor: "pointer",
                      color: "black",
                      fontWeight: "500",
                    }}
                    onClick={handleClearAll}
                  >
                    Clear all
                  </Text>
                </div>
                {cartItems.map((item: any, index: any) => (
                  <div
                    style={{
                      display: "flex",
                      marginTop: "30px",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      borderRadius: 8,
                      padding: "8px",
                    }}
                    key={index}
                  >
                    <Image
                      src={item?.image?.replace(
                        "ipfs://",
                        "https://ipfs.io/ipfs/"
                      )}
                      alt=""
                      style={{
                        width: "80px",
                        height: "80px",
                        marginRight: "20px",
                        borderRadius: "20px",
                      }}
                      loading="lazy"
                    />
                    <div>
                      <Text
                        style={{
                          fontSize: "21px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text>{item.price} ETH</Text>
                    </div>
                    <div
                      style={{
                        marginLeft: "auto",
                        background: "white",
                        cursor: "pointer",
                      }}
                      onClick={() => handleRemoveItemCart(item)}
                    >
                      <MdDelete
                        style={{ fontSize: "30px" }}
                        className={styles["delete-icon"]}
                      />
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <Text style={{ fontSize: "20px", fontWeight: "500" }}>
                    Total price
                  </Text>
                  <div style={{ textAlign: "right" }}>
                    <Text style={{ fontSize: "18px", fontWeight: "500" }}>
                      {totalPrice} ETH
                    </Text>
                    <Text style={{ fontSize: "16px", color: "#323233" }}>
                    ${usdPrice}
                    </Text>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    style={{
                      background: "#ae4cff",
                      color: "#fff",
                      width: "100%",
                      padding: "12px 40px",
                      marginTop: "30px",
                      borderRadius: "20px",
                    }}
                    onClick={handleBuyCart}
                  >
                    <MdOutlinePayment
                      style={{ marginRight: "4px", marginTop: "2px" }}
                    />
                    Complete purchase
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <Image
                  src="/image/empty-cart.png"
                  alt=""
                  style={{
                    width: "300px",
                    height: "300px",
                    margin: "20px auto",
                  }}
                  loading="lazy"
                />
                <Text
                  style={{
                    fontWeight: "600",
                    textAlign: "center",
                    fontSize: 20,
                    marginBottom: 10,
                    color: "#3a9bfc",
                  }}
                >
                  Your Cart is Empty
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    textAlign: "center",
                    fontSize: 17,
                    color: "#bbb",
                  }}
                >
                  Add items to get started
                </Text>
              </>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
