import React, { useState } from 'react';
import { HDNodeWallet, Wallet } from 'ethers';

const App = () => {
  const [mnemonic, setMnemonic] = useState('');
  const [wallets, setWallets] = useState([]);

  const generateMnemonic = () => {
    const randomMnemonic = Wallet.createRandom().mnemonic.phrase;
    setMnemonic(randomMnemonic);
    deriveETHWallets(randomMnemonic);
  };

  const deriveETHWallets = (mnemonic) => {
    const seed = HDNodeWallet.fromMnemonic(mnemonic).privateKey;
    const walletCount = 3; // Adjust for more wallets if needed
    let tempWallets = [];

    for (let i = 0; i < walletCount; i++) {
      const derivationPath = `m/44'/60'/0'/0/${i}`;
      const wallet = deriveEthereumWallet(seed, derivationPath);
      tempWallets.push({
        address: wallet.address,
        publicKey: wallet.publicKey,
      });
    }
    setWallets(tempWallets);
  };

  const deriveEthereumWallet = (seed, derivationPath) => {
    const privateKey = deriveEthereumPrivateKey(seed, derivationPath);
    return new Wallet(privateKey);
  };

  const deriveEthereumPrivateKey = (seed, derivationPath) => {
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    return child.privateKey;
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Ethereum Wallet Generator</h1>
      <button
        className="bg-blue-500 text-white p-2 rounded mb-6"
        onClick={generateMnemonic}
      >
        Generate Mnemonic
      </button>

      {mnemonic && (
        <div className="mb-6">
          <h2 className="text-2xl">Mnemonic:</h2>
          <p className="text-gray-600">{mnemonic}</p>
        </div>
      )}

      <div className="w-full">
        {wallets.map((wallet, index) => (
          <div key={index} className="border p-4 mb-4 rounded">
            <h3 className="text-xl font-bold">Wallet {index + 1}</h3>
            <p><strong>Address:</strong> {wallet.address}</p>
            <p><strong>Public Key:</strong> {wallet.publicKey}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
