import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { useWalletLogin } from "@lens-protocol/react-web";
import { useRouter } from "next/router";
export default function Wallet() {
  const router = useRouter();
  const {
    execute: login,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();

  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer);
      const address = await signer.getAddress();
      router.push("/profile/" + address);
    }
  };
  return (
    <div className="flex justify-center flex-col items-center mt-[10%] gap-2">
      <p className="text-xl">Connect your wallet to see your profile</p>
      <button
        className="bg-[#54B435] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
        disabled={isLoginPending}
        onClick={onLoginClick}
      >
        Connect Wallet
      </button>
    </div>
  );
}
