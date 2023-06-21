import classes from "./Intro.module.css";
import { useState } from "react";
import Option from "../UI/Option";

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
const Intro = () => {
  const address = "0x394B4d8d8Bf066dFbD2aBD6a705e646C29e80746";

  return (
    <>
      <div className="h-[17rem] bg-[#54B435] block">
        <h1 className="text-center text-5xl text-white pt-24 font-Cherry">
          Superfluid x Lens
        </h1>
        <img
          src="/profile.webp"
          className=" rounded-[100px] sticky h-[13rem] mt-[50px] ml-24 border-8 border-solid border-white"
        />
      </div>
      <div className="mt-4 ml-[325px] w-32 flex gap-20">
        <div>
          <div className="flex">
            <h1 className="text-2xl font-bold">OxVaibhav</h1>
            <img
              src="stream-loop.gif"
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
        <div className="cursor-pointer hover:bg-gray-200 w-[120px] text-center rounded-md">
          <h3>10 followers</h3>
        </div>
        <span> | </span>
        <div className="cursor-pointer hover:bg-gray-200 w-[125px] text-center rounded-md">
          <h3>20 following</h3>
        </div>
      </div>
    </>
  );
};

export default Intro;
