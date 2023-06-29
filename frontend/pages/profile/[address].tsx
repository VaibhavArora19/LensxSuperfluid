"use client";

import Calendar from "@/components/Calendar/Calendar";
import Intro from "@/components/Profile/Intro";
import Posts from "@/components/UI/Posts";
import { useContext, useEffect } from "react";
import { gql, useQuery } from "urql";
import { AppContext } from "@/context/StateContext";
import StreamMessage from "@/components/UI/StreamMessage";
import Modal from "@/components/Follow/Modal";
import StreamModal from "@/components/Superfluid/StreamModal";
import AchievementCard from "@/components/UI/AchievementCard";
import { useAccount } from "wagmi";
import { useState } from "react";
import { useActiveProfile } from "@lens-protocol/react-web";
import PermissionModal from "@/components/Superfluid/PermissionModal";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { getProfileByAddress, addressToName } from "@/components/lens/utils";
const sendingStreamsQuery = gql`
  query sendingStreamsQuery($sender: ID = "") {
    streams(where: { sender: $sender }) {
      currentFlowRate
      receiver {
        id
      }
      createdAtTimestamp
      token {
        name
        symbol
      }
      streamedUntilUpdatedAt
    }
  }
`;

///formula to get total amount streamed till now is -> streamedUntilUpdatedAt + ((currentTime in seconds) - updatedAtTimestamp) * currentFlowRate

const receivingStreamsQuery = gql`
  query ($receiver: ID = "") {
    streams(where: { receiver: $receiver }) {
      currentFlowRate
      receiver {
        id
      }
      sender {
        id
      }
      token {
        name
        symbol
      }
      createdAtTimestamp
      streamedUntilUpdatedAt
    }
  }
`;

const Profile = () => {
  const router = useRouter();
  const { address } = router.query;
  const [allStreams, setAllStreams] = useState<any>([]);
  const [activeStreams, setActiveStreams] = useState<any>([]);
  const ctx = useContext(AppContext);
  const setProfile = ctx.setProfile;
  const followModal = ctx.followModal;
  const unfollowModal = ctx.unfollowModal;
  const showStreamModal = ctx.showStreamModal;
  const showPermissionModal = ctx.showPermissionModal;
  const [data, setData] = useState<any>(null);
  // const { data, error, loading } = useActiveProfile();
  const [mostStreamed, setMostStreamed] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  useState(() => {
    setMounted(true);
  });
  const sender = (address as any)?.toLowerCase();
  const receiver = (address as any)?.toLowerCase();
  const [result1] = useQuery({
    query: sendingStreamsQuery,
    variables: { sender },
  });
  const [result2] = useQuery({
    query: receivingStreamsQuery,
    variables: { receiver },
  });

  async function getData(address: string) {
    const profile = await getProfileByAddress(address as any);
    setData(profile);
    setProfile(profile as any);
  }

  useEffect(() => {
    if (address) {
      getData(address as any);
    }
  }, [address]);

  useEffect(() => {
    console.log(result1.data);
    if (result1.data !== undefined && result2.data !== undefined) {
      console.log("mounted");
      let sortedStreams = [...result1.data.streams, ...result2.data.streams];

      sortedStreams.forEach((stream) => {
        stream.totalFlow =
          stream.streamedUntilUpdatedAt +
          (Date.now() / 1000 - stream.createdAtTimestamp) *
            Number(
              ethers.utils.formatUnits(stream.currentFlowRate, 18).toString()
            );
      });
      sortedStreams.sort((a, b) => b.createdAtTimestamp - a.createdAtTimestamp);
      const activeStreamsData = sortedStreams.filter(
        (stream) => stream.currentFlowRate != 0
      );

      let streamed;
      let flowRate = -1;
      for (const stream of sortedStreams) {
        if (stream.streamedUntilUpdatedAt > flowRate) {
          streamed = stream;
          flowRate = stream.streamedUntilUpdatedAt;
        }
      }
      setMostStreamed(streamed);
      setAllStreams(sortedStreams);
      setActiveStreams(activeStreamsData);
    }
  }, [result1.data, result2.data]);

  if (!mounted) return null;

  if (data == null) return <p>Loading...</p>;

  // if (error) return <p>{error.message}</p>;

  // if (data === null) return <p>No active profile selected</p>;

  return (
    <div className="mb-[10px]">
      <Intro data={data} />
      {(ctx as any).page === "Home" ? (
        <div className="relative bottom-[110px] -z-10">
          <div className="ml-[1rem]">
            {allStreams.length > 0 && <Calendar data={allStreams} />}
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
          {allStreams.length > 0 && (
            <div className="ml-[32rem] mt-[4rem]">
              <h2 className="text-xl font-semibold ml-[1rem] mb-6">
                Achievements
              </h2>
              <div className="grid grid-cols-2">
                <AchievementCard
                  title="First superfluid stream"
                  date={allStreams[allStreams.length - 1].createdAtTimestamp}
                  token={allStreams[allStreams.length - 1].token.symbol}
                  streamed={
                    allStreams[allStreams.length - 1].streamedUntilUpdatedAt
                  }
                />
                <AchievementCard
                  title="Most streamed"
                  date={mostStreamed?.createdAtTimestamp}
                  token={mostStreamed?.token.symbol}
                  streamed={mostStreamed?.streamedUntilUpdatedAt}
                />
              </div>
            </div>
          )}
        </div>
      ) : (ctx as any).page === "On going streams" ? (
        <div className="ml-[33.5rem] relative bottom-[110px]">
          <h2 className="font-semibold text-xl mb-6 ml-[10px]">
            Currently ongoing streams
          </h2>
          {activeStreams.length === 0 && (
            <h3 className="mt-[10px] ml-[15px] text-xl">No active streams!!</h3>
          )}
          {address &&
            activeStreams.map((stream: any) => {
              return (
                <StreamMessage
                  isActive={true}
                  sender={stream?.sender?.id || (address as any)}
                  createdAt={stream.createdAtTimestamp}
                  receiver={stream.receiver.id}
                  flowRate={stream.currentFlowRate}
                  balance={stream.totalFlow}
                  token={stream.token.symbol}
                  streamUntilUpdatedAt={stream.streamedUntilUpdatedAt}
                  time={"second"}
                />
              );
            })}
        </div>
      ) : (
        <div className="ml-[33.5rem] relative bottom-[110px]">
          <h2 className="font-semibold text-xl mb-6 ml-[10px]">All streams</h2>
          {address &&
            allStreams.map((stream: any) => {
              return (
                <StreamMessage
                  isActive={stream.currentFlowRate != 0 ? true : false}
                  sender={stream?.sender?.id || address}
                  createdAt={stream.createdAtTimestamp}
                  receiver={stream.receiver.id}
                  flowRate={stream.currentFlowRate}
                  balance={stream.totalFlow}
                  streamUntilUpdatedAt={stream.streamedUntilUpdatedAt}
                  token={stream.token.symbol}
                  time={"second"}
                />
              );
            })}
        </div>
      )}
      {followModal && <Modal />}
      {unfollowModal && <Modal />}
      {showStreamModal && <StreamModal username={data.handle} />}
      {showPermissionModal && <PermissionModal username={data.handle} />}
    </div>
  );
};

export default Profile;
