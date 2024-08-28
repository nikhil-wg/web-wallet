import React from "react";

import SolanaWallet from "./SolanaWallet";
import NewNavBar from "./NewNavBar";
// import BottomNav from "./BottomNav";
function CreateSeed({ mnemonic, solana, eth }) {
  return (
    <>
      <NewNavBar />
      <div className="p-10  m-5 justify-center">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            Secrete Recovery Phrase
          </div>
          <div className="collapse-content">
            <ol className=" p-1 grid grid-flow-col grid-rows-6  gap-4 m-3 items-center text-center  md:grid-rows-4 md:gap-8  lg:p-2    ">
              {mnemonic.split(" ").map((word) => (
                <li
                  className=" bg-base-100 h-[2rem] text-center  pb-9 pt-2 rounded-md   "
                  key={word}
                >
                  {word}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <p className="m-2">Store the `Recovery Seed` at safe place</p>
        <button
          className="btn btn-active btn-primary m-2 mt-5"
          onClick={solana}
        >
          Solana Wallet
        </button>
        <button className="btn btn-active btn-primary m-2 mt-5" onClick={eth}>
          Etherium Wallet
        </button>
      </div>
      {/* <BottomNav/> */}
    </>
  );
}

export default CreateSeed;
