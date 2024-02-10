import React, { createContext, useContext, useEffect, useRef, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [openLoginOption, setLoginOptions] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPlaylist, setIsPlayList] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);

  const [openSidebar, setOpenSidebar] = useState(false);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setOpenSidebar(windowWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <SidebarContext.Provider
      value={{
        openSidebar,
        setOpenSidebar,
        openLoginOption,
        setLoginOptions,
        setOpenMenu,
        openMenu,
        isLoading,
        setIsLoading,
        isModalOpen,
        setModalOpen,
        isPlaylist,
        setIsPlayList,
        alert,
        setAlert,
        alertMsg,
        setAlertMsg,
        setClick,
        click,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};


export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
