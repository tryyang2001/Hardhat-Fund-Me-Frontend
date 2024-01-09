"use client";

import { NextUIProvider } from "@nextui-org/react";
import { MetaMaskProvider } from "@metamask/sdk-react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Hardhat Fund Me",
          url: window.location.host,
        },
      }}
    >
      <NextUIProvider>{children}</NextUIProvider>
    </MetaMaskProvider>
  );
};

export default Providers;
