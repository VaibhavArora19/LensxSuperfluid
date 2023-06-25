import { useContext } from "react";
import { AppContext } from "@/context/StateContext";

const StreamBar = () => {
  const ctx = useContext(AppContext);

  return (
    <>
      <div
        className="z-50"
        onClick={() => {
          ctx.streamModalHandler();
        }}
      >
        <button className="w-[55rem] h-[45px] rounded-md text-xl bg-[#54B435] text-white font-semibold">
          Start streaming
        </button>
      </div>
    </>
  );
};

export default StreamBar;
