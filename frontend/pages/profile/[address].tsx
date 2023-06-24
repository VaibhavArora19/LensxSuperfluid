import Calendar from "@/components/Calendar/Calendar";
import Intro from "@/components/Profile/Intro";
import Posts from "@/components/UI/Posts";
import StreamBar from "@/components/UI/StreamBar";
import { useContext } from "react";
import { AppContext } from "@/context/StateContext";
import StreamMessage from "@/components/UI/StreamMessage";
import Modal from "@/components/Follow/Modal";

const Profile = () => {
  const ctx = useContext(AppContext);
  const showModal = ctx.sharedState.showModal;

  return (
    <div className="mb-[1000px]">
      <Intro />
      {ctx.sharedState.page === "Home" ? (
        <div className="relative bottom-[110px]">
          <div className="ml-[1rem]">
            <Calendar />
          </div>
          <div className="ml-[32rem]">
            <StreamBar />
          </div>
          <div className="ml-[32rem] mt-[4rem]">
            <h2 className="text-xl font-semibold ml-[1rem] mb-6">
              Super posts
            </h2>
            <Posts />
          </div>
        </div>
      ) : ctx.sharedState.page === "On going streams" ? (
        <div className="ml-[33.5rem] relative bottom-[110px]">
          <h2 className="font-semibold text-xl mb-6 ml-[10px]">
            Currently ongoing streams
          </h2>
          <StreamMessage
            isActive={true}
            sender={"0xVaibhav"}
            receiver={"DineshAitham"}
            flowRate={"100fDaix/second"}
          />
          <StreamMessage
            isActive={true}
            sender={"0xVaibhav"}
            receiver={"DineshAitham"}
            flowRate={"100fDaix/second"}
          />
        </div>
      ) : (
        <></>
      )}
      {showModal && <Modal />}
    </div>
  );
};

export default Profile;
