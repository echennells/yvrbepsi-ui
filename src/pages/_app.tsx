import type { AppProps } from "next/app";

import "@/styles/globals.css";
import OnboardProvider from "@/contexts/onboard";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OnboardProvider>
      <Component {...pageProps} />
    </OnboardProvider>
  );
}
