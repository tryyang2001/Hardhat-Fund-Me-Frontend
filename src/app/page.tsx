"use client";

import { fund, getBalance, withdraw } from "@/libs/funding";
import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [ethAmount, setEthAmount] = useState("");

  const connect = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum != "undefined"
    ) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        setIsConnected(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const showBalance = async () => {
    const balance = await getBalance();
    alert(balance);
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl text-semibold flex justify-center pt-4">
        Hardhat Fund Me
      </h1>

      <div className="flex flex-row gap-4 p-4 justify-center my-2">
        <Button onClick={() => connect()}>
          {isConnected ? "Connected" : "Connect"}
        </Button>
        <Button onClick={() => showBalance()}>Get Balance</Button>
        <Button onClick={() => withdraw()}>Withdraw</Button>
      </div>

      <h2 className="text-2xl text-semibold flex justify-center">
        Fund Transfer
      </h2>

      <div className="flex flex-row gap-4 p-4 justify-center">
        <Textarea
          label="ETH Amount"
          placeholder="0.1"
          onValueChange={(value) => setEthAmount(value)}
          size="sm"
        />
        <Button onClick={() => fund(ethAmount)}>Fund</Button>
      </div>
    </div>
  );
}
