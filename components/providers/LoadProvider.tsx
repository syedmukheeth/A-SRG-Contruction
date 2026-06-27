"use client";

import { createContext, useContext, useState } from "react";

interface LoadState {
  /** True once the loading screen has finished its reveal. */
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;
}

const LoadContext = createContext<LoadState>({
  isLoaded: false,
  setLoaded: () => {},
});

export function LoadProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setLoaded] = useState(false);
  return (
    <LoadContext.Provider value={{ isLoaded, setLoaded }}>
      {children}
    </LoadContext.Provider>
  );
}

export const useLoad = () => useContext(LoadContext);
