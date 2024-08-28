import React, { useState } from "react";
import CreateSeed from "./components/CreateSeed";
import GetsStarted from "./components/GetsStarted";
import SolanaWallet from "./components/SolanaWallet";
import { Buffer } from "buffer"; // Import Buffer polyfill
import { generateMnemonic } from "bip39";
import EthereumWallet from "./components/EthereumWallet";

// Set up Buffer polyfill for browser environment
window.Buffer = Buffer;

function App() {
  const [mnemonic, setMnemonic] = useState();
  const [currentStep, setCurrentStep] = useState("GetsStarted");

  const handleOnCreateWallet = async () => {
    const mnemonic = generateMnemonic();
    console.log(mnemonic);
    setMnemonic(mnemonic);
    setCurrentStep("CreateSeed");
  };

  const handleOnSOL = () => {
    setCurrentStep("SolanaWallet");
  };
  const handleOnETH = () => {
    setCurrentStep("EthereumWallet");
  };
  const switchToETH = () => {
    console.log("Switching to Ethereum Wallet");
    setCurrentStep("EthereumWallet");
  };

  const switchToSOL = () => {
    console.log("Switching to Solana Wallet");
    setCurrentStep("SolanaWallet");
  };

  return (
    <div>
      {currentStep === "GetsStarted" && (
        <GetsStarted onCreate={handleOnCreateWallet} />
      )}
      {currentStep === "CreateSeed" && (
        <CreateSeed
          mnemonic={mnemonic}
          solana={handleOnSOL}
          eth={handleOnETH}
        />
      )}
      {currentStep === "SolanaWallet" && (
        <>
         {console.log("Rendering eth Wallet")}
        <SolanaWallet mnemonic={mnemonic} onSelectETH={switchToETH} />
        </>
      )}
      {currentStep === "EthereumWallet" && (
        <>
        {console.log("Rendering Solana Wallet")}
        <EthereumWallet mnemonic={mnemonic} onSelectSOL={switchToSOL} />
        </>
      )}
    </div>
  );
}

export default App;
