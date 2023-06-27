import { LensClient, development } from "@lens-protocol/client";

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
  return defaultProfile.handle;
};

export const getProfile = async (name: string) => {
  const profileByHandle = await lensClient.profile.fetch({
    handle: name + ".test",
  });

  return profileByHandle
}