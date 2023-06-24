import classes from "../Follow/Modal.module.css";
import { ReactNode, useContext } from "react";
import { AppContext } from "@/context/StateContext";

const ModalCard = ({ type }: { type: string }) => {
  const ctx = useContext(AppContext);

  return (
    <div
      className={`fixed flex top-0 w-[100%] right-0 left-0 bottom-0 z-10 items-center justify-center ${classes.modal}`}
      onClick={() => {
        type === "stream"
          ? ctx.streamModalHandler()
          : ctx.permissionModalHandler();
      }}
    ></div>
  );
};

export default ModalCard;
