import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/styles/globals.css";
import OnboardProvider from "@/contexts/onboard";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <OnboardProvider>
        <Component {...pageProps} />
      </OnboardProvider>
    </QueryClientProvider>
  );
}
