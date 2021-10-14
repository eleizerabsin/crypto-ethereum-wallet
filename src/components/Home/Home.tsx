import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { ConnectedIcon, ErrorIcon, StartIcon } from "../../Utils/Icons";
import {
  CONNECT,
  CONNECTED,
  ERROR,
  ETH_REQUEST_ACCOUNTS,
  WALLET_NOT_FOUND,
} from "../../Utils/Constants";

declare let window: any;

const Home = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string | null>("");
  const [isConnected, setConnected] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);

  useEffect(() => {
    if (window.ethereum) {
      setSelectedAddress(window.ethereum.selectedAddress);
      setConnected(window.ethereum.selectedAddress ? true : false);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error(WALLET_NOT_FOUND);
      }

      await window.ethereum.send(ETH_REQUEST_ACCOUNTS);

      if (window.ethereum.selectedAddress) {
        setConnected(true);
        setSelectedAddress(window.ethereum.selectedAddress);
      }
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
      setConnected(false);
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto font-sans">
      <div className="block mx-auto max-w-sm h-96 ">
        <div className="block mx-auto h-full text-green-400 animate-pulse">
          {isConnected ? (
            ConnectedIcon()
          ) : isError ? (
            ErrorIcon()
          ) : (
            <button
              className="block mx-auto"
              type="button"
              onClick={connectWallet}
            >
              {StartIcon()}
            </button>
          )}
          <p className="text-center text-5xl font-semibold truncate">
            {isConnected ? CONNECTED : isError ? ERROR : CONNECT}
          </p>
          <p className="text-center">{selectedAddress}</p>
          <p className="text-center">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
