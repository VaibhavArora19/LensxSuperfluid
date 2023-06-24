import InfoCard from "./InfoCard";
import { useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import classes from "./InfoCard.module.css";

const StreamMessage = (props: any) => {
  const [balance, setBalance] = useState(0.0465);

  useEffect(() => {
    // setInterval(() => {
    //   setBalance(balance + 0.01);
    // }, 100);
  }, []);
  return (
    <div
      className={`border-2 border-solid border-gray-200 w-[90%] mt-[35px] rounded-2xl ${classes.box}`}
    >
      <h3
        className={`${
          props.isActive === true ? "bg-green-100 text-green-600" : "bg-red-300"
        } w-28 h-8 pt-1 rounded-lg text-center font-medium ml-20`}
      >
        {!props.isActive && "Not"} Active
      </h3>
      <div className="flex gap-4 mt-6">
        <div className="ml-20 flex">
          <InfoCard />
          <div>
            <img
              src="/stream-loop.gif"
              alt="Superfluid flow"
              className="w-12 mt-[18px]"
            />
          </div>
          <InfoCard />
        </div>
        <div className="ml-10 mt-2 font-medium text-4xl mb-6 text-gray-700">
          {balance}
        </div>
      </div>
      <div className="flex gap-1 ml-24 mb-4 font-medium text-gray-500">
        <h3>20h Ago</h3>
        <span className="pt-[5px]">
          <BsDot />
        </span>
        <h3>fDAIx</h3>
        <span className="pt-[5px]">
          <BsDot />
        </span>
        <h3>0.1/sec</h3>
      </div>
    </div>
  );
};

export default StreamMessage;
