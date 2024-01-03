/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/marketplace.module.scss";
import { Button, Card, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import { FaGamepad, FaRegHeart } from "react-icons/fa";
import { ethers } from "ethers";
import { BsCart4 } from "react-icons/bs";
import { ImPriceTags } from "react-icons/im";
import { AiFillDollarCircle, AiOutlineCodepenCircle, AiOutlineEye, AiOutlineMore, AiOutlineSmile } from "react-icons/ai";
import MarketplaceAbi from "../datasmc/abi/marketplaceAbi.json";
import MarketplaceAddress from "../datasmc/address/marketplaceAddress.json";
import NFTAbi from "../datasmc/abi/nftAbi.json";
import NFTAddress from "../datasmc/address/nftAddress.json";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import { SearchContext } from "./SearchContext";
import { IoIosMusicalNotes } from "react-icons/io";
import { MdDraw, MdOndemandVideo } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

declare var window: any;

const Marketplace = () => {
  const {isLoggedIn, handleConnect1, searchQuery } = useContext(SearchContext);
  const [nfts, setNFTs] = useState([]);
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [transactionHash, setTransactionHash] = useState<string>("");

  const providerRPCURL:string =  "https://polygon-mumbai.infura.io/v3/4cd2c1a8018646908347fb2223053b30";
  

  const loadMarketplaceItems = async () => {
    
    try {
      const provider = new ethers.providers.JsonRpcProvider(providerRPCURL);

      const nft = new ethers.Contract(NFTAddress.address, NFTAbi, provider);
      const marketplace = new ethers.Contract(
        MarketplaceAddress.address,
        MarketplaceAbi,
        provider
      );

      if (nft && marketplace) {
        const marketplaceItem = await marketplace.getAvailableItems();
        console.log(marketplaceItem)

          const results:any = await Promise.all(
            marketplaceItem.map(async (item:any) => {
              try {
                const uri = await nft.tokenURI(item.tokenId);
                const response = await fetch(uri);
                const metadata = await response.json();
                const totalPrice = await marketplace.getTotalPrice(
                  item.itemId
                );
                return {
                  totalPrice,
                  itemId: item.itemId.toNumber(),
                  seller: item.seller,
                  name: metadata.name,
                  description: metadata.description,
                  image: metadata.image,
                  price: metadata.price,
                  owner: MarketplaceAddress.address,
                };
              } catch (error) {
                console.error(error); 
                return null;
              }
            })
          );
          const filteredItems:any = results.filter((item:any) => item !== null);
          setNFTs(filteredItems);
          localStorage.setItem("nftsData", JSON.stringify(filteredItems));
        
       
        // const itemCount = await marketplace.itemCount();

        // const itemPromises = Array.from({ length: itemCount }, (_, i) =>
        //   marketplace.items(i + 1)
        // ).map(async (item) => {

        //   console.log("HELLO")
        //   try {
        //     const itemPromise: any = await item;
        //     console.log(itemPromise);
        //     if (!itemPromise.sold) {
        //       const uri = await nft.tokenURI(itemPromise.tokenId);
        //       const response = await fetch(uri);
        //       const metadata = await response.json();
        //       const totalPrice = await marketplace.getTotalPrice(
        //         itemPromise.itemId
        //       );
        //       const owner = await nft.ownerOf(itemPromise.itemId.toNumber());
    
        //       return {
        //         totalPrice,
        //         itemId: itemPromise.itemId.toNumber(),
        //         seller: itemPromise.seller,
        //         name: metadata.name,
        //         description: metadata.description,
        //         image: metadata.image,
        //         price: metadata.price,
        //         owner,
        //       };
        //     }
        //     return null;
        //   } catch (error) {
        //     console.error("Error processing item:", error);
        //     return null;
        //   }
        // });

        // const items = await Promise.all(itemPromises);
        // console.log(items,"items")
        // const filteredItems:any = items.filter((item) => item !== null);
      }
    } catch (error) {
      console.error("Error loading marketplace items:", error);
    }
  };


  useEffect(() => {
    const nftData: any = localStorage.getItem("nftsData");
    const nftsFromLocalStorage = nftData ? JSON.parse(nftData) : [];
    setNFTs(nftsFromLocalStorage);
    loadMarketplaceItems();
    
    //connect metamsk check
    const addressData: any = localStorage.getItem("address");
    if (addressData?.length > 0) {
      handleConnect1(true); 
    }
  }, []);


  const handleBuyNFT = async (item: any) => {
    try {

      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [item.itemId]: true,
      }));

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const marketplace = new ethers.Contract(
        MarketplaceAddress.address,
        MarketplaceAbi,
        signer
      );


      const tx = await (
        await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
      ).wait();

      if (tx) {
        setTransactionHash(tx?.transactionHash);
        setLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [item.itemId]: false,
        }));
        loadMarketplaceItems();
      } 
        // const removeNftsMarketplace:any = nfts.filter((nft:any)=> nft.itemId !== item.itemId);
        // setNFTs(removeNftsMarketplace);

    } catch (error) {
      console.error("Error buying NFT:", error);
      setLoadingMap((prevLoadingMap) => ({
        ...prevLoadingMap,
        [item.itemId]: false,
      }));
    } 
  };

  useEffect(() => {
    const nftData: any = localStorage.getItem("nftsData");
    const nfts1: any = nftData ? JSON.parse(nftData) : [];

    const filteredItems = searchQuery
      ? nfts1.filter((item: any) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : nfts1;

    setNFTs(filteredItems);
  }, [searchQuery]);

  console.log(nfts);

  const toast = useToast();

  const handleLikeNFT = async (item:any) =>{
    if(isLoggedIn) {
      const addressData: any = localStorage.getItem("address");

      try {
            const response = await axios.post(`http://localhost:5000/add_favorite/${addressData}`,item);
            console.log(response.data);
            toast({
              title: 'Success',
              description: 'Add item favorited successfully !',
              status: 'success',
              duration: 2000,
              isClosable: true,
              position: 'top',
            });
          } catch (error) {
            console.error('Error adding to favorites:', error);
            toast({
              title: 'Info',
              description: 'You already liked item !',
              status: 'info',
              duration: 2000,
              isClosable: true,
              position: 'top',
            });
      }
    } else {
      toast({
        title: 'Warning',
        description: 'Please login to like items !',
        status: 'warning',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
   
  }

  const handleAddToCart = (cartItem: any) => {
    // Lấy giỏ hàng từ localStorage nếu có, hoặc khởi tạo một mảng rỗng
    const existingCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    // Thêm mục mới vào giỏ hàng
    existingCart.push(cartItem);
    // Lưu giỏ hàng mới vào localStorage
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    toast({
      title: 'Success',
      description: 'Add item to successfully !',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
}


  return (
    <>
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems:"center",
          marginTop:"60px"
        }}
      >
        <div className={styles.heading}>Explore Items 🚀</div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            style={{
              background: "transparent",
              color: "black",
              marginRight: "10px",
              borderRadius:"20px"
            }}
          >
            <MdDraw style={{ marginRight: "4px" }}/>
            Art
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "black",
              marginRight: "10px",
              borderRadius:"20px"
            }}
          >
            <FaGamepad style={{ marginRight: "4px" }}/>

            Games
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "black",
              marginRight: "10px",
              borderRadius:"20px"
            }}
          >
            <IoIosMusicalNotes style={{ marginRight: "4px" }}/>
            Music
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "black",
              marginRight: "10px",
              borderRadius:"20px"
            }}
          >
            <BiCategory style={{ marginRight: "4px" }} />
            Collectibles
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "black",
              marginRight: "10px",
              borderRadius:"20px"
            }}
          >
            <AiOutlineCodepenCircle style={{ marginRight: "4px" }}/>
            3D Model
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "black",
              marginRight: "10px",
              borderRadius:"20px"
            }}
          >
            <AiOutlineSmile style={{ marginRight: "4px" }}/>
            Memes
          </Button>
          <Button
            style={{
              background: "transparent",
              color: "black",
              marginRight: "10px",
              borderRadius:"20px"
            }}
          >
            <MdOndemandVideo style={{ marginRight: "4px" }}/>
            Videos
          </Button>
        </div>
        <div>
          <Button style={{ borderRadius:"20px",background:"transparent", border:"2px solid #ae4cff", color:"#ae4cff" }}>
            <AiOutlineEye style={{ marginRight: "4px" }} />
            View All Items
          </Button>
        </div>
      </div>
      <div className={styles.container}>
        {nfts.length > 0 &&
          nfts.map((item: any, id) => (
            <Card
              className={styles.card}
              style={{
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
              key={id}
            >
              <div style={{display:"flex",width:"36px", height:"36px",borderRadius:"50px",background:"rgba(255,255,255,0.5)", position:"absolute", right:"30px", top: "30px", alignItems:"center", justifyContent:"center"}}>
              <AiOutlineMore  style={{color:"rgba(0, 0, 0, 0.7)", fontSize:"20px"}}/>
              </div>
              <Link
                href={`/productDetail/${ethers.BigNumber.from(
                  item.itemId
                ).toNumber()}`}
              >
                <Image
                  src={item.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  alt=""
                  loading="lazy"
                  style={{
                    width: 270,
                    height: 270,
                    objectFit: "contain",
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius:"10px"
                  }}
                  className={styles.image_nft}
                />
              </Link>
              <div className={styles.card_body}>
                <Link
                  href={`/productDetail/${ethers.BigNumber.from(
                    item.itemId
                  ).toNumber()}`}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                    }}
                  >
                    {item.name}
                  </Text>
                </Link>
                <Text style={{ fontWeight: "600", color: "#484848" }} onClick={()=> handleLikeNFT(item)}>
                  <FaRegHeart />
                </Text>
              </div>
              <hr style={{ borderColor: "#eee" }} />
              <div className={styles.price}>
                <div>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#909090",
                      marginTop: "-5px",
                    }}
                  >
                    Price
                  </Text>
                  <Text
                    style={{
                      fontSize: "14px",
                      color: "#222",
                      fontWeight: "600",
                    }}
                  >
                    {item.price} ETH
                  </Text>
                </div>
                <div>
               
                  <Button
                    onClick={() => handleBuyNFT(item)}
                    style={{
                      background: "#ae4cff",
                      color: "#fff",
                      width: "130px",
                      marginRight: "5px",
                      borderRadius:"20px"
                    }}
                  >
                    {!loadingMap[item.itemId] ? (
                      " Purchase ⚡"
                    ) : (
                      <>
                        <Text style={{ marginRight: "4px" }}>BUYING NFT</Text>{" "}
                        <Spinner size="sm" />
                      </>
                    )}
                  </Button>

                  <Button
                  style={{
                    background: "linear-gradient(to right, #D01498,#647ECB)",
                    color: "#fff",
                    padding:"10px 10px",
                    borderRadius:"10px",
                    marginLeft:"4px"
                  }}
                  onClick={()=>handleAddToCart(item)}
                >
                  <BsCart4 size={20} style={{ marginRight: "2px" }} />
                  
                </Button>
                </div>
              </div>
              {/* <div className={styles.button_buy}>
                <Button
                  style={{
                    background: "linear-gradient(to right, #D01498,#647ECB)",
                    color: "#fff",
                    width: "160px",
                  }}
                >
                  <BsCart4 size={20} style={{ marginRight: "2px" }} />
                  ADD TO CART
                </Button>
              </div> */}
            </Card>
          ))}
      </div>
    </>
  );
};

export default Marketplace;