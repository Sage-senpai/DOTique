import { createContext, useContext } from "react";

export const DotApiContext = createContext<any>(null);

export function useDotApi() {
  return useContext(DotApiContext);
}
