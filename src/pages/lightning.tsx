import { VT323 } from "next/font/google";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import banner from "@/assets/bepsi-banner.png";
import drinks from "@/data/drinks";
import lightning from "@/data/lightning";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

export default function Lightning() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [donation, setDonation] = useState(0);
  const [showQR, setShowQR] = useState(false);
  const [showSparkQR, setShowSparkQR] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const clearSelection = () => {
    setSelected(null);
    setDonation(0);
    setShowQR(false);
    setShowSparkQR(false);
    setPaymentSuccess(false);
  };

  // SSE connection for payment notifications
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3500/payment-events');

    eventSource.onopen = () => {
      console.log('[SSE] Connected to payment events');
    };

    eventSource.onmessage = (event) => {
      try {
        const payment = JSON.parse(event.data);
        console.log('[SSE] Received payment:', payment);

        // Check if payment is for the currently open Spark dialog
        if (showSparkQR && selected !== null && payment.event === 'payment_received') {
          const currentSparkAddress = drinks[selected].sparkAddress;
          if (payment.address === currentSparkAddress) {
            console.log('[SSE] Payment matched current dialog!');
            setPaymentSuccess(true);

            // Close dialog and return to main after 3 seconds
            setTimeout(() => {
              clearSelection();
            }, 3000);
          }
        }
      } catch (error) {
        console.error('[SSE] Error parsing payment event:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('[SSE] Connection error:', error);
    };

    return () => {
      console.log('[SSE] Closing connection');
      eventSource.close();
    };
  }, [showSparkQR, selected]);


  const getLnurlForSelection = () => {
    if (selected === null) return lightning.lnurl;
    return drinks[selected].lnurl;
  };

  const getSparkAddressForSelection = () => {
    if (selected === null) return "sp1pgssx62n2d6npdcuwnx0ajeq2gsqsmd24n6ta54dcgc2rz6a8ats7epetyatya";
    return drinks[selected].sparkAddress;
  };

  const handlePayClick = () => {
    if (selected === null) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      const lnurl = getLnurlForSelection();
      console.log('Selected drink:', drinks[selected].name);
      console.log('LNURL:', lnurl);
      setShowQR(true);
    }
  };

  const handleSparkPayClick = () => {
    if (selected === null) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 2000);
    } else {
      setShowSparkQR(true);
    }
  };

  const basePrice = selected !== null ? drinks[selected].price : 1000;
  const getTotalAmount = () => {
    if (selected === null) return basePrice;
    const multiplierKey = donation === 0 ? '1x' : donation === 2 ? '3x' : '5x';
    return drinks[selected].bepsiAmounts[multiplierKey];
  };
  const totalAmount = getTotalAmount();

  const baseSparkPrice = selected !== null ? drinks[selected].sparkPrice : 1;
  const getSparkBepsiAmount = () => {
    if (selected === null) return baseSparkPrice;
    const multiplierKey = donation === 0 ? '1x' : donation === 2 ? '3x' : '5x';
    // Apply the same multiplier logic to sparkPrice as we do for bepsiAmounts
    const multiplier = donation === 0 ? 1 : donation === 2 ? 3 : 5;
    return drinks[selected].sparkPrice * multiplier;
  };
  const sparkBepsiAmount = getSparkBepsiAmount();

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

        {/* <div className="bg-grey flex flex-col w-full py-2 px-2">
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
                {val === 0 ? '1x' : val === 2 ? '3x' : '5x'}
              </button>
            ))}
          </div>
        </div> */}

        {selected !== null && (
          <div className="bg-grey w-full px-2 py-3 flex items-center justify-center">
            <p className="text-5xl sm:text-6xl font-bold"> {totalAmount} SATS / {sparkBepsiAmount} BEPSI</p>
          </div>
        )}

        <div className="w-full mt-auto px-2 pb-2">
          <div className="flex gap-2 mb-2">
            <button
              className={`text-2xl sm:text-3xl text-white flex-1 border-4 p-3 border-background-alt ${
                selected !== null ? "bg-red" : "bg-gray-500"
              }`}
              onClick={handlePayClick}
            >
              PAY WITH ⚡ LIGHTNING
            </button>
            <button
              className={`text-2xl sm:text-3xl text-white flex-1 border-4 p-3 border-background-alt ${
                selected !== null ? "bg-blue-600" : "bg-gray-500"
              }`}
              onClick={handleSparkPayClick}
            >
              <div className="inline-flex items-center">
                <div className="bg-black p-1 rounded mr-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M12 2L13.5 8.5L20 7L14.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9.5 12L4 7L10.5 8.5L12 2Z" fill="currentColor"/>
                  </svg>
                </div>
                PAY WITH SPARK
              </div>
            </button>
          </div>

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
              value={getLnurlForSelection()}
              size={300}
              level="M"
            />
            <p className="text-3xl mt-6 mb-2 text-center font-bold">
              {selected !== null ? drinks[selected].name.toUpperCase() : ""}
            </p>
            <p className="text-4xl font-bold text-center mb-4">
              {totalAmount} SATS / {sparkBepsiAmount} BEPSI
            </p>
            <div className="mt-4 flex gap-4">
              <button
                className="flex-1 bg-red text-white p-4 rounded text-2xl font-bold"
                onClick={() => setShowQR(false)}
              >
                Close
              </button>
              {/* <button
                className="flex-1 bg-blue-600 text-white p-4 rounded text-2xl font-bold"
              >
                <span className="text-3xl font-bold">*</span> pay with spark
              </button> */}
            </div>
          </div>
        </div>
      )}

      {showSparkQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowSparkQR(false)}>
          <div className="bg-white p-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
            {paymentSuccess ? (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-3xl mb-4 text-green-600 font-bold">Payment Received!</h2>
                <p className="text-2xl mb-2">
                  Dispensing {selected !== null ? drinks[selected].name : ""}...
                </p>
                <p className="text-lg text-gray-600">Returning to main screen...</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl mb-4 text-center">Scan to Pay with Spark</h2>
                <QRCodeSVG
                  value={getSparkAddressForSelection()}
                  size={300}
                  level="M"
                />
                <p className="text-3xl mt-6 mb-2 text-center font-bold">
                  {selected !== null ? drinks[selected].name.toUpperCase() : ""}
                </p>
                <p className="text-4xl font-bold text-center mb-4">
                  {totalAmount} SATS / {sparkBepsiAmount} BEPSI
                </p>
                <button
                  className="mt-4 w-full bg-red text-white p-4 rounded text-2xl font-bold"
                  onClick={() => setShowSparkQR(false)}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
