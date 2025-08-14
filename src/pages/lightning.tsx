import { VT323 } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import banner from "@/assets/bepsi-banner.png";
import drinks from "@/data/drinks";
import lightning from "@/data/lightning";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

export default function Lightning() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [basePrice, setBasePrice] = useState(1);
  const [donation, setDonation] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const clearSelection = () => {
    setSelected(null);
    setBasePrice(1);
    setDonation(0);
  };
  
  const handlePayClick = () => {
    if (selected === null) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      setShowQR(true);
    }
  };

  const totalAmount = basePrice + donation;

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center sm:p-2 ${inter.className}`}
    >
      <div className="w-full sm:max-w-[470px] lg:max-w-[540px] h-screen sm:h-[90vh] bg-dull-blue flex flex-col gap-2 background-dull-blue items-center justify-start sm:border-2 border-grey relative">
        <div className="w-full px-2 pt-2">
          <button onClick={clearSelection} className="w-full">
            <Image src={banner} alt="banner" width={600} height={300} className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity" />
          </button>
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
                className={`h-16 sm:h-14 text-3xl sm:text-4xl text-white ${
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
                className={`h-16 sm:h-14 text-xl sm:text-2xl text-black ${
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

        {selected !== null && (
          <div className="bg-grey w-full px-2 py-3 flex items-center justify-center">
            <p className="text-5xl sm:text-6xl font-bold">Total: {totalAmount * lightning.baseAmount} BEPSI</p>
          </div>
        )}

        <div className="w-full mt-auto px-2 pb-2">
          <button
            className={`text-2xl sm:text-3xl text-white w-full border-4 p-3 border-background-alt ${
              selected !== null ? "bg-red" : "bg-gray-500"
            }`}
            onClick={handlePayClick}
          >
            PAY WITH ⚡ LIGHTNING
          </button>
          
          <button 
            onClick={() => router.push('/')}
            className="w-full bg-background text-white py-3 px-4 text-2xl hover:bg-background-alt transition-colors border-4 border-background-alt mt-2"
          >
            Back to Home
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-grey p-6 rounded-lg border-4 border-background-alt pointer-events-auto">
            <p className="text-2xl font-bold text-center">You must make a selection first</p>
          </div>
        </div>
      )}

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowQR(false)}>
          <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl mb-4 text-center">Scan to Pay with Lightning</h2>
            <QRCodeSVG
              value={lightning.lnurl}
              size={300}
              level="M"
            />
            <p className="text-3xl mt-6 mb-2 text-center font-bold">
              {selected !== null ? drinks[selected].name.toUpperCase() : ""}
            </p>
            <p className="text-4xl font-bold text-center mb-4">
              {totalAmount * lightning.baseAmount} BEPSI
            </p>
            <button
              className="mt-4 w-full bg-red text-white p-4 rounded text-2xl font-bold"
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