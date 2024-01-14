"use client";
async function convertEthToUsd(eth: number) {

  const rate = 1/0.908806
  try {

    const ethAmount = eth;

    const usdAmount = ethAmount * rate;
    return usdAmount.toFixed(2);
  } catch (error) {
    console.error("Error fetching data from CoinGecko API:", error);
  }
}
export default convertEthToUsd;
