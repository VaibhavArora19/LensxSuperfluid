import { useContext } from "react";
import { AppContext } from "@/context/StateContext";
import classes from "./Modal.module.css";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  useProfileFollowers,
  useActiveProfile,
  useProfileFollowing,
  useUnfollow,
  useFollow,
} from "@lens-protocol/react-web";
import { IpfsImage } from "react-ipfs-image";
import { useRouter } from "next/router";

const Backdrop = () => {
  const ctx = useContext(AppContext);
  const router = useRouter();
  return (
    <>
      <div
        className={`fixed flex top-0 w-[100%] right-0 z-10 left-0 bottom-0 items-center justify-center ${classes.modal}`}
        onClick={() => {
          if (ctx.followModal) ctx.followModalHandler();
          else ctx.unfollowModalHandler();
        }}
      ></div>
      ;
    </>
  );
};

const FollowModal = () => {
  const router = useRouter();
  const ctx = useContext(AppContext);
  const profile = ctx.profile;
  const {
    data: followers,
    loading,
    hasMore,
    next,
  } = useProfileFollowers({
    profileId: profile?.id as any,
    limit: 10,
  });
  return (
    <div className="w-[30%] fixed overflow-y-scroll flex flex-col top-[10%] right-0 left-[35%] bottom-0 z-20 h-[80%] bg-white rounded-lg">
      <div className="mb-2 pb-2 border-b-2 border-solid border-gray-300 mt-4">
        <h2 className="pl-6 text-lg font-medium flex gap-2">
          <span className="mt-[4px] text-[#54B435]">
            <BsFillPeopleFill />
          </span>{" "}
          Followers
        </h2>
      </div>
      {followers?.map((pro: any) => {
        const profile = pro.wallet.defaultProfile;
        return (
          <div
            className="flex gap-2 cursor-pointer py-2 border-b-2 border-solid border-gray-200 items-center justify-between px-6"
            onClick={() => {
              router.push(`/profile/${profile.ownedBy}`);
              ctx.followModalHandler();
            }}
          >
            <div className="flex items-center gap-1">
              <div className="mt-2">
                {(profile.picture as any)?.original.url ? (
                  <>
                    {profile?.picture?.original?.url.startsWith("ipfs") ? (
                      <IpfsImage
                        hash={profile?.picture?.original?.url}
                        className="w-8 rounded-full"
                      />
                    ) : (
                      <img
                        src={profile?.picture?.original?.url}
                        className="w-8 rounded-full"
                      />
                    )}
                  </>
                ) : (
                  <img src="/profile.png" className="w-8 rounded-full" />
                )}
                {/* {(profile.picture as any).original.url ? (
                  <IpfsImage hash={profile.picture.original.url} />
                ) : (
                  <img src="/profile.png" className="w-8 rounded-full" />
                )} */}
              </div>
              <div className="ml-[10px] mt-2 font-medium">
                <h2 className={`text-[1rem]`}>
                  {profile.name ? profile.name : profile.handle}
                </h2>
                <h2 className={`text-[0.8rem] mb-2 ${classes.background}`}>
                  {profile.ownedBy.slice(0, 6) +
                    "......" +
                    profile.ownedBy.slice(-4)}
                </h2>
              </div>
            </div>
            <div>
              <FollowProfile profile={profile} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

function UnfollowProfile({ profile }: any) {
  const ctx = useContext(AppContext);
  const pro = ctx.profile;
  const { execute: unfollow, isPending } = useUnfollow({
    followee: profile,
    follower: pro,
  } as any);

  if (!profile.isFollowedByMe) {
    return null;
  }

  return (
    <button
      onClick={unfollow}
      disabled={isPending}
      className="bg-[#FF0000] rounded-lg text-white px-2 py-1"
    >
      {isPending ? "Unfollowing..." : "Unfollow"}
    </button>
  );
}

function FollowProfile({ profile }: any) {
  const ctx = useContext(AppContext);
  const pro = ctx.profile;
  const { execute: follow, isPending } = useFollow({
    followee: profile,
    follower: pro,
  } as any);

  if (profile.isFollowedByMe) {
    return <p>Following</p>;
  }

  return (
    <button
      onClick={follow}
      disabled={isPending}
      className="bg-[#FF0000] rounded-lg text-white px-2 py-1"
    >
      {isPending ? "Follow in progress..." : "Follow"}
    </button>
  );
}

const UnfollowModal = () => {
  const router = useRouter();
  const ctx = useContext(AppContext);
  const profile = ctx.profile;

  const {
    data: following,
    loading,
    hasMore,
    next,
  } = useProfileFollowing({
    walletAddress: profile?.ownedBy as any,
    limit: 10,
  });

  return (
    <div className="w-[30%] fixed overflow-y-scroll flex flex-col top-[10%] right-0 left-[35%] bottom-0 z-20 h-[80%] bg-white rounded-lg">
      <div className="mb-2 pb-2 border-b-2 border-solid border-gray-300 mt-4">
        <h2 className="pl-6 text-lg font-medium flex gap-2">
          <span className="mt-[4px] text-[#54B435]">
            <BsFillPeopleFill />
          </span>{" "}
          Following
        </h2>
      </div>
      {following?.map((profile: any) => {
        return (
          <div
            className="flex gap-2 cursor-pointer py-2 border-b-2 border-solid border-gray-200 items-center justify-between px-6"
            onClick={() => {
              router.push(`/profile/${profile.profile.ownedBy}`);
              ctx.unfollowModalHandler();
            }}
          >
            <div className="flex items-center gap-1">
              <div className="mt-2">
                {(profile.profile.picture as any)?.original.url ? (
                  <img
                    src={(profile.profile.picture as any).original.url}
                    className="w-8 rounded-full"
                  />
                ) : (
                  <img src="/profile.png" className="w-8 rounded-full" />
                )}
              </div>
              <div className="ml-[10px] mt-2 font-medium">
                <h2 className={`text-[1rem]`}>
                  {profile.profile.name
                    ? profile.profile.name
                    : profile.profile.handle}
                </h2>
                <h2 className={`text-[0.8rem] mb-2 ${classes.background}`}>
                  {profile.profile.ownedBy.slice(0, 6) +
                    "......" +
                    profile.profile.ownedBy.slice(-4)}
                </h2>
              </div>
            </div>
            <div>
              <UnfollowProfile profile={profile.profile} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
const Modal = () => {
  const ctx = useContext(AppContext);

  return (
    <>
      <Backdrop />
      {ctx.followModal ? <FollowModal /> : <UnfollowModal />}
    </>
  );
};

export default Modal;
