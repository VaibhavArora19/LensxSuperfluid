import classes from "../Profile/Intro.module.css";
import { usePublications } from "@lens-protocol/react-web";
import { IpfsImage } from "react-ipfs-image";

const Posts = ({ id }: any) => {
  const {
    data: publication,
    loading,
    hasMore,
    next,
  } = usePublications({
    profileId: id,
    limit: 10,
  });

  const convertDate = (date: any) => {
    const timestamp = date;
    const dateObj = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = dateObj.toLocaleDateString("en-US", options as any);

    return formattedDate;
  };
  return (
    <>
      {publication &&
        publication.map((pub) => {
          if ((pub as any)?.metadata?.content.includes("#superfluid")) {
            return (
              <div className="border-2 border-solid rounded-lg border-gray-200 w-[88%] mb-2">
                <div className="flex gap-2 ml-8 mt-8 mb-8">
                  <div>
                    {(pub.profile.picture as any).original.url ? (
                      <>
                        {(pub.profile.picture as any).original?.url.startsWith(
                          "ipfs"
                        ) ? (
                          <IpfsImage
                            hash={(pub.profile.picture as any).original?.url}
                            className="w-8 rounded-full mt-2"
                          />
                        ) : (
                          <img
                            src={(pub.profile.picture as any).original?.url}
                            className="w-8 rounded-full mt-2"
                          />
                        )}
                      </>
                    ) : (
                      <img
                        src="/profile.png"
                        className="w-8 rounded-full mt-2"
                      />
                    )}
                  </div>

                  <div className="font-medium ml-1 text-[14px] text-gray-600">
                    <h3>
                      {pub.profile.name ? pub.profile.name : pub.profile.handle}
                    </h3>
                    <div className="flex gap-1">
                      <h3 className={classes.background}>
                        @{pub.profile.handle}
                      </h3>
                      <span> | </span>
                      {}
                      <h4>{convertDate(pub.createdAt)}</h4>
                    </div>
                  </div>
                </div>
                <div className="mt-8 ml-20 text-[17px] font-medium text-gray-800 mb-8">
                  <p>{(pub as any).metadata.content}</p>
                  {(pub as any).metadata.media.length > 0 &&
                    (pub as any).metadata.media.map((media: any) => {
                      return (
                        <IpfsImage
                          hash={media.original.url}
                          className="mt-2 w-60"
                        />
                      );
                    })}
                </div>
              </div>
            );
          }
        })}
    </>
  );
};

export default Posts;
