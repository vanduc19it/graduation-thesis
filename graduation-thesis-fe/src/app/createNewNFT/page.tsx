/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Image,
  Input,
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import { ethers } from "ethers";
import { NFTStorage, File } from "nft.storage";
import styles from "../../styles/createNFT.module.scss";
import NFTAbi from "@/datasmc/abi/nftAbi.json";
import NFTAddress from "@/datasmc/address/nftAddress.json";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { SearchContext } from "@/components/SearchContext";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";

declare var window: any;

const CreateNewNFT = () => {
  const { isLoggedIn, handleConnect1 } = useContext(SearchContext);
  const [image, setImage] = useState("");
  const [fileImage, setFileImage] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const toast = useToast();

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_TOKEN_NFTSTORAGE)
    const addressData: any = localStorage.getItem("address");
    if (addressData?.length > 0) {
      handleConnect1(true);
    }
  }, [isLoggedIn]);

  try {
    if (typeof window !== "undefined") {
      const provider: any = new ethers.providers.Web3Provider(window.ethereum);
      const signer: any = provider.getSigner();
      var nft = new ethers.Contract(NFTAddress.address, NFTAbi, signer);
    }
  } catch (error) {
    console.log(error);
  }

  const [imageBuffer, setImageBuffer] = useState(null);

  const uploadToIPFS = async (event: any) => {
    try {
      event.preventDefault();
      const file: any = event.target.files[0];
      setFileImage(file);

      const reader: any = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        setImageBuffer(reader.result);
        if (image) {
          URL.revokeObjectURL(image);
        }
        const blobURL = URL.createObjectURL(new Blob([reader.result]));
        setImage(blobURL);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState("");

  const createNFT = async () => {
    if (!isLoggedIn) {
      alert("Vui lòng kết nối ví metamask! ");
    } else {
      const nftstorage = new NFTStorage({
        token: `${process.env.NEXT_PUBLIC_TOKEN_NFTSTORAGE}` ??
          "",
      });

      if (imageBuffer && name != "" && description != "") {
        if (price > 0) {
          try {
            setLoading(true);

            const formData = new FormData();
            formData.append("file", fileImage);

            const response = await fetch(
              "http://localhost:5000/detect_copy_nft",
              {
                method: "POST",
                body: formData,
              }
            );

            const data = await response.json();
            console.log(data, "hello1");
            const is_copy = data?.is_similar;

            if (!is_copy) {
              const { ipnft } = await nftstorage.store({
                name,
                description,
                price,
                image: new File([imageBuffer], "image", { type: "image/png" }),
              });

              const ipfsURL = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
              // mint nft
              const tx = await (await nft.mint(ipfsURL)).wait();

              if (tx) {
                setTx(tx?.transactionHash);
                onOpen();
                setLoading(false);
              }
            } else {
              toast({
                title: "Warning",
                description:
                  "Hệ thống xác nhận NFT này là copy trùng lặp hoặc giả mạo, vui lòng tạo một nft khác!",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top",
              });
              setLoading(false);
            }
          } catch (error) {
            console.error("Error:", error);
            setLoading(false);
          }
        } else {
          toast({
            title: "Info",
            description: "Giá nft phải lớn hơn 0!",
            status: "info",
            duration: 2000,
            isClosable: true,
            position: "top",
          });
        }
      } else {
        toast({
          title: "Info",
          description: "Vui lòng nhập đầy đủ thông tin nft !",
          status: "info",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const handleViewTx = () => {
    router.push(`https://mumbai.polygonscan.com/tx/${tx}`);
    setTimeout(() => {
      onClose();
    }, 4000);
  };

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event:any) => {
    setSelectedCategory(event.target.value);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "60vw",
            padding: "20px",
            borderRadius: "20px",
            boxShadow:
              " 2px 2px 10px rgba(0, 0, 0, 0.1), -2px -2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Text
            style={{
              fontSize: "28px",
              fontWeight: "600",
              margin: "20px 0px",
              textAlign: "center",
            }}
          >
            Create New Item
          </Text>
          <Text style={{ fontWeight: "600", margin: "10px 0px" }}>
            Upload File
          </Text>
          <FormControl>
            <Input
              type="file"
              onChange={uploadToIPFS}
              id="input-image"
              style={{ borderRadius: "20px" }}
            />
            <FormLabel style={{ fontWeight: "600", margin: "10px 0px" }}>
              Title
            </FormLabel>
            <Input
              type="text"
              onChange={(e: any) => setName(e.target.value)}
              placeholder="Item name"
              value={name}
              id="input-name"
              style={{ borderRadius: "20px" }}
            />
            <FormLabel style={{ fontWeight: "600", margin: "10px 0px" }}>
              Description
            </FormLabel>
            <Textarea
              placeholder="Write description for your item "
              onChange={(e: any) => setDescription(e.target.value)}
              value={description}
              id="input-desc"
              style={{ resize: "none", borderRadius: "20px" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "48%" }}>
                <FormLabel style={{ fontWeight: "600", margin: "10px 0px" }}>
                  Price
                </FormLabel>
                <NumberInput
                  max={10}
                  min={0}
                  onChange={(e: any) => setPrice(e)}
                  value={price}
                  id="input-price"
                  style={{ borderRadius: "20px" }}
                >
                  <NumberInputField style={{ borderRadius: "20px" }} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </div>
                            <Box  style={{
                    width: "48%",
                    padding: "0px",
                    marginTop: "44px",
                    borderRadius: "20px",
                  }}>
                    <FormControl>
                      <Select value={selectedCategory} onChange={handleCategoryChange} >
                        <option value="category1">Art</option>
                        <option value="category2">Gaming</option>
                        <option value="category3">Photography</option>
                        <option value="category2">Music</option>
                        <option value="category3">Video</option>
                        <option value="category3">PFPs</option>
                        {/* Add more options as needed */}
                      </Select>
                    </FormControl>

                
                  </Box>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Checkbox mt={4}>I agree to all terms & conditions</Checkbox>
              <Button
                type="submit"
                onClick={createNFT}
                style={{
                  width: "200px",
                  marginTop: "40px",
                  borderRadius: "20px",
                  color: "white",
                  background: "#ae4cff",
                  marginBottom: "30px",
                }}
              >
                {!loading ? (
                  "Create New Item"
                ) : (
                  <>
                    <Text style={{ marginRight: "4px" }}>Creating</Text>{" "}
                    <Spinner size="sm" />
                  </>
                )}
              </Button>
            </div>
          </FormControl>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Text
              style={{
                fontWeight: "600",
                margin: "10px 0px",
                fontSize: "18px",
              }}
            >
              Live Preview
            </Text>
            <FaEye />
          </div>

          <Card
            className={styles.card}
            style={{
              boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                background: "#000",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "center",
                margin: "0 10px",
                height: "320px",
              }}
            >
              {image !== "" ? (
                <Image
                  src={image}
                  alt="nft image"
                  style={{
                    backgroundSize: "contain",
                    width: 250,
                    height: 250,
                    objectFit: "contain",
                    background: "#fff",
                    border: "1px solid #eee",
                    borderRadius: "20px",
                  }}
                />
              ) : (
                <Image
                  src={"/image/preview.png"}
                  alt="nft image"
                  style={{
                    backgroundSize: "contain",
                  }}
                />
              )}
            </div>
            <div className={styles.card_body}>
              <Text
                style={{
                  fontWeight: "600",
                  color: "#484848",
                  fontSize: "18px",
                }}
              >
                {" "}
                {name == "" ? "NFT Name" : name}
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
                {price} ETH
              </Text>
            </div>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateNewNFT;
