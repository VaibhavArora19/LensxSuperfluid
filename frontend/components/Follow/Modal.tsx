import { useContext } from "react";
import { AppContext } from "@/context/StateContext";
import classes from "./Modal.module.css";
import UserCard from "./UserCard";

const Modal = () => {
  const ctx = useContext(AppContext);

  return (
    <div
      className={`fixed flex top-0 w-[100%] right-0 left-0 bottom-0 items-center justify-center ${classes.modal}`}
      onClick={() => {
        ctx.sharedState.modalHandler();
      }}
    >
      <div className="w-[30%] h-[80%] bg-white rounded-lg">
        <UserCard />
      </div>
    </div>
  );
};

export default Modal;
