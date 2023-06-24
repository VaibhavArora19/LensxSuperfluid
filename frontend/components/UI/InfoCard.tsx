import classes from "./InfoCard.module.css";

const InfoCard = () => {
  return (
    <div
      className={`flex gap-2 rounded-xl ${classes.shadow} w-[220px] h-[55px] items-center mb-6`}
    >
      <div className=" ml-2">
        <img src="/profile.webp" className="rounded-lg w-9 h-9" />
      </div>
      <div>
        <h3 className="text-[17px] font-small">0xVaibhav</h3>
        <h3 className="text-[13px] ">0x34...8912</h3>
      </div>
    </div>
  );
};

export default InfoCard;
