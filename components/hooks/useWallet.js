import { useState } from "react";

const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [errorMsg, setError] = useState("");

  const disconnectWalletHandler = () => {
    window.solana.disconnect();
    setIsConnected(false);
    localStorage.removeItem("connection", "");
  };

  const connectToWallet = async (event) => {
    const isPhantomInstalled = window.solana && window.solana.isPhantom;
    if (isPhantomInstalled) {
      try {
        const resp = await window.solana.connect();
        resp.publicKey.toString();
        setIsConnected(true);
        localStorage.setItem("connection", "connected");
      } catch (err) {
        setError("Oooops, something went wrong");
      }
    }
  };

  return {
    isConnected: isConnected,
    setConnectionHandler: connectToWallet,
    removeConnectionHandler: disconnectWalletHandler,
    errorMsg,
  };
};
export default useWallet;
