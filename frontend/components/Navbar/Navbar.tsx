import { useState } from "react";
import Link from "next/link";
import { ethers } from "ethers";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const connectHandler = async () => {

    if(address.length > 0 ) return;
    
    const accounts = await window.ethereum?.request({method: 'eth_requestAccounts'});

    const provider = new ethers.providers.Web3Provider(window?.ethereum);
    const signer = provider.getSigner();
    
    if(accounts) setAddress(accounts[0])
    
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
            <h3 className="cursor-pointer hover:bg-gray-200 rounded-md w-16 text-center">Frens</h3>
          </Link>
          <Link href="/profile">
          <h3 className="cursor-pointer hover:bg-gray-200 rounded-md w-16 text-center">Profile</h3>
          </Link>
        </div>
      </div>
      <div className="mr-12 w-32 h-10 rounded-lg font-medium text-white text-center pt-[7px] mt-[3px] bg-[#54B435]">
        <button onClick={connectHandler}>{address.length > 0  ? address.substring(0, 3) + "..." + address.substring(38,42) : "Connect Wallet"}</button>
      </div>
    </nav>
  );
};

export default Navbar;
