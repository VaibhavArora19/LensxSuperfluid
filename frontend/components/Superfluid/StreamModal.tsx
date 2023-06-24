import ModalCard from "../UI/ModalCard";
import { LuWorkflow } from "react-icons/lu";

const InputForm = () => {
  return (
    <div className="w-[40%] h-[75%] bg-white rounded-xl fixed top-[10%] right-0 left-[30%] bottom-0 z-20">
      <div
        className=" pl-4 pb-2
       w-[100%] mt-4 border-b-2 border-solid border-gray-300 text-[20px] font-medium"
      >
        <h1 className="flex gap-2">
          <span className="inline text-green-600 mt-[6px]">
            <LuWorkflow />
          </span>
          Stream tokens directly to lens user
        </h1>
      </div>
      <div className="pl-6 overflow-hidden">
        <form className="mt-10 w-full ml-6 h-full">
          <div className="ml-6">
            <label className="block">
              <span className="text-lg font-medium">Receiver</span>
            </label>
            <input
              type="text"
              placeholder="lens name"
              value={"lens name goes here"}
              className="w-[80%] h-[47px] pl-2 border-2 border-solid focus:outline-none border-gray-300 rounded-lg"
              disabled
            />
          </div>
          <div className="ml-6 mt-6">
            <label className="block">
              <span className="text-lg font-medium">Token</span>
            </label>
            <input
              type="text"
              placeholder="fDAIx"
              disabled
              className="w-[80%] h-[47px] pl-2 border-2 border-solid border-gray-300 rounded-lg"
            />
          </div>
          <div className="ml-6 mt-6">
            <label className="block">
              <span className="text-lg font-medium">Flow Rate </span>
            </label>
            <input
              type="text"
              placeholder="Flow Rate"
              className="w-[65%] h-[47px] pl-2 border-2 border-solid outline-none focus:border-green-400 border-gray-300 rounded-lg"
            />
            <select className="h-[47px] rounded-lg focus:border-green-400 border-gray-30  border-2 ml-2 border-solid outline-none">
              <option value="second">/second</option>
              <option value="minute">/minute</option>
              <option value="hour">/hour</option>
              <option value="day">/day</option>
              <option value="month">/month</option>
            </select>
          </div>
          <button className="bg-[#54B435] rounded-lg mt-10 text-white h-12 w-[77%] ml-6">
            Start Streaming
          </button>
        </form>
      </div>
    </div>
  );
};

const StreamModal = () => {
  return (
    <>
      <ModalCard type="stream" />
      <InputForm />
    </>
  );
};

export default StreamModal;
