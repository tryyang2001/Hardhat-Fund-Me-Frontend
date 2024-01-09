import { CONTRACT_ADDRESS, abi } from "@/contracts/FundMe-data";
import { FundMe } from "@/types/typechain-types";
import { ContractTransactionResponse } from "ethers";
import { BrowserProvider } from "ethers";
import { ethers } from "ethers";

export const fund = async (ethAmount: string) => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
    ) as unknown as FundMe;

    try {
      const tx = await contract.fund({
        value: ethers.parseEther(ethAmount),
      });

      await listenForTransactionMine(tx, provider);
    } catch (error) {
      console.log("Transaction rejected");
    }
  }
};

export const withdraw = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
    ) as unknown as FundMe;
    try {
      const tx = await contract.withdraw();
      await listenForTransactionMine(tx, provider);
    } catch (error) {
      console.log(error);
    }
  }
};

export const getBalance = async () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      abi,
      signer
    ) as unknown as FundMe;
    try {
      const balance = await provider.getBalance(CONTRACT_ADDRESS);
      return balance;
    } catch (error) {
      console.log(error);
    }
  }
};

function listenForTransactionMine(
  txResponse: ContractTransactionResponse,
  provider: BrowserProvider
) {
  return new Promise<void>((resolve, reject) => {
    provider
      .once(txResponse.hash, (receipt) => {
        console.log(`Transaction mined: ${receipt.transactionHash}`);
        resolve();
      })
      .catch((error) => {
        console.log(`Transaction failed: ${error}`);
        reject();
      });
  });
}
