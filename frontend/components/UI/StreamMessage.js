import { RxBorderDotted } from "react-icons/rx";
import { useEffect, useState } from "react";

const StreamMessage = (props) => {
  const [balance, setBalance] = useState(0.0465);

  useEffect(() => {
    // setInterval(() => {
    //   setBalance(balance + 0.01);
    // }, 100);
  }, []);
  return (
    <div className="border-2 border-solid border-gray-200 w-[88%] rounded-lg">
      <h3
        className={`${
          props.isActive === true ? "bg-green-100 text-green-600" : "bg-red-300"
        } w-28 h-8 pt-1 rounded-lg text-center font-medium ml-10`}
      >
        {!props.isActive && "Not"} Active
      </h3>
      <div className="ml-12 mt-10 text-2xl">{balance}</div>
      <div className="ml-12 mt-2">
        <h2 className="inline-flex text-md font-medium leading-tight">
          {props.sender}{" "}
          <span className="pt-1 flex">
            <RxBorderDotted /> <RxBorderDotted />
          </span>{" "}
          {props.receiver}
          <span className="mr-2 ml-2 text-gray-300"> | </span>
          <span className="text-gray-500">{props.flowRate}</span>
        </h2>
      </div>
    </div>
  );
};

export default StreamMessage;
