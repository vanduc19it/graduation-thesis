/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "../../styles/profile.module.scss";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRegHeart,
  FaTwitter,
} from "react-icons/fa";
import { ethers } from "ethers";
import MarketplaceAbi from "@/datasmc/abi/marketplaceAbi.json";
import MarketplaceAddress from "@/datasmc/address/marketplaceAddress.json";
import NFTAbi from "@/datasmc/abi/nftAbi.json";
import NFTAddress from "@/datasmc/address/nftAddress.json";
import AuctionAbi from "@/datasmc/abi/auctionAbi.json";
import AuctionAddress from "@/datasmc/address/auctionAdress.json";
import axios from "axios";
declare var window: any;
import Countdown from "react-countdown";
import { SearchContext } from "@/components/SearchContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { BiUpload } from "react-icons/bi";
import { AiOutlineEllipsis } from "react-icons/ai";
import { toast } from 'react-toastify';

const Profile = () => {
  interface NFT {
    idToken: number;
    name: string;
    image: string;
    description: string;
    price: number;
  }

  const { isLoggedIn, handleConnect1 } = useContext(SearchContext);
  const [address, setAddress] = useState("");
  const [nftCreated, setNftCreated] = useState<NFT[]>([]);
  const [nftListing, setNftListing] = useState<NFT[]>([]);
  const [nftPurchased, setNftPurchased] = useState<NFT[]>([]);
  const [nftLiked, setNftLiked] = useState<NFT[]>([]);
  const [user, setUser] = useState<any>("");

  useEffect(() => {
    try {
      const addressData: any = localStorage.getItem("address");
      setAddress(addressData);
      if (addressData?.length > 0) {
        handleConnect1(true);
        handleGetUser(addressData);
      } else {
        setUser("");
      }
    } catch (error) {
      console.log(error);
    }
  }, [isLoggedIn]);

  const handleLoadNFT = async () => {
    try {
      if (typeof window !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        const provider: any = new ethers.providers.JsonRpcProvider(
          "https://polygon-mumbai.infura.io/v3/4cd2c1a8018646908347fb2223053b30"
        );

        const nft = new ethers.Contract(NFTAddress.address, NFTAbi, provider);

        const marketplace = new ethers.Contract(
          MarketplaceAddress.address,
          MarketplaceAbi,
          provider
        );

        if (nft && marketplace && accounts) {
          console.log("abcb");
          try {
            //created nft
            const myNftCreated = await nft.getNFTsByOwner(accounts[0]);
            const CreatedResults: any = await Promise.all(
              myNftCreated.map(async (item: any) => {
                const tokenURI = await nft.tokenURI(item.toNumber());
                const response = await axios.get(tokenURI);
                const { name, image, description, price } = response.data;
                const createdItem: NFT = {
                  idToken: item.toNumber(),
                  name,
                  image,
                  description,
                  price,
                };
                return createdItem;
              })
            );

            console.log(CreatedResults, "CreatedResults");
            setNftCreated(CreatedResults);
            localStorage.setItem("nftCreated", JSON.stringify(CreatedResults));

            //listing nft:
            const myNftListing = await marketplace.getListingsByOwner(
              accounts[0]
            );
            const ListingResults: any = await Promise.all(
              myNftListing.map(async (item: any) => {
                const uri = await nft.tokenURI(item.tokenId);
                const response = await fetch(uri);
                const metadata = await response.json();
                const totalPrice = await marketplace.getTotalPrice(item.itemId);

                const listingItem = {
                  totalPrice,
                  itemId: item.itemId.toNumber(),
                  seller: item.seller,
                  name: metadata.name,
                  description: metadata.description,
                  image: metadata.image,
                  price: metadata.price,
                };

                return listingItem;
              })
            );

            console.log(ListingResults, "ListingResults");
            setNftListing(ListingResults);
            localStorage.setItem("nftListing", JSON.stringify(ListingResults));

            //purchased nft
            const myNftPurchased = await marketplace.getPurchasedItems(
              accounts[0]
            );
            const PurchasedResults: any = await Promise.all(
              myNftPurchased.map(async (item: any) => {
                const uri = await nft.tokenURI(item.tokenId);
                const response = await fetch(uri);
                const metadata = await response.json();
                const totalPrice = await marketplace.getTotalPrice(item.itemId);
                let purchasedItem = {
                  totalPrice,
                  price: metadata.price,
                  itemId: item.itemId.toNumber(),
                  name: metadata.name,
                  description: metadata.description,
                  image: metadata.image,
                };
                return purchasedItem;
              })
            );

            console.log(PurchasedResults, "PurchasedResults");
            setNftPurchased(PurchasedResults);
            localStorage.setItem(
              "nftPurchased",
              JSON.stringify(PurchasedResults)
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const nftCreatedLocal: any = localStorage.getItem("nftCreated");
    const nftCreatedData: any = nftCreatedLocal
      ? JSON.parse(nftCreatedLocal)
      : [];
    setNftCreated(nftCreatedData);

    const nftListingLocal: any = localStorage.getItem("nftListing");
    const nftListingData: any = nftListingLocal
      ? JSON.parse(nftListingLocal)
      : [];
    setNftListing(nftListingData);

    const nftPurchasedLocal: any = localStorage.getItem("nftPurchased");
    const nftPurchasedData: any = nftPurchasedLocal
      ? JSON.parse(nftPurchasedLocal)
      : [];
    setNftPurchased(nftPurchasedData);

    handleLoadNFT();
  }, []);

  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
  const [tx, setTx] = useState("");
  const [open, setOpen] = useState(false);

  //listing nft qua marketplace smc để bán
  const handleListForSale = async (item: any) => {
    if (!isLoggedIn) {
      alert("Please connect your metamask wallet! ");
    } else {
      try {
        setLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [item.idToken]: true,
        }));

        const provider: any = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer: any = provider.getSigner();
        var nft = new ethers.Contract(NFTAddress.address, NFTAbi, signer);
        var marketplace = new ethers.Contract(
          MarketplaceAddress.address,
          MarketplaceAbi,
          signer
        );

        await (await nft.setApprovalForAll(marketplace.address, true)).wait();
        const listingPrice = ethers.utils.parseEther(item.price.toString());

        const tx = await (
          await marketplace.makeItem(nft.address, item.idToken, listingPrice)
        ).wait();

        if (tx) {
          setTx(tx?.transactionHash);
          onOpen1()
          setLoadingMap((prevLoadingMap) => ({
            ...prevLoadingMap,
            [item.idToken]: false,
          }));
        }
      } catch (error) {
        console.log(error);
        setLoadingMap((prevLoadingMap) => ({
          ...prevLoadingMap,
          [item.idToken]: false,
        }));
      }
    }
  };

  const handleGetUser = async (addressWallet: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/get_user/${addressWallet}`
      );
      const data = response.data;
      console.log(data.user);
      setUser(data.user);
      setNftLiked(data.user.favorites);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [imageNFTAuction, setImageNFTAuction] = useState("");
  const [timeExpireAuction, setTimeExpireAuction] = useState("");
  const [priceAuction, setPriceAuction] = useState("");
  const [idNFTAuction, setIdNFTAuction] = useState(1);
  const handleAuction = (item: any) => {
    onOpen();
    setImageNFTAuction(item.image);
    setIdNFTAuction(item.idToken);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [count, setCount] = useState(1);

  const [loading, setLoading] = useState(false);



  const handleCreateAuction = async () => {
    try {
     
      // Check auction price > 0
      if (Number(priceAuction) <= 0) {
        toast.warn('Auction price must be greater than 0!', {
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

      

      // Check expiration time > start time
      const currentTime = Math.round(new Date().getTime() / 1000);
      if(timeExpireAuction != "") {
        const expireTime = Math.round(new Date(timeExpireAuction).getTime() / 1000);
        if (expireTime <= currentTime) {
          toast.warn('Expiration time must be greater than the current time!', {
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
      } else {
        toast.warn("Expiration time not selected yet!", {
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
      const nft: any = new ethers.Contract(NFTAddress.address, NFTAbi, signer);
      const auctionContract = new ethers.Contract(
        AuctionAddress.address,
        AuctionAbi,
        signer
      );
      console.log(auctionContract);
      // auctionContract.createAuction(id, price, Date.now(), end)
      console.log(
        idNFTAuction,
        Number(priceAuction),
        Math.round(new Date().getTime() / 1000 + 60),
        Math.round(new Date(timeExpireAuction).getTime() / 1000)
      );
      await (await nft.approve(auctionContract.address, idNFTAuction)).wait();
      const createAuction = await auctionContract.createAuction(
        idNFTAuction,
        ethers.utils.parseUnits(priceAuction),
        Math.round(new Date().getTime() / 1000 + 60),
        Math.round(new Date(timeExpireAuction).getTime() / 1000),
        { gasLimit: 1000000 }
      );
      console.log(createAuction);
      if(createAuction?.hash) {
        setCount(count + 1);
        setLoading(false);
        onClose();

        setTx(createAuction?.hash);
        onOpen2();
      }
    
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const [nftAuction, setNftAuction] = useState<any[]>([]);
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
          const tokenId = createAuction[i]?.tokenId.toNumber();
        const auctionId = createAuction[i]?.auctionId.toNumber();
        const startTime = createAuction[i]?.startTime.toNumber();
        const endTime = createAuction[i]?.endTime.toNumber();
        const lastBidder = createAuction[i]?.lastBidder;
        const auctioner= createAuction[i]?.auctioneer;          ;

        const tokenURI = await nft.tokenURI(tokenId);
        const response = await axios.get(tokenURI);
        const owner = await nft.ownerOf(tokenId);

        const { name, image, description } = response.data;
        const lastBid = ethers.utils.formatUnits(createAuction[i]?.lastBid, 'ether')

        const newItem: any = {
          auctionId: auctionId,
          idToken: tokenId,
          name,
          image,
          description,
          lastBid,
          lastBidder,
          auctioner,
          startTime: startTime,
          endTime: endTime,
          owner: owner,
        };
          newItems.push(newItem);
        }
        setNftAuction([]);
        setNftAuction((prevItems) => [...prevItems, ...newItems]);
      } catch (error) {
        console.log(error);
      }
    };

    getListAuction();
  }, [count]);

  console.log(nftAuction, "List nft aution");

  const router = useRouter();
  const handleViewTx = () => {
    setOpen(false);
    onClose();
    router.push(`https://mumbai.polygonscan.com/tx/${tx}`);
  };

  const [cancellingItems, setCancellingItems] = useState<string[]>([]);
  //xử lý hủy đấu giá
  const handleCancelAuction = async (auctionId: any) => {
    try {
      setCancellingItems((prevItems) => [...prevItems, auctionId]);
      const provider: any = new ethers.providers.Web3Provider(window.ethereum);
      const signer: any = provider.getSigner();
      const auctionContract = new ethers.Contract(
        AuctionAddress.address,
        AuctionAbi,
        signer
      );
      const cancelAuctionTx = await auctionContract.cancelAuction(
        ethers.BigNumber.from(auctionId),
        { gasLimit: 1000000 }
      );
  
      await cancelAuctionTx.wait();

      toast.success('Cancel aution this nft successful!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setCancellingItems((prevItems) =>
        prevItems.filter((item) => item !== auctionId)
      );

      setCount(count + 1);

    } catch (error) {
      setCancellingItems((prevItems) =>
      prevItems.filter((item) => item !== auctionId)
    );
      toast.error('Cancel aution this nft fail!', {
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

  function formatJoinedDate(created_at: any) {
    const joinedDate = new Date(created_at);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[joinedDate.getMonth()];
    const year = joinedDate.getFullYear();

    return `Joined ${month} ${year}`;
  }

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef1 = useRef<HTMLInputElement | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [loadingImage1, setLoadingImage1] = useState(false);


  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db1kgikl");
    if (file) {
      try {
        setLoadingImage(true);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/do2kg3dtf/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data) {
          try {
            const response = await axios.put(
              `http://localhost:5000/update_avatar/${address}`,
              {
                new_avatar: data.secure_url,
              }
            );

            console.log(response.data);
            await handleGetUser(address);
            setLoadingImage(false);

            toast.success('Successfully updated profile picture!', {
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
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleFileChangeCover = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "db1kgikl");
    if (file) {
      try {
        setLoadingImage1(true);
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/do2kg3dtf/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data) {
          try {
            const response = await axios.put(
              `http://localhost:5000/update_cover_photo/${address}`,
              {
                new_cover_photo: data.secure_url,
              }
            );

            console.log(response.data);
            await handleGetUser(address);
            setLoadingImage1(false);

            toast.success('Your cover picture has been updated successfully!', {
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
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const {
    isOpen: isOpenModalName,
    onOpen: onOpenModalName,
    onClose: onCloseModalName,
  } = useDisclosure();
  const [userName, setUserName] = useState("");

  const handleUpdateUsername = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/update_username/${address}`,
        {
          new_username: userName,
        }
      );

      console.log(response.data);
      await handleGetUser(address);
      onCloseModalName();
      toast.success('Successfully updated username!', {
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
      console.error(error);
    }
  };


   const [finishedAuction, setFinishedAuction] = useState(false);


   const handleFinishAuction = async(auctionId: any) => {
    try {
      setCancellingItems((prevItems) => [...prevItems, auctionId]);
      const provider: any = new ethers.providers.Web3Provider(window.ethereum);
      const signer: any = provider.getSigner();
      const auctionContract = new ethers.Contract(
        AuctionAddress.address,
        AuctionAbi,
        signer
      );


      // Gọi hàm finishAuction
      const transaction = await auctionContract.finishAuction(auctionId);
      
      // Đợi giao dịch được xác nhận
      await transaction.wait();

      console.log(transaction);
      toast.success(' Send Auction NFT to ... successfully', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        setCancellingItems((prevItems) =>
        prevItems.filter((item) => item !== auctionId)
      );
    } catch (error) {
      setCancellingItems((prevItems) =>
        prevItems.filter((item) => item !== auctionId)
      );
      toast.error('Error finishing send auction nft!', {
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
  

  return (
    <>
      <Modal closeOnOverlayClick={true} isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent style={{ textAlign: "center" }}>
          <ModalHeader>LIST NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text style={{ fontStyle: "italic" }}>
              (Listed your nft successfully)
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
      <Modal closeOnOverlayClick={true} isOpen={isOpen2} onClose={onClose2}>
        <ModalOverlay />
        <ModalContent style={{ textAlign: "center" }}>
          <ModalHeader>AUCTION NFT</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text style={{ fontStyle: "italic" }}>
              (Auction this nft successfully)
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
      {/* modal auction */}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new auction</ModalHeader>
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
              <FormLabel>Price auction</FormLabel>
              <Input
                type="number"
                ref={initialRef}
                borderRadius={10}
                placeholder="0"
                min={0}
                onChange={(e: any) => setPriceAuction(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Expiration date</FormLabel>
              <Input
                type="datetime-local"
                onChange={(e) => setTimeExpireAuction(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button style={{ background:"#ae4cff" ,color:"white"}} mr={3} borderRadius={20} padding="20px 30px" onClick={handleCreateAuction}>
              {loading ? (
                 <>
                 <Text style={{ marginRight: "4px" }}>Creating</Text>
                 <Spinner size="sm" />
               </>
               ) : 'Create'} 
            </Button>
            <Button onClick={onClose} borderRadius={20} padding="20px 30px">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenModalName} onClose={onCloseModalName}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your username</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Enter username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateUsername}>
              Save
            </Button>
            <Button onClick={onCloseModalName}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className={styles.header}>
        <Navbar />
      </div>

      <div>
        <div style={{ margin: "0 -70px", position: "relative" }}>
          <div
            className={styles["cover-container"]}
            style={{ width: "100%", height: "300px" }}
          >
            {loadingImage1 ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                  margin="150px auto"
                />
              </div>
            ) : (
              <>
                <Image
                  className={styles.nft_img}
                  src={
                    user == "" || user?.cover_photo == ""
                      ? "/image/cover.jpg"
                      : user.cover_photo
                  }
                  alt="background"
                  loading="lazy"
                  style={{
                    backgroundImage: "cover",
                    width: "100%",
                    height: "300px",
                  }}
                />
                <div
                  className={styles["edit-icon-cover"]}
                  onClick={() => inputRef1.current!.click()}
                >
                  <MdOutlineEdit />
                </div>

                <Input
                  type="file"
                  accept="image/*"
                  display="none"
                  onChange={handleFileChangeCover}
                  ref={inputRef1}
                />
              </>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "80%",
                height: "230px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                position: "absolute",
                marginTop: "-100px",
                background: "white",
                borderRadius: "30px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "156px",
                  margin: "auto 0 auto 40px",
                  height: "156px",
                  boxShadow: "0px 0px 4px #ccc ",
                  borderRadius: "30px ",
                  zIndex: "10",
                  position: "relative",
                  background: "white",
                }}
                className={styles["image-container"]}
              >
                {" "}
                {loadingImage ? (
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                ) : (
                  <>
                    <Image
                      className={styles.nft_img}
                      src={
                        user == "" || user?.avatar == ""
                          ? "/image/avatar-default-icon.png"
                          : user.avatar
                      }
                      alt="avatar"
                      loading="lazy"
                      style={{
                        borderRadius: "20px",
                        width: "150px",
                        height: "150px",
                      }}
                    />
                    <div
                      className={styles["edit-icon"]}
                      onClick={() => inputRef.current!.click()}
                    >
                      <MdOutlineEdit />
                    </div>

                    <Input
                      type="file"
                      accept="image/*"
                      display="none"
                      onChange={handleFileChange}
                      ref={inputRef}
                    />
                  </>
                )}
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Text
                      style={{
                        fontSize: "24px",
                        fontWeight: "600",
                        marginBottom: "4px",
                        marginLeft: 20,
                      }}
                    >
                      {user !== "" ? user?.name : "Unnamed"}
                    </Text>
                    <div onClick={onOpenModalName}>
                      <MdOutlineEdit
                        style={{
                          fontSize: "22",
                          marginBottom: "4px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      position: "absolute",
                      right: 40,
                    }}
                  >
                    <Button
                      style={{
                        borderRadius: "20px",
                        background: "#ae4cff",
                        color: "white",
                      }}
                    >
                      Edit
                    </Button>
                    <span
                      style={{
                        display: "flex",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50px",
                        background: "#ddd",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BiUpload />
                    </span>

                    <span
                      style={{
                        display: "flex",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50px",
                        background: "#ddd",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AiOutlineEllipsis />
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex" }}>
                  {address !== "" ? (
                    <>
                      <Image
                        className={styles.nft_img}
                        src="/eth.png"
                        alt="coin icon"
                        loading="lazy"
                        style={{ height: "20px", marginLeft: "15px" }}
                      />
                      <Text
                        style={{
                          color: "#484848",
                          marginRight: "14px",
                          marginLeft: "2px",
                        }}
                      >
                        {address?.substring(0, 6) +
                          "..." +
                          address?.substring(38)}
                      </Text>
                      <Text style={{ color: "#6d6d6d" }}>
                        {formatJoinedDate(user?.created_at)}
                      </Text>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  style={{
                    marginLeft: "20px",
                    width: "500px",
                    fontSize: "14px",
                    fontStyle: "italic",
                    marginTop: "5px",
                  }}
                >
                  <Text>
                    I make art with the simple goal of giving you something
                    pleasing to look at for a few seconds.
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginLeft: "20px",
                    marginTop: "5px",
                    color: "#ae4cff",
                  }}
                >
                  <FaFacebook />
                  <FaTwitter />
                  <FaLinkedin />
                  <FaInstagram />
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs style={{ border: "white", marginTop: "180px" }}>
          <TabList style={{ marginTop: "22px" }}>
            <Tab
              style={{
                fontWeight: "500",
                fontSize: "16px",
                background: "#ae4cff",
                borderRadius: "30px",
                color: "white",
                marginRight: "10px",
                boxShadow: "0 4px 8px 2px rgba(0, 0, 0, 0.1)",
              }}
            >
              Created {nftCreated.length}
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
              Listing {nftListing.length}
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
              Purchased {nftPurchased.length}
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
              Live Auctions {nftAuction.length}
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
              Favorited {nftLiked.length}
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {/* created by user */}
              <div className={styles.container}>
                {nftCreated.length > 0 &&
                  nftCreated.map((item: any, id) => (
                    <Card
                      className={styles.card}
                      style={{
                        boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                        borderRadius: "20px",
                      }}
                      key={id}
                    >
                      <Image
                        src={item.image.replace(
                          "ipfs://",
                          "https://ipfs.io/ipfs/"
                        )}
                        alt="image nft"
                        loading="lazy"
                        style={{
                          width: 270,
                          height: 270,
                          objectFit: "contain",
                          background: "#fff",
                          border: "1px solid #eee",
                          borderRadius: "20px",
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
                          {item.name}
                        </Text>
                        <Text style={{ fontWeight: "600", color: "#484848" }}>
                          <FaRegHeart />
                        </Text>
                      </div>
                      <hr style={{ borderColor: "#eee" }} />
                      <div className={styles.price}>
                        <Button
                          style={{
                            background: "#ae4cff",
                            color: "white",
                            borderRadius: "20px",
                          }}
                          onClick={() => handleListForSale(item)}
                        >
                          {!loadingMap[item.idToken] ? (
                            "List for sale"
                          ) : (
                            <>
                              <Text style={{ marginRight: "4px" }}>
                                Listing
                              </Text>{" "}
                              <Spinner size="sm" />
                            </>
                          )}
                        </Button>
                        <Button
                          style={{
                            background: "#ea0061",
                            color: "white",
                            borderRadius: "20px",
                          }}
                          onClick={() => handleAuction(item)}
                        >
                          Auction
                        </Button>
                      </div>
                      <div className={styles.button_buy}>
                       
                      </div>
                    </Card>
                  ))}
              </div>
            </TabPanel>

            <TabPanel>
              {/* listing to sale*/}
              <div className={styles.container}>
                {nftListing.length > 0 &&
                  nftListing.map((item: any, id) => (
                    <Card
                      className={styles.card}
                      style={{
                        boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                        borderRadius: "2px",
                      }}
                      key={id}
                    >
                      <Link
                        href={`/productDetail/${ethers.BigNumber.from(
                          item.itemId
                        ).toNumber()}`}
                      >
                        <Image
                          src={item.image.replace(
                            "ipfs://",
                            "https://ipfs.io/ipfs/"
                          )}
                          alt="image nft"
                          loading="lazy"
                          style={{
                            width: 270,
                            height: 270,
                            objectFit: "contain",
                            background: "#fff",
                            border: "1px solid #eee",
                          }}
                          className={styles.image_nft}
                        />
                      </Link>
                      <div className={styles.card_body}>
                        <Text
                          style={{
                            fontWeight: "600",
                            color: "#484848",
                            fontSize: "18px",
                          }}
                        >
                          {item.name}
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
                          style={{
                            fontSize: "14px",
                            color: "#222",
                            fontWeight: "600",
                          }}
                        >
                          {item.price} ETH
                        </Text>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabPanel>
            {/* purchased */}
            <TabPanel>
              <div className={styles.container}>
                {nftPurchased.length > 0 &&
                  nftPurchased.map((item: any, id) => (
                    <Card
                      className={styles.card}
                      style={{
                        boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                        borderRadius: "2px",
                      }}
                      key={id}
                    >
                      <Image
                        src={item.image.replace(
                          "ipfs://",
                          "https://ipfs.io/ipfs/"
                        )}
                        alt="image nft"
                        loading="lazy"
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
                          {item.name}
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
                          style={{
                            fontSize: "14px",
                            color: "#222",
                            fontWeight: "600",
                          }}
                        >
                          {item.price} ETH
                        </Text>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabPanel>
            {/* live auction */}
            <TabPanel>
              <div className={styles.container}>
                {nftAuction.length > 0 &&
                  nftAuction.map((item: any, id) => (
                    <Card
                      className={styles.card2}
                      style={{
                        boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                        borderRadius: "20px",
                      }}
                      key={id}
                    >
                      <Image
                        src={item.image.replace(
                          "ipfs://",
                          "https://ipfs.io/ipfs/"
                        )}
                        alt="image nft"
                        loading="lazy"
                        style={{
                          width: 270,
                          height: 270,
                          objectFit: "contain",
                          background: "#fff",
                          border: "1px solid #eee",
                          borderRadius: "20px",
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
                          {item.name}
                        </Text>
                        <Text style={{ fontWeight: "600", color: "#484848" }}>
                          <FaRegHeart />
                        </Text>
                      </div>
                      <div> 
                  {
                    item.endTime * 1000 <= Date.now() ? (
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
                      <hr style={{ borderColor: "#eee" }} />
                      <div className={styles.price}>
                        <Text
                          style={{
                            fontSize: "14px",
                            color: "#909090",
                            marginBottom: "4px",
                          }}
                        >
                          Highest bid
                        </Text>
                        <Text
                          style={{
                            fontSize: "14px",
                            color: "#222",
                            fontWeight: "600",
                          }}
                        >
                          {Number(item.lastBid).toFixed(2)} ETH
                        </Text>
                      </div>
                      <div className={styles.button_buy}>
                        {
                           item.endTime * 1000 <= Date.now() ? (
                            <>
                            <Button
                            style={{
                              background:"#fff",
                              border: "1px solid black",
                              color: "#000",
                              borderRadius: "20px",
                              fontSize:'14px',
                              cursor:"default"
                            }}
                            variant="outline"
                           
                          >
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
                          <span style={{fontSize:"12px", color:"black"}}> Winner is  <span style={{color:"red"}}>{item?.lastBidder?.substring(0, 3) +
                          "..." +
                          item?.lastBidder?.substring(40)}</span></span>
                        </div>
                       
                      )  : "No one has joined"
                    }
                          </Button>
                          {
                             item?.lastBidder != "0x0000000000000000000000000000000000000000" ? 
                             (
                              <Button
                              style={{
                                background: "#4287f5",
                                color: "white",
                                borderRadius: "20px",
                              }}
                              isLoading={cancellingItems.includes(item.auctionId)} 
                              onClick={() => handleFinishAuction(item.auctionId)}
                            >
   
                              Send
                            </Button>
                             ) : 
                             (
                              <Button
                              style={{
                                background: "#ea0061",
                                color: "white",
                                borderRadius: "20px",
                              }}
                              isLoading={cancellingItems.includes(item.auctionId)} 
                              onClick={() => handleCancelAuction(item.auctionId)}
                            >
   
                              Cancel
                            </Button>
                             )
                          }
                          
                         </>
                           ) : (
                            <>
                            <Button
                            style={{
                              border: "1px solid black",
                              color: "#000",
                              borderRadius: "20px",
                            }}
                            variant="outline"
                            isDisabled
                          >
                            <Countdown
                              date={item?.endTime * 1000}
                              // onComplete={() => alert('Time is up!')}
                            />
                          </Button>
                           <Button
                           style={{
                             background: "#ea0061",
                             color: "white",
                             borderRadius: "20px",
                           }}
                           isLoading={cancellingItems.includes(item.auctionId)} 
                           onClick={() => handleCancelAuction(item.auctionId)}
                         >
                           Cancel
                         </Button>
                         </>
                           )
                        }
                      
                       
                      </div>
                    </Card>
                  ))}
              </div>
            </TabPanel>
            {/* favorites */}
            <TabPanel>
              <div className={styles.container}>
                {nftLiked.length > 0 &&
                  nftLiked.map((item: any, id) => (
                    <Card
                      className={styles.card}
                      style={{
                        boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
                        borderRadius: "2px",
                      }}
                      key={id}
                    >
                      <Image
                        src={item.image.replace(
                          "ipfs://",
                          "https://ipfs.io/ipfs/"
                        )}
                        alt="image nft"
                        loading="lazy"
                        style={{
                          width: 270,
                          height: 270,
                          objectFit: "contain",
                          background: "#fff",
                          border: "1px solid #eee",
                        }}
                      />
                      <div className={styles.card_body}>
                        <Text
                          style={{
                            fontWeight: "600",
                            color: "#484848",
                            fontSize: "18px",
                          }}
                        >
                          {item.name}
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
                          style={{
                            fontSize: "14px",
                            color: "#222",
                            fontWeight: "600",
                          }}
                        >
                          {item.price} ETH
                        </Text>
                      </div>
                      <div className={styles.button_buy}>
                        {/* <Button style={{background: "linear-gradient(to right, #D01498,#647ECB,#647ECB,#D01498)", color:"#fff", width:"150px"}} >
          <BsCart4 size={18} style={{marginRight:"4px"}} />Purchase
          </Button> */}
                      </div>
                    </Card>
                  ))}
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
