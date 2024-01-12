"use client";
import axios from "axios";
async function convertEthToUsd(eth: number) {

  try {
 
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "ethereum",
          vs_currencies: "usd",
        },
      }
    );
    const ethToUsdRate = response.data.ethereum.usd;

    const ethAmount = eth;

    const usdAmount = ethAmount * ethToUsdRate;
    return usdAmount.toFixed(2);
  } catch (error) {
    console.error("Error fetching data from CoinGecko API:", error);
  }
}


export default convertEthToUsd;
