"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Button,
  Card,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import styles from "../../../styles/productdetail.module.scss";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineEye, AiOutlineMore } from "react-icons/ai";
import { useRouter, useParams } from "next/navigation";
import { ethers } from "ethers";
import MarketplaceAbi from "@/datasmc/abi/marketplaceAbi.json";
import MarketplaceAddress from "@/datasmc/address/marketplaceAddress.json";
import Link from "next/link";
import convertEthToUsd from "../../../utils/covertCurrency"
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { SearchContext } from "@/components/SearchContext";
declare var window: any;
import { toast } from 'react-toastify';
import axios from "axios";
const ProductDetail = () => {
  interface NftData {
    name: string;
    image: string;
    price: number;
    owner: string;
    description: string;
  }

  const router: any = useRouter();

  const param = useParams();

  const { id } = param;
  console.log(id);

  const {  addToCart } = useContext(SearchContext);

  const [nft, setNft] = useState<NftData>({
    name: "",
    image: "",
    price: 0,
    owner: "",
    description: "",
  });


  const [usdPrice, setUsdPrice] = useState(0);

  useEffect(() => {
    const nftData:any = localStorage.getItem("nftsData");
    const nfts = nftData ? JSON.parse(nftData) : [];
    const parsedId = typeof id === "string" ? parseInt(id) : null;

    if (parsedId !== null) {
      const nft = nfts.find(
        (item: any) =>
          ethers.BigNumber.from(item.itemId).toNumber() === parsedId
      );
      setNft(nft);
      
      const handleUsd = async() => {

        
       const resultUsd:any = await convertEthToUsd(Number(nft.price));
       console.log(resultUsd)
       const usd:any = Number(resultUsd).toFixed(2)
      setUsdPrice(usd);
      }
      handleUsd()
      
    } else {
      console.error("Invalid id:", id);
    }
  }, [id]);

  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState("");
  const handleBuyNFT = async (item: any) => {
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(
        MarketplaceAddress.address,
        MarketplaceAbi,
        signer
      );

      const tx = await marketplace.purchaseItem(item.itemId, {
        value: item.totalPrice,
      });

      if (tx) {
        setTx(tx?.hash);
        onOpen();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error buying NFT:", error);
      alert("Please install and connect metamask wallet!");
      setLoading(false);
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleViewTx = () => {
    router.push(`https://mumbai.polygonscan.com/tx/${tx}`);
    setTimeout(() => {
      onClose();
    }, 4000);
  };

  const handleAddToCart = (cartItem: any) => {

    addToCart(true);

    const addressData: any = localStorage.getItem("address");

    if(addressData?.length > 0) {
        saveCartToDatabase(addressData, cartItem);
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const isItemInCart = existingCart.some(
        (item: any) => item.itemId === cartItem.itemId
      );
      if (!isItemInCart) {
        existingCart.push(cartItem);
        localStorage.setItem("cartItems", JSON.stringify(existingCart));
        toast.success('Add item to cart successfully !', {
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
        toast.info('You already added this item to cart!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        
      }    
    } 
};

const saveCartToDatabase = async (walletAddress:any, item:any) => {
  try {
    const response = await axios.post(`http://localhost:5000/add_to_cart/${walletAddress}`, item);

    if (response.status === 200) {
    
      toast.success('Add item to cart successfully !', {
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
      console.error('Failed to add item to cart:', response.data.error);
    }
  } catch (error:any) {
   
    toast.info('You already added this item to cart!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
};

  return (
    <>
      <Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent style={{ textAlign: "center" }}>
          <ModalHeader>CREATE NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text style={{ fontStyle: "italic" }}>
              (Create your nft successfully)
            </Text>
            <Button
              style={{ marginTop: "20px", background: "yellow" }}
              onClick={handleViewTx}
            >
              {tx.slice(0, 10)}...{tx.slice(-10)}
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <div className={styles.header}>
        <Navbar />
      </div>

      <div className={styles.detail}>
        <div className={styles.left} style={{ borderRadius: "20px" }}>
          <PhotoProvider>
            <PhotoView
              src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
            >
              <Image
                src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                alt="image nft"
                style={{
                  width: 600,
                  height: 600,
                  objectFit: "contain",
                  background: "#fff",
                  border: "1px solid #eee",
                  cursor: "pointer",
                  borderRadius: "20px",
                }}
              />
            </PhotoView>
          </PhotoProvider>
        </div>
        <div className={styles.right}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: "34px", fontWeight: "700", marginTop: "10px" }}
            >
              {nft.name}
            </Text>
            <div
              style={{
                display: "flex",
                width: "36px",
                height: "36px",
                borderRadius: "50px",
                background: "rgba(0,0,0,0.1)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AiOutlineMore
                style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: "25px" }}
              />
            </div>
          </div>

          <Text
            style={{
              fontWeight: "500",
              marginBottom: "5px",
              marginTop: "10px",
            }}
          >
            Owned by{" "}
            <span style={{ color: "#ae4cff" }}>
              {nft.owner.slice(0, 5)}...{nft.owner.slice(-5)}
            </span>
          </Text>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Image
              src="/u1.jpg"
              alt="image nft"
              style={{
                width: 40,
                height: 40,
                objectFit: "contain",
                background: "#fff",
                border: "1px solid #eee",
                cursor: "pointer",
                borderRadius: "20px",
              }}
            />
            <Text style={{ fontWeight: "600", fontSize: "16px" }}>
              @vanduc19it
            </Text>
          </div>

          <div style={{ margin: "30px 0px" }}>
            <Text style={{ fontWeight: "600", fontSize: "16px" }}>Price</Text>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Image src="/eth.png" alt="" style={{ height: "30px" }} />
              <Text style={{ fontWeight: "700", fontSize: "30px" }}>
                {nft.price} MATIC <span style={{color:"#aaa", fontSize:"18px", fontWeight:"500"}}>(${usdPrice})</span>
              </Text>
            </div>
          </div>
          <div style={{ margin: "20px 0px 40px" }}>
            <Button
              style={{
                borderRadius: "20px",
                background: "#ae4cff",
                width: "160px",
                color: "white",
              }}
              onClick={() => handleBuyNFT(nft)}
            >
              {!loading ? (
                "Buy Now ⚡"
              ) : (
                <>
                  <Text style={{ marginRight: "4px" }}>Buying</Text>{" "}
                  <Spinner size="sm" />
                </>
              )}
            </Button>
            <Button
              style={{
                borderRadius: "20px",
                background: "#000",
                width: "160px",
                color: "white",
                marginLeft: "20px",
              }}
              onClick={()=>handleAddToCart(nft)}
            >
              <BsCart4 style={{ marginRight: "4px" }} />
              Add to Cart
            </Button>
          </div>
          <Tabs style={{ border: "white" }}>
            <TabList>
              <Tab
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  background: "#fff",
                  borderRadius: "30px",
                  color: "black",
                  marginRight: "10px",
                  boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                Description
              </Tab>
              <Tab
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  background: "#fff",
                  borderRadius: "30px",
                  color: "black",
                  marginRight: "10px",
                  boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                Reviews
              </Tab>
              <Tab
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  background: "#fff",
                  borderRadius: "30px",
                  color: "black",
                  boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.1)",
                }}
              >
                Details
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p
                  style={{
                    textAlign: "justify",
                    padding: "20px",
                    borderRadius: "20px",
                    boxShadow: "0 0px 4px 2px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {nft.description} NFT is a unique and captivating type of NFT
                  (Non-Fungible Token) designed around the space and mystical
                  creatures theme. The {nft.description} NFT is specifically
                  inspired by the image of a adventurous cat searching for an
                  exciting journey on the Red Planet. This NFT captures the
                  charm and spirit of exploration, and is perfect for collectors
                  and enthusiasts who appreciate the beauty of art, space and
                  feline companions. With its one-of-a-kind design, the{" "}
                  {nft.description} NFT is sure to be a treasured addition to
                  any collection.
                </p>
              </TabPanel>
              <TabPanel>
                <p>Review about NFT</p>
              </TabPanel>
              <TabPanel>
                <p>Detail about NFT</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <div className="">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className={styles.heading}>Related Products</div>
          <div style={{ marginRight: "26px" }}>
            <Link href="/">
              <Button
                style={{
                  background: "#3A9BFC",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                <AiOutlineEye style={{ marginRight: "4px" }} />
                View All
              </Button>
            </Link>
          </div>
        </div>
        <div className={styles.container}>
          <Card
            className={styles.card}
            style={{
              boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
              borderRadius: "2px",
            }}
          >
            <Image
              src="/image/marscat2.png"
              alt="image nft"
              style={{
                width: 270,
                height: 270,
                objectFit: "contain",
                background: "#fff",
                border: "1px solid #eee",
              }}
              className={styles.image_nft}
            />

            <div className={styles.card_body}>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#484848",
                  fontSize: "18px",
                }}
              >
                Mars Cat 2
              </Text>
              <Text style={{ fontWeight: "600", color: "#484848" }}>
                <FaRegHeart />
              </Text>
            </div>
            <hr style={{ borderColor: "#eee" }} />
            <div className={styles.price}>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#909090",
                  marginBottom: "4px",
                }}
              >
                Price
              </Text>
              <Text
                style={{ fontSize: "14px", color: "#222", fontWeight: "600" }}
              >
                0.05 MATIC
              </Text>
            </div>
          </Card>
          <Card
            className={styles.card}
            style={{
              boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
              borderRadius: "2px",
            }}
          >
            <Image
              src="/image/marscat3.png"
              alt="image nft"
              style={{
                width: 270,
                height: 270,
                objectFit: "contain",
                background: "#fff",
                border: "1px solid #eee",
              }}
              className={styles.image_nft}
            />
            <div className={styles.card_body}>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#484848",
                  fontSize: "18px",
                }}
              >
                Mars Cat 3
              </Text>
              <Text style={{ fontWeight: "600", color: "#484848" }}>
                <FaRegHeart />
              </Text>
            </div>
            <hr style={{ borderColor: "#eee" }} />
            <div className={styles.price}>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#909090",
                  marginBottom: "4px",
                }}
              >
                Price
              </Text>
              <Text
                style={{ fontSize: "14px", color: "#222", fontWeight: "600" }}
              >
                0.05 MATIC
              </Text>
            </div>
          </Card>
          <Card
            className={styles.card}
            style={{
              boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
              borderRadius: "2px",
            }}
          >
            <Image
              src="/image/marscat4.avif"
              alt="image nft"
              style={{
                width: 270,
                height: 270,
                objectFit: "contain",
                background: "#fff",
                border: "1px solid #eee",
              }}
              className={styles.image_nft}
            />
            <div className={styles.card_body}>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#484848",
                  fontSize: "18px",
                }}
              >
                Mars Cat 4
              </Text>
              <Text style={{ fontWeight: "600", color: "#484848" }}>
                <FaRegHeart />
              </Text>
            </div>
            <hr style={{ borderColor: "#eee" }} />
            <div className={styles.price}>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#909090",
                  marginBottom: "4px",
                }}
              >
                Price
              </Text>
              <Text
                style={{ fontSize: "14px", color: "#222", fontWeight: "600" }}
              >
                0.05 MATIC
              </Text>
            </div>
          </Card>
          <Card
            className={styles.card}
            style={{
              boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
              borderRadius: "2px",
            }}
          >
            <Image
              src="/image/marscat5.avif"
              alt="image nft"
              style={{
                width: 270,
                height: 270,
                objectFit: "contain",
                background: "#fff",
                border: "1px solid #eee",
              }}
              className={styles.image_nft}
            />
            <div className={styles.card_body}>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#484848",
                  fontSize: "18px",
                }}
              >
                Mars Cat 5
              </Text>
              <Text style={{ fontWeight: "600", color: "#484848" }}>
                <FaRegHeart />
              </Text>
            </div>
            <hr style={{ borderColor: "#eee" }} />
            <div className={styles.price}>
              <Text
                style={{
                  fontSize: "14px",
                  color: "#909090",
                  marginBottom: "4px",
                }}
              >
                Price
              </Text>
              <Text
                style={{ fontSize: "14px", color: "#222", fontWeight: "600" }}
              >
                0.05 MATIC
              </Text>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
