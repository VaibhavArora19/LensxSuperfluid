import Calendar from "@/components/Calendar/Calendar";
import Intro from "@/components/Profile/Intro";
import Posts from "@/components/UI/Posts";
import StreamBar from "@/components/UI/StreamBar";

const Profile = () => {
  return (
    <div className="mb-[1000px]">
      <Intro />
      <div className="ml-[1rem]">
        <Calendar />
      </div>
      <div className="ml-[32rem]">
        <StreamBar />
      </div>
      <div className="ml-[32rem] mt-[4rem]">
        <h2 className="text-xl font-semibold ml-[1rem] mb-6">Super posts</h2>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;
