import { VT323 } from "next/font/google";
import Image from "next/image";
import { useCallback, useState, useEffect, useMemo } from "react";
import { providers, utils, Contract, BigNumber } from "ethers";
import { useSetChain } from "@web3-onboard/react";
import { QRCodeSVG } from "qrcode.react";

import banner from "@/assets/bepsi-banner.png";
import Dropdown from "@/components/dropdown";
import type { Address } from "@solana/addresses";
import {
  findAssociatedTokenPda,
  TOKEN_PROGRAM_ADDRESS,
} from "@solana-program/token";
import { useConnectWallet } from "@web3-onboard/react";
import drinks from "@/data/drinks";
import lightning from "@/data/lightning";
import ERC20 from "@/abis/ERC20.json";
import config from "@/constants";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

export default function Home() {
  const [selected, setSelected] = useState(0);
  const [address, setAddress] = useState<string>();
  const [decimals, setDecimals] = useState<number>();
  const [tokenChainId, setTokenChainId] = useState<string>();
  const [tokenBalance, setTokenBalance] = useState<BigNumber>();
  const [pending, setPending] = useState(false);
  const [basePrice, setBasePrice] = useState(1);
  const [donation, setDonation] = useState(0);
  const [isBitcoin, setIsBitcoin] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const [{ wallet }, connect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();

  const insufficientBalance = useMemo(
    () =>
      tokenBalance &&
      decimals &&
      utils
        .parseUnits((basePrice + donation).toString(), decimals)
        .add(parseInt(drinks[selected].id, 10))
        .gt(tokenBalance),
    [tokenBalance, selected, decimals, basePrice, donation],
  );

  const buy = useCallback(async () => {
    if (
      wallet?.provider !== undefined &&
      address !== undefined &&
      decimals !== undefined &&
      connectedChain !== undefined &&
      connectedChain !== null &&
      tokenChainId !== undefined &&
      setChain !== undefined
    ) {
      setPending(true);
      if (connectedChain.id !== tokenChainId) {
        await setChain({ chainId: tokenChainId });
      }
      const signer = new providers.Web3Provider(
        wallet.provider,
        "any",
      ).getSigner();
      const token = new Contract(address, ERC20, signer);
      token
        .transfer(
          config.RECEIVER_ADDRESS,
          +utils.parseUnits((basePrice + donation).toString(), decimals) +
            parseInt(drinks[selected].id, 10),
        )
        .then(async (tx: any) => {
          await tx.wait();
        })
        .catch(console.error)
        .finally(() => {
          setPending(false);
        });
    }
  }, [
    selected,
    wallet,
    address,
    decimals,
    tokenChainId,
    connectedChain,
    setChain,
    donation,
    basePrice,
  ]);

  useEffect(() => {
    let subscribed = true;
    if (
      wallet?.provider !== undefined &&
      wallet?.accounts !== undefined &&
      wallet.accounts.length > 0 &&
      address !== undefined &&
      decimals !== undefined &&
      connectedChain !== undefined &&
      setChain !== undefined &&
      tokenChainId !== undefined
    ) {
      setChain({ chainId: tokenChainId }).then(() => {
        const provider = new providers.Web3Provider(wallet.provider, "any");
        const token = new Contract(address, ERC20, provider);
        token.balanceOf(wallet.accounts[0].address).then((res: any) => {
          if (subscribed) {
            setTokenBalance(res);
          }
        });
      });
    }
    return () => {
      subscribed = false;
    };
  }, [tokenChainId, connectedChain, setChain, address, decimals, wallet]);
  const isSolana = tokenChainId === "0x65";
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-2 ${inter.className}`}
    >
      <div className="w-full max-w-[470px] lg:max-w-[540px] h-[90vh] bg-dull-blue flex flex-col gap-2 background-dull-blue items-center justify-start border-2 border-grey relative">
        <div className="w-full px-2 pt-2">
          <Image src={banner} alt="banner" width={600} height={300} className="w-full h-auto" />
        </div>

        <div className="bg-grey flex flex-col w-full py-2 px-2">
          <p className="text-xl">Choose a drink:</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 grid-flow-row gap-2 py-2">
            {drinks.map(({ id, name, color, price }, index) => (
              <button
                key={id}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setSelected(index);
                  setBasePrice(price);
                }}
                className={`h-10 sm:h-8 text-sm sm:text-md text-white ${
                  selected === index ? "border-background-alt border-4" : ""
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-grey flex flex-col w-full py-2 px-2">
          <p className="text-xl">Donation:</p>
          <div className="grid grid-cols-3 grid-flow-row gap-2 py-2">
            {[0, 2, 4].map((val) => (
              <button
                key={val}
                onClick={() => setDonation(val)}
                className={`h-10 sm:h-8 text-sm sm:text-md text-black ${
                  donation === val
                    ? "border-background-alt border-4"
                    : "border-gray-400 border-4"
                }`}
              >
                {basePrice + val}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-grey w-full px-2">
          <p className="text-xl py-2">Choose a payment:</p>
          <Dropdown
            options={[]}
            setToken={(address, decimals, chainId) => {
              setAddress(address);
              setDecimals(decimals);
              setTokenChainId(chainId);
              setIsBitcoin(address === 'bitcoin');
            }}
          />
          {tokenBalance && (
            <div className="w-full flex justify-between my-1 px-2">
              <p>Balance:</p>
              <p>{utils.formatUnits(tokenBalance, decimals)}</p>
            </div>
          )}
        </div>

        <div className="w-full mt-auto px-2 pb-2">
          <button
            className={`text-2xl sm:text-3xl text-white w-full border-4 p-3 border-background-alt ${
              !isSolana && !isBitcoin && insufficientBalance ? "bg-gray-500" : "bg-red"
            }`}
            disabled={!isSolana && !isBitcoin && !!insufficientBalance}
            onClick={() => {
              if (isBitcoin) {
                setShowQR(true);
              } else if (isSolana) {
                // FIXME: When the treasury account is off-curve (as it is here, because it's a
                // Squads multisig) certain wallets will reject this payment request. As of this
                // writing those include Backpack and Solflare. To hack around this, we derive the
                // address of the associated token account and use it as the recipient, even though
                // this is a violation of the Solana Pay specification.
                findAssociatedTokenPda({
                  mint: address as Address,
                  owner: config.SOLANA_TREASURY_ADDRESS as Address,
                  tokenProgram: TOKEN_PROGRAM_ADDRESS,
                }).then(([tokenAccountAddress]) => {
                  const solanaPayUrl =
                    `solana:${tokenAccountAddress}` +
                    `?amount=${(basePrice + donation).toString()}` +
                    `&spl-token=${address}` +
                    "&label=YVR%20BEPSI" +
                    `&message=One%20${encodeURIComponent(
                      drinks[selected].name
                    )}%20BEPSI` +
                    `&memo=YVR-BEPSI:0:${drinks[selected].id}`;
                  window.location.href = solanaPayUrl;
                });
              } else if (wallet) {
                buy();
              } else {
                connect();
              }
            }}
          >
            {isBitcoin ? (
              `PAY WITH ${lightning.icon} BITCOIN`
            ) : isSolana ? (
              <>
                PAY WITH{" "}
                <Image
                  alt="Solana"
                  className="align-text-bottom inline"
                  src="/bepsi/solanaPayLogoMarkWhite.svg"
                  height={30}
                  width={80}
                />
              </>
            ) : !wallet ? (
              "CONNECT"
            ) : insufficientBalance ? (
              "Insufficient Balance"
            ) : pending ? (
              "SENDING..."
            ) : (
              "BUY"
            )}
          </button>
        </div>
      </div>

      {showQR && isBitcoin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
          <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl mb-4 text-center">Scan to Pay with Lightning</h2>
            <QRCodeSVG
              value={lightning.lnurl}
              size={300}
              level="M"
            />
            <p className="text-sm mt-4 text-center text-gray-600">
              Pay {(basePrice + donation) * lightning.baseAmount} {lightning.currencyName} for
              {' '}{drinks[selected].name}
            </p>
            <button
              className="mt-4 w-full bg-blue-500 text-white p-2 rounded mb-2"
              onClick={() => {
                navigator.clipboard.writeText(lightning.lnurl);
                // eslint-disable-next-line no-alert
                alert('Invoice copied to clipboard!');
              }}
            >
              Copy Invoice
            </button>
            <button
              className="w-full bg-green-500 text-white p-2 rounded mb-2"
              onClick={() => {
                window.location.href = `lightning:${lightning.lnurl}`;
              }}
            >
              Open in App
            </button>
            <button
              className="w-full bg-red text-white p-2 rounded"
              onClick={() => setShowQR(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
