"use client";
import { Button, Card, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import React, { use, useEffect, useState } from "react";
import styles from "../styles/auction.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ethers } from "ethers";
import MarketplaceAbi from "@/datasmc/abi/marketplaceAbi.json";
import MarketplaceAddress from "@/datasmc/address/marketplaceAddress.json";
import NFTAbi from "@/datasmc/abi/nftAbi.json";
import NFTAddress from "@/datasmc/address/nftAddress.json";
import AuctionAbi from "@/datasmc/abi/auctionAbi.json";
import AuctionAddress from "@/datasmc/address/auctionAdress.json";
import axios from "axios";
import Countdown from "react-countdown";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
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
    const getListAuction = async () => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(
          "https://polygon-mumbai.infura.io/v3/4cd2c1a8018646908347fb2223053b30"
        );
        const auctionContract = new ethers.Contract(
          AuctionAddress.address,
          AuctionAbi,
          provider
        );
        const nft: any = new ethers.Contract(
          NFTAddress.address,
          NFTAbi,
          provider
        );

        const createAuction = await auctionContract.getAuctionByStatus(true);
        const newItems: any[] = [];

        for (let i = 0; i < createAuction.length; i++) {
          const tokenId = createAuction[i]?._tokenId.toNumber();
          const auctionId = createAuction[i]?.auctionId.toNumber();
          const startTime = createAuction[i]?.startTime.toNumber();
          const endTime = createAuction[i]?.endTime.toNumber();

          const tokenURI = await nft.tokenURI(tokenId);
          const response = await axios.get(tokenURI);
          const owner = await nft.ownerOf(tokenId);

          const { name, image, description, price } = response.data;

          const newItem: any = {
            auctionId: auctionId,
            idToken: tokenId,
            name,
            image,
            description,
            price,
            startTime: startTime,
            endTime: endTime,
            ower: owner
          };
          newItems.push(newItem);
        }
        setAuction(newItems);

        
      } catch (error) {
        console.log(error);
      }
    };

    getListAuction();
  }, []);

  console.log(auction);

  const { isOpen: isOpenModalJoin, onOpen: onOpenModalJoin, onClose: onCloseModalJoin } = useDisclosure();
const [placeBid, setPlaceBid] = useState(0);
const [auctionId, setAuctionId] = useState(0);

const toast = useToast();

const handleJoinAuction = async () => {
  console.log(placeBid)
  console.log(auctionId)
  try {
    const provider: any = new ethers.providers.Web3Provider(window.ethereum);
    const signer: any = provider.getSigner();
    const auctionContract = new ethers.Contract(
      AuctionAddress.address,
      AuctionAbi,
      signer
    );

    const placeBidInWei = ethers.utils.parseUnits(placeBid.toString(), 'ether');
    const joinAuctionTx = await auctionContract.joinAuction(
      auctionId,
      placeBidInWei,
      { gasLimit: 1000000 }
    );

    await joinAuctionTx.wait();

    console.log("Join aution this nft successful!");
    onCloseModalJoin();
    toast({
      title: 'Successfully',
      description: 'Join this auction successfully !',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  } catch (error) {
    console.error(error);
    onCloseModalJoin();
    toast({
      title: 'Join auction',
      description: 'Join this auction fail !',
      status: 'error',
      duration: 2000,
      isClosable: true,
      position: 'top',
    });
  }
};

const handleJoin = (item:any) => {
  onOpenModalJoin();
  setAuctionId(item.auctionId)
}

  return (
    <>
     <Modal
        isOpen={isOpenModalJoin}
        onClose={onCloseModalJoin}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Join Auction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Place Bid</FormLabel>
              <Input placeholder='Your Place Bid'type="number" max="1" onChange={(e) => setPlaceBid(parseFloat(e.target.value))} value={placeBid}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleJoinAuction}>
              Join
            </Button>
            <Button onClick={onCloseModalJoin}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
      <div className={styles.heading}>Live Auctions 🔥</div>
      <Button colorScheme='blue' mt={70} mb={5} style={{borderRadius:"20px",background:"transparent", border:"2px solid #ae4cff", color:"#ae4cff"}}>
          <AiOutlineEye style={{ marginRight: "4px" }} />
            View All Auctions
      </Button>
      </div>
    
      <div>
        <Slider {...settings}>
          {auction.map((item: any, index:any) => (
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
                  style={{ borderRadius: "20px", maxHeight:284, objectFit:"contain", border:"1px solid #ddd" }}
                  loading="lazy"
                />
                <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
               
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
                      <Text style={{ fontWeight: "600", color: "#484848", marginTop:"10px" }}>
                      
                      <FaRegHeart />
                    </Text>
                </div>
                
                <div className={styles.card_body}>
                <div className={styles.info}>
                    <Image
                      src="/u1.jpg"
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
                        0xf14...
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
                      {item.price} ETH
                    </Text>
                  </div>
                 
                </div>
                <div>
                  
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "white",
                        fontSize: "18px",
                        background:"rgba(174,76,255,0.8)",
                        position:"absolute",
                        lineHeight:"40px",
                        top: "50%",
                        left:"50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "20px",
                        padding:" 0 30px",
                        display:'flex',
                        gap: 4,
                        alignItems:"center"
                      }}
                    >
                      <span>🔥</span>
                      <Countdown
                            date={item?.endTime * 1000}
                            
                            // onComplete={() => alert('Time is up!')}
                          />
                    </Text>
                    
                  </div>
                {/* <hr style={{ borderColor: "#eee" }} /> */}
                <div className={styles.price}>
              

                  
                  <Button style={{
                      background: "#ae4cff",
                      color: "#fff",
                      padding:"10px 10px",
                      width:"100%",
                      fontSize:"14px",
                      borderRadius:"20px"
                    }} onClick={()=>handleJoin(item)}>
                     🔥 Join Auction
                  </Button>
                </div>
              </Card>
            </div>
          ))}
           <div>
              <Card
                className={styles.card}
                style={{
                  boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  margin: "10px",
                }}
              >
                <Image
                  src="/image/9.jpg"
                  alt=""
                  style={{ borderRadius: "20px", maxHeight:284, objectFit:"contain", border:"1px solid #ddd" }}
                  loading="lazy"
                />
                <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
               
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#484848",
                        fontSize: "18px",
                        marginTop: "15px",
                      }}
                    >
                      Fancy Car
                    </Text>
                      <Text style={{ fontWeight: "600", color: "#484848", marginTop:"10px" }}>
                      
                      <FaRegHeart />
                    </Text>
                </div>
                
                <div className={styles.card_body}>
                <div className={styles.info}>
                    <Image
                      src="/u1.jpg"
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
                        0xf14...
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
                      0.03 ETH
                    </Text>
                  </div>
                 
                </div>
                <div>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "white",
                        fontSize: "18px",
                        background:"rgba(174,76,255,0.8)",
                        position:"absolute",
                        lineHeight:"40px",
                        top: "50%",
                        left:"50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "20px",
                        padding:" 0 30px",
                        display:'flex',
                        gap: 4,
                        alignItems:"center"
                      }}
                    >
                      <span>🔥</span>
                   01:08:45:20
                    </Text>
                  </div>
                {/* <hr style={{ borderColor: "#eee" }} /> */}
                <div className={styles.price}>
              

                  
                  <Button style={{
                      background: "#ae4cff",
                      color: "#fff",
                      padding:"10px 10px",
                      width:"100%",
                      fontSize:"14px",
                      borderRadius:"20px"
                    }}>
                     🔥 Join Auction
                  </Button>
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
                <Image
                  src="/image/10.jpg"
                  alt=""
                  style={{ borderRadius: "20px", maxHeight:284, objectFit:"contain", border:"1px solid #ddd" }}
                  loading="lazy"
                />
                <div style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
               
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "#484848",
                        fontSize: "18px",
                        marginTop: "15px",
                      }}
                    >
                      Animal Playing
                    </Text>
                      <Text style={{ fontWeight: "600", color: "#484848", marginTop:"10px" }}>
                      
                      <FaRegHeart />
                    </Text>
                </div>
                
                <div className={styles.card_body}>
                <div className={styles.info}>
                    <Image
                      src="/u1.jpg"
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
                        0xf14...
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
                      0.02 ETH
                    </Text>
                  </div>
                 
                </div>
                <div>
                    <Text
                      style={{
                        fontWeight: "600",
                        color: "white",
                        fontSize: "18px",
                        background:"rgba(174,76,255,0.8)",
                        position:"absolute",
                        lineHeight:"40px",
                        top: "50%",
                        left:"50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "20px",
                        padding:" 0 30px",
                        display:'flex',
                        gap: 4,
                        alignItems:"center"
                      }}
                    >
                      <span>🔥</span>
                      06:03:20:10
                    </Text>
                  </div>
                {/* <hr style={{ borderColor: "#eee" }} /> */}
                <div className={styles.price}>
              

                  
                  <Button style={{
                      background: "#ae4cff",
                      color: "#fff",
                      padding:"10px 10px",
                      width:"100%",
                      fontSize:"14px",
                      borderRadius:"20px"
                    }}>
                     🔥 Join Auction
                  </Button>
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
              <Image
                src="/image/3.jpg"
                alt=""
                style={{ borderRadius: "20px" }}
                loading="lazy"
              />
              <Text
                style={{
                  fontWeight: "600",
                  color: "#484848",
                  fontSize: "18px",
                  marginTop: "15px",
                }}
              >
                Micraft1
              </Text>
              <div className={styles.card_body}>
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
                    0.01 ETH
                  </Text>
                </div>
                <div>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    Ends in
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "13px",
                    }}
                  >
                    05:18:20:38
                  </Text>
                </div>
              </div>
              <hr style={{ borderColor: "#eee" }} />
              <div className={styles.price}>
                <div className={styles.info}>
                  <Image
                    src="/image/avata2.avif"
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
                      Creator
                    </Text>
                    <Text
                      style={{
                        fontSize: "13px",
                        color: "#222",
                        fontWeight: "600",
                      }}
                    >
                      0xf14...
                    </Text>
                  </div>
                </div>

                <div className={styles.info}>
                  <Image
                    src="/image/avata2.avif"
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
                      0xf14...
                    </Text>
                  </div>
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
              <Image
                src="/image/phanta1.png"
                alt=""
                style={{ borderRadius: "20px" }}
                loading="lazy"
              />
              <Text
                style={{
                  fontWeight: "600",
                  color: "#484848",
                  fontSize: "18px",
                  marginTop: "15px",
                }}
              >
                {" "}
                Phanta Bear
              </Text>
              <div className={styles.card_body}>
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
                    0.04 ETH
                  </Text>
                </div>
                <div>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    Ends in
                  </Text>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: "#484848",
                      fontSize: "13px",
                    }}
                  >
                    03:10:26:17
                  </Text>
                </div>
              </div>
              <hr style={{ borderColor: "#eee" }} />
              <div className={styles.price}>
                <div className={styles.info}>
                  <Image
                    src="/image/avata2.avif"
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
                      Creator
                    </Text>
                    <Text
                      style={{
                        fontSize: "13px",
                        color: "#222",
                        fontWeight: "600",
                      }}
                    >
                      0xf14...
                    </Text>
                  </div>
                </div>

                <div className={styles.info}>
                  <Image
                    src="/image/avata2.avif"
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
                      0xf14...
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          </div>

        </Slider>
      </div>
    </>
  );
};

export default Auction;
