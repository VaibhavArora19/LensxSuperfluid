import classes from "./Modal.module.css";

const UserCard = () => {
  return (
    <div className="flex gap-2 cursor-pointer mt-2 border-b-2 border-solid border-gray-200">
      <div className="ml-6 mt-2">
        <img
          src="/profile.webp"
          alt="lens profile"
          className="w-10 h-10 rounded-full"
        />
      </div>
      <div className="ml-[10px] mt-2 font-medium">
        <h2 className={`text-[1rem]`}>0xVaibhav</h2>
        <h2 className={`text-[0.8rem] mb-2 ${classes.background}`}>
          0x23...f78a1
        </h2>
      </div>
    </div>
  );
};

export default UserCard;
