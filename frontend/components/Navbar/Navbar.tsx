import { useState } from "react";
import Link from "next/link";
import { useWalletLogin } from "@lens-protocol/react-web";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
const Navbar = () => {
  const [username, setUsername] = useState("");
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
    }
  };

  return (
    <nav className="flex justify-between mt-6 border-b-2 border-solid">
      <div className="flex gap-4 ml-20 mb-4">
        <Link href="/">
          <h1 className="text-3xl cursor-pointer font-bold">Superlens</h1>
        </Link>
        <div>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder="Search..."
            className="mt-1 ml-2 h-[2.2rem] w-[15rem] text-black pl-4 border-2 border-solid focus:outline-none focus:border-green-400 rounded-md"
          />
        </div>
        <div className="flex gap-4 ml-2 font-semibold mt-[12px]">
          <Link href="/frens">
            <h3 className="cursor-pointer hover:bg-gray-200 rounded-md w-16 text-center">
              Frens
            </h3>
          </Link>
          <Link href={`/profile/${address}`}>
            <h3 className="cursor-pointer hover:bg-gray-200 rounded-md w-16 text-center">
              Profile
            </h3>
          </Link>
        </div>
      </div>

      <div className="mr-12">
        <button
          className="bg-[#54B435] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          disabled={isLoginPending}
          onClick={onLoginClick}
        >
          {!address
            ? "Login With Lens"
            : address.substring(0, 5) + "..." + address.substring(38, 43)}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
