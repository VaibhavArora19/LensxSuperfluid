import { useContext } from "react";
import { AppContext } from "@/context/StateContext";
import classes from "./Modal.module.css";
import UserCard from "./UserCard";

const Backdrop = () => {
  const ctx = useContext(AppContext);
  return (
    <>
      <div
        className={`fixed flex top-0 w-[100%] right-0 z-10 left-0 bottom-0 items-center justify-center ${classes.modal}`}
        onClick={() => {
          ctx.modalHandler();
        }}
      ></div>
      ;
    </>
  );
};

const FollowModal = () => {
  return (
    <div className="w-[30%] fixed flex top-[10%] right-0 left-[35%] bottom-0 z-20 h-[80%] bg-white rounded-lg">
      <UserCard />
    </div>
  );
};
const Modal = () => {
  return (
    <>
      <Backdrop />
      <FollowModal />
    </>
  );
};

export default Modal;
