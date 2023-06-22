import { ReactNode, createContext, useState } from "react";

type ISharedState = {
  page: string,
  setPageHandler: (pageName: string) => void
}

const defaultValues: ISharedState = {
  page: "",
  setPageHandler: (pageName: string) => {}
}

export const AppContext = createContext<ISharedState>(defaultValues);

type Props = {
  children: ReactNode
}

export const AppWrapper = ({children}: Props): JSX.Element => {
  const [page, setPage] = useState("Home");

  const setPageHandler = (pageName: string) => {
    setPage(pageName);
  };

  const sharedState = {
    page,
    setPageHandler,
  };

    return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
};

export default AppWrapper;
