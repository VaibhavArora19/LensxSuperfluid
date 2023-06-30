import { TiFlowParallel } from "react-icons/ti";
import classes from "../../components/Follow/Modal.module.css";
import { useRef, useState } from "react";
import {
  createFlow,
  updateFlow,
  deleteFlow,
} from "@/components/Superfluid/SuperfluidSDK";
import { useAccount } from "wagmi";
import { nameToAddress } from "@/components/lens/utils";

const Stream = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const flowRateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLSelectElement>(null);
  const streamTypeRef = useRef<HTMLSelectElement>(null);
  const [receiverAddress, setReceiverAddress] = useState("");
  const { address } = useAccount();

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formattedFlowRate = Number(flowRateRef.current?.value);
    let timePeriod = timeRef?.current?.value;

    if (!address) return;

    if (timePeriod === "/minute") {
      formattedFlowRate /= 60;
    } else if (timePeriod === "/hour") {
      formattedFlowRate /= 60 * 60;
    } else if (timePeriod === "/day") {
      formattedFlowRate /= 24 * 60 * 60;
    } else if (timePeriod === "/month") {
      formattedFlowRate /= 30 * 24 * 60 * 60;
    }

    if (!usernameRef?.current?.value) return;

    const receiverAddress = await nameToAddress(usernameRef?.current?.value);

    if (!receiverAddress) return;

    if (streamTypeRef?.current?.value === "create") {
      await createFlow(address, receiverAddress, formattedFlowRate.toString());
    } else if (streamTypeRef?.current?.value === "update") {
      await updateFlow(address, receiverAddress, formattedFlowRate.toString());
    } else if (streamTypeRef?.current?.value === "delete") {
      await deleteFlow(address, receiverAddress);
    }
  };

  const handleReceiverAddress = async (e: any) => {
    const address = await nameToAddress(e.target.value);

    if (!address) {
      setReceiverAddress("");
    } else {
      setReceiverAddress(address as any);
    }
  };

  return (
    <div className={`m-auto mt-20 pb-2 w-[45%] rounded-lg ${classes.shadow}`}>
      <div className="border-b-2 border-solid pt-2 border-gray-300">
        <h2 className="flex text-lg mb-2 font-medium ml-[5%] mt-4">
          <span className="pt-1 pr-2 text-[#54B435]">
            <TiFlowParallel />
          </span>
          Stream super tokens to lens users
        </h2>
      </div>
      <form className="block ml-[10%] mt-10 mb-6" onSubmit={formSubmitHandler}>
        <div>
          <label className="block">
            <span className="text-lg font-medium">Lens username</span>
          </label>
          <input
            type="text"
            placeholder="lens username"
            className="w-[80%] h-[47px] pl-2 focus:border-green-400 border-2 border-solid focus:outline-none border-gray-300 rounded-lg"
            ref={usernameRef}
            onChange={handleReceiverAddress}
          />
          {receiverAddress != "" && (
            <p className="text-sm text-gray-500 mt-2 ml-2">
              {receiverAddress.substring(0, 7) +
                "..." +
                receiverAddress.substring(37, 43)}
            </p>
          )}
          <div className="grid grid-cols-2">
            <div className="mt-6">
              <label className="block">
                <span className="text-lg font-medium">Token</span>
              </label>
              <input
                type="text"
                placeholder="Token name"
                value="fDAIx"
                disabled
                className="w-[100%] cursor-not-allowed text-gray-400 h-[47px] pl-2 focus:border-green-400 border-2 border-solid focus:outline-none border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-6 ml-6">
              <label className="block">
                <span className="text-lg ml-2 font-medium">Stream Type</span>
              </label>
              <select
                ref={streamTypeRef}
                className="h-[47px] rounded-lg focus:border-green-400 border-gray-30 w-[55%]  border-2 ml-2 border-solid outline-none"
              >
                <option selected disabled>
                  Stream Type
                </option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mt-6">
              <label className="block">
                <span className="text-lg font-medium">Flow Rate</span>
              </label>
              <input
                type="text"
                placeholder="Flow Rate"
                ref={flowRateRef}
                className="w-[100%] h-[47px] pl-2 border-2 focus:border-green-400 border-solid focus:outline-none border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-6 ml-6">
              <label className="block">
                <span className="text-lg ml-2 font-medium">Time</span>
              </label>
              <select
                ref={timeRef}
                className="h-[47px] rounded-lg focus:border-green-400 border-gray-30 w-[55%]  border-2 ml-2 border-solid outline-none"
              >
                <option selected disabled>
                  Time
                </option>
                <option value="second">/second</option>
                <option value="minute">/minute</option>
                <option value="hour">hour</option>
                <option value="day">day</option>
                <option value="month">month</option>
              </select>
            </div>
          </div>
        </div>

        <button className="mt-10 w-[80%] h-[50px] rounded-xl bg-[#54B435] text-white">
          Start Streaming
        </button>
      </form>
    </div>
  );
};

export default Stream;
