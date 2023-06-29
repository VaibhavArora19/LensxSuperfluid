import { getProfileByAddress } from "../lens/utils";
import classes from "./InfoCard.module.css";
import { useEffect, useState } from "react";
import { IpfsImage } from "react-ipfs-image";

const InfoCard = ({ address }: { address: string }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!address) return;

    async function getDetails() {
      const profile = await getProfileByAddress(address);

      if (profile) setUser(profile);
    }

    getDetails();
  }, [address]);
  console.log(user?.picture?.original?.url.startsWith("ipfs"));
  console.log("user", user);
  return (
    <div
      className={`flex gap-2 rounded-xl ${classes.shadow} w-[220px] h-[55px] items-center mb-6`}
    >
      <div className=" ml-2">
        {user !== null && user?.picture?.original?.url ? (
          <>
            {user?.picture?.original?.url.startsWith("ipfs") ? (
              <IpfsImage
                hash={user?.picture?.original?.url}
                className="rounded-lg w-9 h-9"
              />
            ) : (
              <img
                src={user?.picture?.original?.url}
                className="rounded-lg w-9 h-9"
              />
            )}
          </>
        ) : (
          <img src="/profile.png" className="rounded-lg w-9 h-9" />
        )}
      </div>
      <div>
        <h3 className="text-[17px] font-small">
          {user !== null
            ? user.handle
            : address.substring(0, 4) + "..." + address.substring(38, 43)}
        </h3>
        <h3 className="text-[13px] ">
          {address.substring(0, 4) + "..." + address.substring(38, 43)}
        </h3>
      </div>
    </div>
  );
};

export default InfoCard;
