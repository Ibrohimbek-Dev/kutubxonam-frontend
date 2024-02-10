import { createContext, useContext, useReducer } from "react";
import { SidebarProvider } from "./SidebarProvider";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    <SidebarProvider>{children}</SidebarProvider>
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
