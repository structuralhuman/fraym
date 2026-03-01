import React, { createContext, useContext, useState } from "react";
import { FraymSession } from "../constants/types";

const initialSession: FraymSession = {
  event: null,
  assumption: null,
  internalControl: null,
  externalNonControl: null,
  lens: null,
  resolution: null,
};

type FraymContextType = {
  session: FraymSession;
  setSession: (session: FraymSession) => void;
  resetSession: () => void;
};

const FraymContext = createContext<FraymContextType | undefined>(undefined);

export const FraymProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSessionState] = useState<FraymSession>(initialSession);

  const setSession = (newSession: FraymSession) => {
    setSessionState(newSession);
  };

  const resetSession = () => {
    setSessionState(initialSession);
  };

  return (
    <FraymContext.Provider value={{ session, setSession, resetSession }}>
      {children}
    </FraymContext.Provider>
  );
};

export const useFraym = () => {
  const context = useContext(FraymContext);
  if (!context) {
    throw new Error("useFraym must be used within FraymProvider");
  }
  return context;
};