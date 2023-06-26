import { ReactNode, createContext, useState } from "react";

type ISharedState = {
  page: string;
  followModal: boolean;
  unfollowModal: boolean;
  showStreamModal: boolean;
  showPermissionModal: boolean;
  streamModalHandler: () => void;
  permissionModalHandler: () => void;
  followModalHandler: () => void;
  unfollowModalHandler: () => void;
  setPageHandler: (pageName: string) => void;
};

const defaultValues: ISharedState = {
  page: "",
  followModal: false,
  unfollowModal: false,
  showStreamModal: false,
  showPermissionModal: false,
  followModalHandler: () => {},
  unfollowModalHandler: () => {},
  streamModalHandler: () => {},
  permissionModalHandler: () => {},
  setPageHandler: (pageName: string) => {},
};

export const AppContext = createContext<ISharedState>(defaultValues);

type Props = {
  children: ReactNode;
};

export const AppWrapper = ({ children }: Props): JSX.Element => {
  const [page, setPage] = useState("Home");
  const [followModal, setFollowModal] = useState(false);
  const [unfollowModal, setUnfollowModal] = useState(false);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const setPageHandler = (pageName: string) => {
    setPage(pageName);
  };

  const followModalHandler = () => {
    setFollowModal(!followModal);
  };
  const unfollowModalHandler = () => {
    setUnfollowModal(!unfollowModal);
  };

  const streamModalHandler = () => {
    setShowStreamModal(!showStreamModal);
  };

  const permissionModalHandler = () => {
    setShowPermissionModal(!showPermissionModal);
  };

  const sharedState: ISharedState = {
    page,
    followModal,
    unfollowModal,
    followModalHandler,
    unfollowModalHandler,
    showStreamModal,
    showPermissionModal,
    streamModalHandler,
    permissionModalHandler,
    setPageHandler,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export default AppWrapper;
