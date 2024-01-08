import { LiFi } from "@lifi/sdk";
import { createContext, useContext } from "react";

const integrator = "YVR_BEPSI";

const LifiContext = createContext<LiFi>(new LiFi({ integrator }));

export function LifiProvider({ children }: { children: React.ReactNode }) {
  const lifi = new LiFi({
    integrator,
  });

  return <LifiContext.Provider value={lifi}>{children}</LifiContext.Provider>;
}
const useLifi = () => useContext(LifiContext);

export default useLifi;
