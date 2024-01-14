"use client";
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../styles/auction.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ethers } from "ethers";
import NFTAbi from "@/datasmc/abi/nftAbi.json";
import NFTAddress from "@/datasmc/address/nftAddress.json";
import AuctionAbi from "@/datasmc/abi/auctionAbi.json";
import AuctionAddress from "@/datasmc/address/auctionAdress.json";
import axios from "axios";
import Countdown from "react-countdown";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from 'react-toastify';
declare var window: any;

const Auction = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [auction, setAuction] = useState<any>([]);

  //get list những nft đang đấu giá.
  useEffect(() => {
    
  
    getListAuction();
  }, []);

  const handleGetUser = async (addressWallet: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get_user/${addressWallet}`
      );
      const data = response.data;
      return data.user.avatar
        } catch (error) {
      console.error("Error:", error);
    }
  };

  const isDataCached = () => {
    const cachedData = localStorage.getItem('auctionData');
    return !!cachedData; // Trả về true nếu có dữ liệu trong cache, ngược lại trả về false
  };

  const [auctionStatus, setAuctionStatus] = useState<any>([]); // Trạng thái đếm ngược

  const getListAuction = async () => {
    try {
      if (isDataCached()) {
        const cachedData:any = localStorage.getItem('auctionData');
        const parsedData = JSON.parse(cachedData);
        setAuction(parsedData);
        const statusArray = parsedData.map((item:any) => item.endTime * 1000 > Date.now());
        setAuctionStatus(statusArray);
      }

      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-mumbai.infura.io/v3/4cd2c1a8018646908347fb2223053b30"
      );
      const auctionContract = new ethers.Contract(
        AuctionAddress.address,
        AuctionAbi,
        provider
      );
      const nft = new ethers.Contract(NFTAddress.address, NFTAbi, provider);
  
      const createAuction = await auctionContract.getAuctionByStatus(true);
  
      const tokenURIs = await Promise.all(
        createAuction.map(async (auctionItem:any) => {
          return await nft.tokenURI(auctionItem?.tokenId.toNumber());
        })
      );
  
      // Sử dụng Axios để thực hiện các yêu cầu HTTP song song
      const responses = await Promise.all(
        tokenURIs.map((tokenURI) => axios.get(tokenURI))
      );
  
      const newItems = await Promise.all(
        createAuction.map(async (auctionItem:any, i:any) => {
          const tokenId = auctionItem?.tokenId.toNumber();
          const auctionId = auctionItem?.auctionId.toNumber();
          const startTime = auctionItem?.startTime.toNumber();
          const endTime = auctionItem?.endTime.toNumber();
          const lastBidder = auctionItem?.lastBidder;
          const auctioner = auctionItem?.auctioneer;
  
          const { name, image, description } = responses[i].data;
          const owner = await nft.ownerOf(tokenId);
          const lastBid = ethers.utils.formatUnits(
            auctionItem?.lastBid,
            "ether"
          );
  
          const result = await handleGetUser(auctioner);
  
          return {
            auctionId,
            idToken: tokenId,
            name,
            image,
            description,
            lastBid,
            lastBidder,
            auctioner,
            startTime,
            endTime,
            owner,
            owner_avatar: result,
          };
        })
      );
  
      setAuction(newItems);
      const statusArray = newItems.map(item => item.endTime * 1000 > Date.now());
      setAuctionStatus(statusArray);
  

      localStorage.setItem('auctionData', JSON.stringify(newItems));
    } catch (error) {
      console.log(error);
    }
  };

  console.log(auction);


 

  const {
    isOpen: isOpenModalJoin,
    onOpen: onOpenModalJoin,
    onClose: onCloseModalJoin,
  } = useDisclosure();
  const [placeBid, setPlaceBid] = useState(0);
  const [auctionId, setAuctionId] = useState(0);
  const [lastBid, setLastBid] = useState(0);

  const [loading, setLoading] = useState(false);

  const handleJoinAuction = async () => {

    try {
       // Check auction bid > last bid
       if (Number(placeBid) <= lastBid) {
        toast.warn('Auction price must be greater than last bid!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        return;
      }
      setLoading(true);

      const provider: any = new ethers.providers.Web3Provider(window.ethereum);
      const signer: any = provider.getSigner();
      const auctionContract = new ethers.Contract(
        AuctionAddress.address,
        AuctionAbi,
        signer
      );
      
          const bidAmount = ethers.utils.parseUnits(placeBid.toFixed(18), 'ether'); 

      const joinAuctionTx = await auctionContract.joinAuction(auctionId, {
        value: bidAmount,
        gasLimit: 1000000
      });

      await joinAuctionTx.wait();
      setLoading(false);

      onCloseModalJoin();
      getListAuction()
      toast.success('Join this auction successfully!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    } catch (error) {
      setLoading(false);
      console.error(error);
      onCloseModalJoin();
      toast.error('Join this auction fail!', {
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

  const [imageNFTAuction, setImageNFTAuction] = useState("");
  const handleJoin = (item: any) => {
    onOpenModalJoin();
    console.log(item)
    setAuctionId(item.auctionId);
    setImageNFTAuction(item.image);
    const lastBid = Number(item?.lastBid);
    setLastBid(lastBid);
  };

  console.log(auction)

  

  const handleCountdownComplete = (index: number) => {

     setAuctionStatus((prevStatus:any) => {
      const newStatus = [...prevStatus];
      newStatus[index] = false;
      return newStatus;
    });

  };
  
  console.log(auctionStatus)


  return (
    <>
      <Modal isOpen={isOpenModalJoin} onClose={onCloseModalJoin}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Auction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl>
              <Image
                src={imageNFTAuction.replace(
                  "ipfs://",
                  "https://ipfs.io/ipfs/"
                )}
                loading="lazy"
                alt="image auction"
                width={400}
                height={400}
                objectFit="contain"
                background="#fff"
                border="1px solid #eee"
                borderRadius={10}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Place Bid</FormLabel>
              <Input
                placeholder="Your Place Bid"
                type="number"
                min={0}
                onChange={(e) => setPlaceBid(parseFloat(e.target.value))}
                value={placeBid}
                borderRadius={10}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button style={{ background:"#ae4cff" ,color:"white"}} mr={3} borderRadius={20} padding="20px 30px" onClick={handleJoinAuction}>
               {loading ? (
                 <>
                 <Text style={{ marginRight: "4px" }}>Joining</Text>
                 <Spinner size="sm" />
               </>
               ) : 'Join'} 
            </Button>
            <Button onClick={onCloseModalJoin} borderRadius={20} padding="20px 30px">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className={styles.heading}>Live Auctions 🔥</div>
        <Button
          colorScheme="blue"
          mt={70}
          mb={5}
          style={{
            borderRadius: "20px",
            background: "transparent",
            border: "2px solid #ae4cff",
            color: "#ae4cff",
          }}
        >
          <AiOutlineEye style={{ marginRight: "4px" }} />
          View All Auctions
        </Button>
      </div>

      <div>
        <Slider {...settings}>
          {auction.map((item: any, index: any) => (
            <div key={index}>
              <Card
                className={styles.card}
                style={{
                  boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  margin: "10px",
                }}
              >
                <Image
                  src={item.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                  alt=""
                  style={{
                    borderRadius: "20px",
                    maxHeight: 284,
                    objectFit: "contain",
                    border: "1px solid #ddd",
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "18px",
                      marginTop: "15px",
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      marginTop: "10px",
                    }}
                  >
                    <FaRegHeart />
                  </Text>
                </div>

                <div className={styles.card_body}>
                  <div className={styles.info}>
                    <Image
                      src={item.owner_avatar != "" ? item.owner_avatar : "/u1.jpg"}
                      alt=""
                      width={8}
                      style={{ borderRadius: "50%", marginRight: "6px" }}
                      loading="lazy"
                    />
                    <div>
                      <Text
                        style={{
                          fontSize: "14px",
                          color: "#000",
                          fontWeight: "600",
                        }}
                      >
                        Owner
                      </Text>
                      <Text
                        style={{
                          fontSize: "13px",
                          color: "#222",
                          fontWeight: "600",
                        }}
                      >
                        {item?.auctioner?.substring(0, 5)}...
                      </Text>
                    </div>
                  </div>
                  <div>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      Highest bid
                    </Text>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#484848",
                        fontSize: "13px",
                      }}
                    >
                      {Number(item.lastBid).toFixed(2)} MATIC
                    </Text>
                  </div>
                </div>
                <div>
                  {
                    
                    !auctionStatus[index] ? (
                      <Text
                    style={{
                      fontWeight: "600",
                      width:"200px",
                      color: "white",
                      fontSize: "14px",
                      background: "rgba(0,0,0,0.5)",
                      position: "absolute",
                      top: "30%",
                      left: "50%",
                      padding:"10px 20px",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "20px",
                      textAlign:"center"
                    }}
                  >
                    Auction has ended!
                  </Text>
                    ) : (<></>)
                  }
                  
                </div>
                <div> 
                  {
                    auctionStatus[index] ? (
                      <Text
                    style={{
                      fontWeight: "600",
                      color: "white",
                      fontSize: "18px",
                      background: "rgba(174,76,255,0.8)",
                      position: "absolute",
                      lineHeight: "40px",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      borderRadius: "20px",
                      padding: " 0 30px",
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                    }}
                  >
                    <span>🔥</span>
                    <Countdown
                      date={item?.endTime * 1000}
                      onComplete={() => handleCountdownComplete(index)}
                    />


                    
                    
                  </Text>
                    ) : (<></>)
                  }
                  
                </div>
                {/* <hr style={{ borderColor: "#eee" }} /> */}
                <div className={styles.price}>
                {auctionStatus[index] ? (
                   <Button
                   style={{
                     background: "#ae4cff",
                     color: "#fff",
                     padding: "10px 10px",
                     width: "100%",
                     fontSize: "14px",
                     borderRadius: "20px",
                   }}
                   onClick={() => handleJoin(item)}
                 >
                   🔥 Join Auction
                 </Button>
                ) : (
                  <Button
                  disabled={true}
                  colorScheme="yellow"
                   style={{
                      background:"transparent",
                     color: "black",
                     padding: "10px 10px",
                     width: "100%",
                     fontSize: "14px",
                     borderRadius: "20px",
                     cursor:"default",
                     border:"1px solid black"
                   }}>
                    {
                      item?.lastBidder != "0x0000000000000000000000000000000000000000" ? (
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center", }}>

                      <Image
                      src="/winner.png"
                      alt=""
                      width={6}
                      style={{ borderRadius: "50%", marginRight: "6px", marginTop:"-4px" }}
                      loading="lazy"
                    />
                          <span> Winner is  <span style={{color:"red"}}>{item?.lastBidder?.substring(0, 5) +
                          "..." +
                          item?.lastBidder?.substring(38)}</span></span>
                        </div>
                       
                      )  : "No one has joined"
                    }
                    
                   </Button>
                )}
                 
                </div>
              </Card>
            </div>
          ))}
         
        </Slider>
      </div>
    </>
  );
};

export default Auction;
