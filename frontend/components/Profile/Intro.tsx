import classes from "./Intro.module.css";
import { useState, useContext } from "react";
import Option from "../UI/Option";
import { AppContext } from "@/context/StateContext";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useActiveProfile } from "@lens-protocol/react-web";
import { useEffect } from "react";
const options = [
  {
    name: "Home",
  },
  {
    name: "On going streams",
  },
  {
    name: "All streams",
  },
];
const Intro = ({ data }: any) => {
  const address = data.ownedBy;
  const ctx = useContext(AppContext);
  const currentAddress = useAccount().address;

  const modalHandler = () => {
    ctx.modalHandler();
  };

  const showStreamModalHandler = () => {
    ctx.streamModalHandler();
  };

  const showPermissionModalHandler = () => {
    ctx.permissionModalHandler();
  };

  return (
    <>
      <div className="h-[17rem] bg-[#54B435] block">
        <h1 className="text-center text-5xl text-white pt-24 font-Cherry">
          Superfluid x Lens
        </h1>

        {(data.picture as any).original.url ? (
          <img
            src={(data.picture as any).original.url}
            className=" rounded-[100px] sticky h-[13rem] w-[13rem] mt-[50px] ml-24 border-8 border-solid border-white"
          />
        ) : (
          <img
            src="/profile.png"
            className=" rounded-[100px] sticky h-[13rem] w-[13rem] mt-[50px] ml-24 border-8 border-solid border-white"
          />
        )}
      </div>
      <div className="mt-4 ml-[325px] w-32 flex gap-20">
        <div>
          <div className="flex">
            <h1 className="text-2xl font-bold">{data.handle}</h1>
            <img
              src="/stream-loop.gif"
              alt="Superfluid stream"
              className="ml-3 mt-[10px] h-[17px]"
            />
          </div>
          <h1
            className={`text-[15px] ml-1 font-semibold ${classes.background}`}
          >
            {address.substring(0, 6) + "..." + address.substring(37, 43)}
          </h1>
        </div>
        <div className="flex gap-[30px]">
          {options.map((option) => {
            return <Option title={option.name} />;
          })}
        </div>
      </div>
      <div className="mt-[5rem] ml-[60px] text-lg font-semibold w-[270px] flex gap-4">
        <div
          className="cursor-pointer hover:bg-gray-200 w-[120px] text-center rounded-md"
          onClick={modalHandler}
        >
          <h3>{data.stats.totalFollowers} followers</h3>
        </div>
        <span> | </span>
        <div
          className="cursor-pointer hover:bg-gray-200 w-[125px] text-center rounded-md"
          onClick={modalHandler}
        >
          <h3>{data.stats.totalFollowing} following</h3>
        </div>
      </div>
      {currentAddress &&
        ethers.utils.getAddress(data.ownedBy) ==
          ethers.utils.getAddress(currentAddress) && (
          <div className="flex gap-2 z-20 mt-10 ml-8 w-[10px]">
            <div onClick={showStreamModalHandler}>
              <button className="bg-[#54B435] text-white rounded-lg w-[10rem] h-[3rem]">
                Send Tokens
              </button>
            </div>
            <div onClick={showPermissionModalHandler}>
              <button className="bg-[#54B435] text-white rounded-lg w-[10rem] h-[3rem]">
                Give Permission
              </button>
            </div>
          </div>
        )}
    </>
  );
};

export default Intro;
