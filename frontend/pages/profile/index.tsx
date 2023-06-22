import Calendar from "@/components/Calendar/Calendar";
import Intro from "@/components/Profile/Intro";
import Posts from "@/components/UI/Posts";
import StreamBar from "@/components/UI/StreamBar";
import { useContext } from "react";
import { AppContext } from "@/context/StateContext";
import StreamMessage from "@/components/UI/StreamMessage";

const Profile = () => {
  const ctx = useContext(AppContext);

  return (
    <div className="mb-[1000px]">
      <Intro />
      {ctx.sharedState.page === "Home" ? (
        <>
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
        </>
      ) : ctx.sharedState.page === "On going streams" ? (
        <div className="ml-[36.5rem]">
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
    </div>
  );
};

export default Profile;
