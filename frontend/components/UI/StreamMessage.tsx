import InfoCard from "./InfoCard";
import dynamic from "next/dynamic";
import { BsDot } from "react-icons/bs";
import classes from "./InfoCard.module.css";
import { ethers } from "ethers";

const CountUp = dynamic(() => import("react-countup"), { ssr: false });

type Iprops = {
  balance: number;
  flowRate: number;
  time: string; ///if flowrate is per second per minute or per hour
  sender: string;
  receiver: string;
  createdAt: string;
  isActive: boolean;
  token: string;
  streamUntilUpdatedAt: string;
};

const StreamMessage = (props: Iprops) => {
  var d = new Date(Number(props.createdAt) * 1000); // The 0 there is the key, which sets the date to the epoch
  let time = d.toString();

  let end = 0;

  if (props.time === "second") {
    end =
      60 *
      60 *
      24 *
      15 *
      Number(ethers.utils.formatUnits(props.flowRate, 18).toString());
  } else if (props.time === "minute") {
    end =
      60 *
      24 *
      30 *
      Number(ethers.utils.formatUnits(props.flowRate, 18).toString());
  } else if (props.time === "hour") {
    end =
      24 * 30 * Number(ethers.utils.formatUnits(props.flowRate, 18).toString());
  }

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
          <InfoCard address={props.sender} />
          <div>
            <img
              src="/stream-loop.gif"
              alt="Superfluid flow"
              className="w-12 mt-[18px]"
            />
          </div>
          <InfoCard address={props.receiver} />
        </div>
        <div className="ml-10 mt-2 font-medium text-4xl mb-6 text-gray-700">
          {props.isActive ? (
            <CountUp
              start={props.balance}
              end={end}
              duration={2628288}
              separator=" "
              decimals={4}
              decimal="."
              delay={0.1}
              onEnd={() => console.log("Ended! 👏")}
              onStart={() => console.log("Started! 💨")}
            />
          ) : (
            <h3>
              {ethers.utils
                .formatUnits(props.streamUntilUpdatedAt, 18)
                .toString()
                .substring(0, 8)}
            </h3>
          )}
        </div>
      </div>
      <div className="flex gap-1 ml-24 mb-4 font-medium text-gray-500">
        <h3>{time.substring(0, 24)}</h3>
        <span className="pt-[5px]">
          <BsDot />
        </span>
        <h3>{props.token}</h3>
        <span className="pt-[5px]">
          <BsDot />
        </span>
        <h3>
          {ethers.utils
            .formatUnits(props.flowRate, 18)
            .toString()
            .substring(0, 8)}
          /sec
        </h3>
      </div>
    </div>
  );
};

export default StreamMessage;
