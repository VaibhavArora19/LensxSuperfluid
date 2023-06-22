import Image from "next/image";
import { Inter } from "next/font/google";
import { useWalletLogin } from "@lens-protocol/react-web";
import { useAccount, useConnect, useDisconnect } from "wagmi";
// import { useWalletClient } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { ether } from "@lens-protocol/shared-kernel";
import { ethers } from "ethers";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const {
  //   execute: login,
  //   error: loginError,
  //   isPending: isLoginPending,
  // } = useWalletLogin();

  // const { data: client } = useWalletClient();

  // const { isConnected } = useAccount();
  // const { disconnectAsync } = useDisconnect();

  // const { connectAsync } = useConnect({
  //   connector: new InjectedConnector(),
  // });

  // const onLoginClick = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);

  //   // The MetaMask plugin also allows signing transactions to
  //   // send ether and pay to change state within the blockchain.
  //   // For this, you need the account signer...
  //   const signer = provider.getSigner();
  //   await login(signer);
  // };

  return (
    <div>
      {/* {loginError && <p>{loginError}</p>} */}
      {/* <button disabled={isLoginPending} onClick={onLoginClick}> */}
        Log in
      {/* </button> */}
    </div>
  );
}
