import classes from "./Intro.module.css";
import { useState } from "react";

const Intro = () => {
  const [showDialogue, setShowDialogue] = useState(false);
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
      <div className="mt-4 ml-[325px] w-32">
        <div className="flex">
          <h1 className="text-2xl font-bold">OxVaibhav</h1>
          <img
            src="stream-loop.gif"
            alt="Superfluid stream"
            className="ml-3 mt-[10px] h-[17px]"
            onMouseEnter={() => {
              setShowDialogue(true);
            }}
            onMouseLeave={() => setShowDialogue(false)}
          />
        </div>
        <h1 className={`text-[15px] ml-1 font-semibold ${classes.background}`}>
          {address.substring(0, 6) + "..." + address.substring(37, 43)}
        </h1>
      </div>
    </>
  );
};

export default Intro;
