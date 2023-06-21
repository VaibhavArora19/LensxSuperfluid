import { createContext, useState } from "react";

export const AppContext = createContext();

const AppWrapper = (props) => {
  const [page, setPage] = useState("Home");

  const setPageHandler = (pageName) => {
    setPage(pageName);
  };

  const sharedState = {
    page,
    setPageHandler,
  };

  return (
    <AppContext.Provider value={{ sharedState }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppWrapper;
