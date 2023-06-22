import { BiHomeHeart } from "react-icons/bi";
import { TiFlowChildren, TiFlowParallel } from "react-icons/ti";
import { useContext } from "react";
import { AppContext } from "@/context/StateContext";

const Option = ({ title }) => {
  const ctx = useContext(AppContext);

  const changeOptionHandler = () => {
    if (title === ctx.sharedState.page) return;

    ctx.sharedState.setPageHandler(title);
  };

  return (
    <div
      className={`w-[155px] h-[35px] rounded-md text-center cursor-pointer hover:bg-green-100 ${
        ctx.sharedState.page === title && "bg-green-100 text-green-800"
      }`}
      onClick={changeOptionHandler}
    >
      <h3 className="font-semibold text-md mb-6 m-auto inline-flex">
        <span className="mt-2 mr-2">
          {title === "Home" ? (
            <BiHomeHeart />
          ) : title === "On going streams" ? (
            <TiFlowChildren />
          ) : (
            <TiFlowParallel />
          )}
        </span>
        <span className="mt-1">{title}</span>
      </h3>
    </div>
  );
};

export default Option;
