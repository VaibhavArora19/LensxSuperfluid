import { BsDot } from "react-icons/bs";

const AchievementCard = () => {
  return (
    <div className="border-2 border-solid rounded-lg border-gray-200 w-[78%] mb-2">
      <div className="flex justify-between">
        <div className="flex gap-2 ml-8 mt-8 mb-8">
          <div>
            {/* {(pub.profile.picture as any).original.url ? (
            <img
              src={(pub.profile.picture as any).original.url}
              className="w-8 rounded-full mt-2"
            />
          ) : ( */}
            <img src="/profile.png" className="w-8 rounded-full mt-2" />
            {/* )} */}
          </div>
          <div className="ml-4">
            <h2 className="font-medium text-green-600 text-lg">
              First superfluid stream
            </h2>
            <h3 className="font-medium text-gray-600">24 June 2023</h3>
          </div>
        </div>
        <div className="mt-[33px] mr-[14px] w-[35px] h-[35px]">
          <img
            src="/superfluid.jpg"
            alt="Superfluid image"
            className="w-[35px] h-[35px]"
          />
        </div>
      </div>
      <div className="flex gap-1 ml-[90px] mb-4 font-medium text-gray-500">
        <h3>fDAIx</h3>
        <span className="pt-[5px]">
          <BsDot />
        </span>
        <h3>0.1/sec</h3>
      </div>
    </div>
  );
};

export default AchievementCard;
