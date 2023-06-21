import classes from "../Profile/Intro.module.css";

const Posts = () => {
  return (
    <div className="border-2 border-solid rounded-lg border-gray-200 w-[88%]">
      <div className="flex gap-2 ml-8 mt-8 mb-8">
        <div>
          <img
            src="/profile.webp"
            alt="Lens profile picture"
            className="w-8 rounded-full mt-2"
          />
        </div>
        <div className="font-medium ml-1 text-[14px] text-gray-600">
          <h3>0xvaibhav</h3>
          <div className="flex gap-1">
            <h3 className={classes.background}>@0xVaibhav</h3>
            <span> | </span>
            <h4>Feb 10</h4>
          </div>
        </div>
      </div>
      <div className="mt-8 ml-12 text-[17px] font-medium text-gray-800 mb-8">
        <p>I can't stop making jellie frogies...</p>
      </div>
    </div>
  );
};

export default Posts;
