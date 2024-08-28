import React from "react";
import Navbar from "./NavBar";

function GetsStarted({onCreate}) {
  return (
    <>
      <Navbar />
      <div className="hero bg-base-100 min-h-screen ">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Crypto Wallet</h1>
            <p className="py-6">
              Let's create a Crypto wallet on Solana and Ethereum. Click on
              button ! and create a new wallet
            </p>
            <button className="btn btn-primary" onClick={onCreate}>
              Create Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetsStarted;
