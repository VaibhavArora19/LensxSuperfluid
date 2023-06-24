import classes from "./InfoCard.module.css";
import { useContext } from "react";
import { AppContext } from "@/context/StateContext";

const ModalCard = ({ children }) => {
  const ctx = useContext(AppContext);

  return (
    <div
      className={`flex gap-2 rounded-xl ${classes.shadow} w-[220px] h-[55px] items-center mb-6`}
      onClick={() => {
        ctx.sharedState.streamModalHandler();
      }}
    >
      <div className="bg-white w-[80%]">{children}</div>
    </div>
  );
};

export default ModalCard;
