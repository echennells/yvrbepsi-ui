import coinbaseWallet from "@web3-onboard/coinbase";
import gnosis from "@web3-onboard/gnosis";
import injectedModule from "@web3-onboard/injected-wallets";
import { Web3OnboardProvider, init } from "@web3-onboard/react";

import icon from "@/assets/icon";
import logo from "@/assets/logo";
import chains from "@/data/chains";

const wallets = [
  injectedModule({}),
  coinbaseWallet({ darkMode: false }),
  gnosis(),
];

const appMetadata = {
  name: "YVR Bepsi",
  icon,
  logo,
  description: "Frontend for YVR Bepsi Machine",
};

export default function OnboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const onBoard = init({
    wallets,
    chains: Object.values(chains).map(({ id, token, label, rpcUrl }) => ({
      id,
      token,
      label,
      rpcUrl,
    })),
    appMetadata,
  });

  return (
    <Web3OnboardProvider web3Onboard={onBoard}>{children}</Web3OnboardProvider>
  );
}
