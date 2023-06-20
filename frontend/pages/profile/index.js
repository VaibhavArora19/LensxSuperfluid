import Calendar from "@/components/Calendar/Calendar";
import Intro from "@/components/Profile/Intro";

const Profile = () => {
  return (
    <>
      <Intro />
      <div className="mt-60">
        <h1>Hello</h1>
        <Calendar />
      </div>
    </>
  );
};

export default Profile;
