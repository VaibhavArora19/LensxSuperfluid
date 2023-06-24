import { ReactNode, createContext, useState } from "react";

type ISharedState = {
  page: string;
  showModal: boolean;
  showStreamModal: boolean;
  showPermissionModal: boolean;
  streamModalHandler: () => void;
  permissionModalHandler: () => void;
  modalHandler: () => void;
  setPageHandler: (pageName: string) => void;
};

const defaultValues: ISharedState = {
  page: "",
  showModal: false,
  showStreamModal: false,
  showPermissionModal: false,
  modalHandler: () => {},
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
  const [showModal, setShowModal] = useState(false);
  const [showStreamModal, setShowStreamModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const setPageHandler = (pageName: string) => {
    setPage(pageName);
  };

  const modalHandler = () => {
    setShowModal(!showModal);
  };

  const streamModalHandler = () => {
    setShowStreamModal(!showStreamModal);
  };

  const permissionModalHandler = () => {
    setShowPermissionModal(!showPermissionModal);
  };

  const sharedState: ISharedState = {
    page,
    showModal,
    showStreamModal,
    showPermissionModal,
    streamModalHandler,
    permissionModalHandler,
    modalHandler,
    setPageHandler,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
};

export default AppWrapper;
