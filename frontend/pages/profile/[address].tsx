"use client";

import Calendar from "@/components/Calendar/Calendar";
import Intro from "@/components/Profile/Intro";
import Posts from "@/components/UI/Posts";
import StreamBar from "@/components/UI/StreamBar";
import { useContext } from "react";
import { AppContext } from "@/context/StateContext";
import StreamMessage from "@/components/UI/StreamMessage";
import Modal from "@/components/Follow/Modal";
import StreamModal from "@/components/Superfluid/StreamModal";
import AchievementCard from "@/components/UI/AchievementCard";

import { useState } from "react";
import { useActiveProfile } from "@lens-protocol/react-web";
import { useEffect } from "react";
import PermissionModal from "@/components/Superfluid/PermissionModal";
const Profile = () => {
  const ctx = useContext(AppContext);
  const followModal = ctx.followModal;
  const unfollowModal = ctx.unfollowModal;
  const showStreamModal = ctx.showStreamModal;
  const showPermissionModal = ctx.showPermissionModal;

  const { data, error, loading } = useActiveProfile();
  const [mounted, setMounted] = useState(false);
  console.log(data);

  useState(() => {
    setMounted(true);
  });

  if (!mounted) return null;

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  if (data === null) return <p>No active profile selected</p>;

  return (
    <div className="mb-[1000px]">
      <Intro data={data} />
      {(ctx as any).page === "Home" ? (
        <div className="relative bottom-[110px] -z-10">
          <div className="ml-[1rem]">
            <Calendar />
          </div>
          {/* <div className="ml-[32rem]">
            <StreamBar />
          </div> */}
          <div className="ml-[32rem] mt-[2rem]">
            <h2 className="text-xl font-semibold ml-[1rem] mb-6">
              Super posts
            </h2>
            <Posts id={data.id} />
          </div>
          <div className="ml-[32rem] mt-[4rem]">
            <h2 className="text-xl font-semibold ml-[1rem] mb-6">
              Achievements
            </h2>
            <div className="grid grid-cols-2">
              <AchievementCard />
              <AchievementCard />
            </div>
          </div>
        </div>
      ) : (ctx as any).page === "On going streams" ? (
        <div className="ml-[33.5rem] relative bottom-[110px]">
          <h2 className="font-semibold text-xl mb-6 ml-[10px]">
            Currently ongoing streams
          </h2>
          <StreamMessage
            isActive={true}
            sender={"0xVaibhav"}
            receiver={"DineshAitham"}
            flowRate={0.1}
            balance={0}
            time={"second"}
          />
          <StreamMessage
            isActive={true}
            sender={"0xVaibhav"}
            receiver={"DineshAitham"}
            flowRate={0.001}
            balance={0}
            time={"second"}
          />
        </div>
      ) : (
        <></>
      )}
      {followModal && <Modal />}
      {unfollowModal && <Modal />}
      {showStreamModal && <StreamModal />}
      {showPermissionModal && <PermissionModal />}
    </div>
  );
};

export default Profile;
