// import Navbar from "./NavBar";
import React, { useState } from "react";
import { mnemonicToSeedSync } from "bip39";
import nacl from "tweetnacl";
import EthereumWallet from "./EthereumWallet";

function SolanaWallet({ mnemonic,onSelectETH }) {
  const [solanaWallets, setSolanaWallets] = useState([]);
  const [walletToDelete, setWalletToDelete] = useState(null);

  const generateWallet = (index) => {
    const seed = mnemonicToSeedSync(mnemonic);
    const derivedSeed = seed.slice(0, 32); // Use the first 32 bytes as the seed
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed);

    return {
      wallet: index + 1,
      publicKey: Buffer.from(keypair.publicKey).toString("hex"),
      privateKey: Buffer.from(keypair.secretKey).toString("hex"),
    };
  };

  const addWallet = () => {
    setSolanaWallets((prevWallets) => {
      const newWallet = generateWallet(prevWallets.length);
      return [...prevWallets, newWallet];
    });
  };

  const confirmDeleteWallet = (index) => {
    setWalletToDelete(index);
    document.getElementById(`delete_modal_${index}`).showModal();
  };

  const deleteWallet = () => {
    setSolanaWallets((prevWallets) =>
      prevWallets.filter((_, i) => i !== walletToDelete)
    );
    setWalletToDelete(null);
  };

  const cancelDelete = () => {
    setWalletToDelete(null);
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex flex-col justify-center items-center">
        <div className="collapse bg-base-200 m-5">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-medium">
            Change Currency
          </div>
          <div className="collapse-content bg-base-200">
            <button onClick={ onSelectETH}>Ethereum Wallets</button>
          </div>
        </div>
        <h1 className="text-3xl font-bold mt-3 p-3">Solana Wallets</h1>

        <button
          className="btn btn-active btn-primary m-3 mb-8"
          onClick={addWallet}
        >
          Add Wallet
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ol>
          {solanaWallets.map((wallet, index) => (
            <li key={index}>
              <button
                className="btn m-2"
                onClick={() =>
                  document.getElementById(`modal_${index}`).showModal()
                }
              >
                Solana Wallet {wallet.wallet}
              </button>
              <dialog
                id={`modal_${index}`}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-lg">
                    Solana Wallet {wallet.wallet}
                  </h3>
                  <p className="py-4">Public Key: {wallet.publicKey}</p>
                  <p className="py-4">Private Key: {wallet.privateKey}</p>
                  <div className="modal-action">
                    <button
                      className="btn btn-error mr-8"
                      onClick={() => confirmDeleteWallet(index)}
                    >
                      Delete Wallet
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        document.getElementById(`modal_${index}`).close()
                      }
                    >
                      Close
                    </button>
                  </div>
                </div>
              </dialog>

              {/* Deletion confirmation modal */}
              <dialog
                id={`delete_modal_${index}`}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <div role="alert" className="alert">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-info h-6 w-6 shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>Are you sure you want to delete this wallet?</span>
                    <div>
                      <button
                        className="btn btn-sm"
                        onClick={() => {
                          cancelDelete();
                          document
                            .getElementById(`delete_modal_${index}`)
                            .close();
                        }}
                      >
                        Deny
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          deleteWallet();
                          document
                            .getElementById(`delete_modal_${index}`)
                            .close();
                        }}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </dialog>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default SolanaWallet;
