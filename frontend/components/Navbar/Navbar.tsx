import { useEffect, useState } from "react";
import Link from "next/link";
import { useWalletLogin } from "@lens-protocol/react-web";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { getProfile } from "../lens/utils";
import { useRouter } from "next/router";
import { IpfsImage } from "react-ipfs-image";
const Navbar = () => {
  const [username, setUsername] = useState("");
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);
  async function getProfileInfo() {
    const profileInfo = await getProfile(username);

    if (profileInfo !== null) {
      setProfile(profileInfo);
    }
  }
  useEffect(() => {
    if (username !== "") {
      getProfileInfo();
      setShow(true);
    }
  }, [username]);

  const {
    execute: login,
    error: loginError,
    isPending: isLoginPending,
  } = useWalletLogin();

  const { isConnected, address } = useAccount();
  const { disconnectAsync } = useDisconnect();

  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
  });

  const onLoginClick = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer);
    }
  };

  if (!mounted) return null;

  return (
    <nav className="flex justify-between mt-6 border-b-2 border-solid">
      <div className="flex gap-4 ml-20 mb-4">
        <Link href="/">
          <h1 className="text-3xl cursor-pointer font-bold">Superlens</h1>
        </Link>
        <div>
          <div>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              placeholder="Search..."
              className="mt-1 ml-2 h-[2.2rem] w-[15rem] text-black pl-4 border-2 border-solid focus:outline-none focus:border-green-400 rounded-md"
            />
          </div>
          {show && profile != null && (
            <div
              className="z-50 absolute bg-white pt-2 ml-2 border-b-2 border-r-2 border-l-2 w-[240px] border-solid border-gray-300 rounded-md cursor-pointer"
              onClick={() => {
                router.push(`/profile/${profile?.ownedBy}`);
                setShow(false);
                setUsername("");
              }}
            >
              <div className="flex gap-2 mt-[2px] mb-[4px]">
                {profile !== null && profile?.picture?.original?.url ? (
                  <>
                    {profile?.picture?.original?.url.startsWith("ipfs") ? (
                      <IpfsImage
                        hash={profile?.picture?.original?.url}
                        className="w-8 h-8 ml-2 rounded-full"
                      />
                    ) : (
                      <img
                        src={profile?.picture?.original?.url}
                        className="w-8 h-8 ml-2 rounded-full"
                      />
                    )}
                  </>
                ) : (
                  <img
                    src="/profile.png"
                    className="w-8 h-8 ml-2 rounded-full"
                  />
                )}
                <div>
                  <h4 className="text-sm font-medium">{profile?.handle}</h4>
                  <h4 className="ml-[2px] text-[13px] font-medium">
                    {profile?.ownedBy.substring(0, 5) +
                      "..." +
                      profile.ownedBy.substring(38, 43)}
                  </h4>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4 ml-2 font-semibold mt-[12px]">
          {/* <Link href="/stream">
            <h3 className="cursor-pointer hover:bg-gray-200 rounded-md w-28 text-center">
              Send Tokens
            </h3>
          </Link> */}
          {address ? (
            <Link href={`/profile/${address}`}>
              <h3 className="cursor-pointer hover:bg-gray-200 rounded-md w-16 text-center">
                Profile
              </h3>
            </Link>
          ) : (
            <Link href={`/wallet`}>
              <h3 className="cursor-pointer hover:bg-gray-200 rounded-md w-16 text-center">
                Profile
              </h3>
            </Link>
          )}
          <Link href="/stream">
            <h3 className="cursor-pointer hover:bg-gray-200 rounded-md w-16 text-center">
              Stream
            </h3>
          </Link>
        </div>
      </div>

      <div className="mr-12">
        <button
          className="bg-[#54B435] hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
          disabled={isLoginPending}
          onClick={onLoginClick}
        >
          {!address
            ? "Login With Lens"
            : address.substring(0, 5) + "..." + address.substring(38, 43)}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
