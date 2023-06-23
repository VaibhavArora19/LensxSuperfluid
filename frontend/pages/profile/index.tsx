import Calendar from "@/components/Calendar/Calendar";
import Intro from "@/components/Profile/Intro";
import Posts from "@/components/UI/Posts";
import StreamBar from "@/components/UI/StreamBar";
import { useContext } from "react";
import { AppContext } from "@/context/StateContext";
import StreamMessage from "@/components/UI/StreamMessage";
import { useState } from "react";
import { useActiveProfile } from "@lens-protocol/react-web";
import { useEffect } from "react";
const Profile = () => {
  const ctx = useContext(AppContext);

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
            <Posts id={data.id} />
          </div>
        </>
      ) : (ctx as any).page === "On going streams" ? (
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
