import ModalCard from "../UI/ModalCard";
import { TbLockAccess } from "react-icons/tb";
import { useRef, useState, useEffect } from "react";
import {
  authorizeFullControl,
  revokeFullControl,
  createOrRevokePermission,
} from "./SuperfluidSDK";
import { permissions } from "@/lib/constants";
import { nameToAddress } from "../lens/utils";

const InputForm = ({ username }: { username: string }) => {
  const [permission, setPermission] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const flowRateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getAddress() {
      const address = await nameToAddress(username);

      if (!address) return;

      setReceiverAddress(address);
    }

    getAddress();
  }, []);

  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let formattedFlowRate = Number(flowRateRef.current?.value);

    setIsProcessing(true);

    if (timePeriod === "/minute") {
      formattedFlowRate /= 60;
    } else if (timePeriod === "/hour") {
      formattedFlowRate /= 60 * 60;
    } else if (timePeriod === "/day") {
      formattedFlowRate /= 24 * 60 * 60;
    } else if (timePeriod === "/month") {
      formattedFlowRate /= 30 * 24 * 60 * 60;
    }

    if (receiverAddress == "") return;

    if (permission === "grantFullControl") {
      await authorizeFullControl(receiverAddress);
    } else if (permission === "revokeFullControl") {
      await revokeFullControl(receiverAddress);
    } else {
      //@ts-ignore
      const permissionValue = permissions[permission];

      await createOrRevokePermission(
        formattedFlowRate.toString(),
        receiverAddress,
        Number(permissionValue)
      );
    }

    setIsProcessing(false);
  };

  return (
    <div className="w-[40%] h-[75%] bg-white rounded-xl fixed top-[10%] right-0 left-[30%] bottom-0 z-20">
      <div
        className=" pl-4 pb-2
       w-[100%] mt-4 border-b-2 border-solid border-gray-300 text-[20px] font-medium"
      >
        <h1 className="flex gap-2">
          <span className="inline text-green-600 mt-[6px]">
            <TbLockAccess />
          </span>
          Provide Stream Permissions
        </h1>
      </div>
      <form className="mt-10 w-full ml-6 h-full" onSubmit={formSubmitHandler}>
        <div className="ml-6">
          <label className="block">
            <span className="text-lg font-medium">Operator name</span>
          </label>
          <input
            type="text"
            placeholder="Operator lens username"
            className="w-[80%] h-[47px] text-gray-500 cursor-not-allowed pl-2 border-2 border-solid focus:outline-none border-gray-300 rounded-lg"
            disabled
            value={username}
          />
          {receiverAddress != "" && (
            <p className="text-sm text-gray-500 mt-2 ml-2">
              {receiverAddress.substring(0, 7) +
                "..." +
                receiverAddress.substring(35, 43)}
            </p>
          )}
        </div>
        <div className="ml-6 mt-6">
          <label className="block">
            <span className="text-lg font-medium">Permission</span>
          </label>
          <select
            className="w-[80%] h-[47px] pl-2 border-2 border-solid focus:outline-none border-gray-300 rounded-lg"
            onChange={(e) => {
              setPermission(e.target.value);
            }}
          >
            <option disabled selected>
              Permission
            </option>
            <option value="Create">Create</option>
            <option value="Update">Update</option>
            <option value="Delete">Delete</option>
            <option value="grantFullControl">Grant Full Control</option>
            <option value="revokeFullControl">Revoke Full Control</option>
          </select>
        </div>
        {permission !== "revokeFullControl" && (
          <div className="ml-6 mt-6">
            <label className="block">
              <span className="text-lg font-medium">Flow Rate</span>
            </label>
            <input
              type="text"
              placeholder="Flow Rate"
              className="w-[65%] h-[47px] pl-2 border-2 border-solid outline-none focus:border-green-400 border-gray-300 rounded-lg"
              ref={flowRateRef}
            />
            <select
              className="h-[47px] rounded-lg focus:border-green-400 border-gray-30  border-2 ml-2 border-solid outline-none"
              onChange={(e) => {
                setTimePeriod(e.target.value);
              }}
            >
              <option disabled selected>
                Choose
              </option>
              <option value="second">/second</option>
              <option value="minute">/minute</option>
              <option value="hour">/hour</option>
              <option value="day">/day</option>
              <option value="month">/month</option>
            </select>
          </div>
        )}
        <button
          className="bg-[#54B435] rounded-lg mt-10 text-white h-12 w-[77%] ml-6"
          type="submit"
        >
          {isProcessing ? "Setting Permission..." : "Set Permission"}
        </button>
      </form>
    </div>
  );
};

const PermissionModal = ({ username }: { username: string }) => {
  return (
    <>
      <ModalCard type="permission" />
      <InputForm username={username} />
    </>
  );
};

export default PermissionModal;
