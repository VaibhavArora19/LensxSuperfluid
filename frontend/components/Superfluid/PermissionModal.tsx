import ModalCard from "../UI/ModalCard";
import { TbLockAccess } from "react-icons/tb";
import { useRef, useState } from "react";

const InputForm = () => {
  const [permission, setPermission] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const flowRateRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = async () => {};

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
            <span className="text-lg font-medium">Operator address</span>
          </label>
          <input
            type="text"
            placeholder="Operator address"
            value={"Resolved operator address from lens"}
            className="w-[80%] h-[47px] pl-2 border-2 border-solid focus:outline-none border-gray-300 rounded-lg"
            disabled
          />
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
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
            <option value="grantFullControl">Grant Full Control</option>
            <option value="revokeFullControl">Revoke Full Control</option>
          </select>
        </div>
        <div className="ml-6 mt-6">
          <label className="block">
            <span className="text-lg font-medium">Flow Rate </span>
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
            <option value="second">/second</option>
            <option value="minute">/minute</option>
            <option value="hour">/hour</option>
            <option value="day">/day</option>
            <option value="month">/month</option>
          </select>
        </div>
        <button
          className="bg-[#54B435] rounded-lg mt-10 text-white h-12 w-[77%] ml-6"
          type="submit"
        >
          Set Permission
        </button>
      </form>
    </div>
  );
};

const PermissionModal = () => {
  return (
    <>
      <ModalCard type="permission" />
      <InputForm />
    </>
  );
};

export default PermissionModal;
