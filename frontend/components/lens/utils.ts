import { LensClient, development } from "@lens-protocol/client";
import { Post } from "@lens-protocol/react-web";
import { PublicationTypes } from "@lens-protocol/client";
const lensClient = new LensClient({
  environment: development,
});

export const nameToAddress = async (name: string) => {
  const profileByHandle = await lensClient.profile.fetch({
    handle: name + ".test",
  });
  return profileByHandle?.ownedBy;
};
export const addressToName = async (address: string) => {
  const allOwnedProfiles = await lensClient.profile.fetchAll({
    ownedBy: [address],
    limit: 1,
  });

  // defaultProfile is a ProfileFragment
  const defaultProfile = allOwnedProfiles.items[0];
  return defaultProfile?.handle;
};

export const getProfile = async (name: string) => {
  const profileByHandle = await lensClient.profile.fetch({
    handle: name + ".test",
  });

  return profileByHandle;
};

export const getProfileByAddress = async (address: string) => {
  const name = await addressToName(address);

  if (!name) return undefined;

  const profileByHandle = await lensClient.profile.fetch({
    handle: name,
  });

  return profileByHandle;
};

export const getPublications = async () => {
  const result = await lensClient.publication.fetchAll({
    profileIds: ["0x76cd", "0x15"],
    publicationTypes: [PublicationTypes.Post],
    limit: 50,
  });
  return result.items;
};
