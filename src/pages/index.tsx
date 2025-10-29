import { VT323 } from "next/font/google";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import banner from "@/assets/bepsi-banner.png";
import drinks from "@/data/drinks";
import lightning from "@/data/lightning";
import ark from "@/data/ark";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

interface BTCPayInvoice {
  invoiceId: string;
  address: string;
  due: string;
  status: string;
  paymentMethodCurrency: string;
  itemDesc: string;
  invoiceBitcoinUrl: string;
  invoiceBitcoinUrlQR: string;
}

type PaymentMethod = 'lightning' | 'spark' | 'arkade' | 'bitcoin' | 'crypto' | null;

export default function Home() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [invoice, setInvoice] = useState<BTCPayInvoice | null>(null);
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const clearSelection = () => {
    setPaymentMethod(null);
    setSelected(null);
    setShowQR(false);
    setPaymentSuccess(false);
    setInvoice(null);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // SSE connection for payment notifications
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3500';
    const eventSource = new EventSource(`${backendUrl}/payment-events`);

    eventSource.onopen = () => {
      console.log('[SSE] Connected to payment events');
    };

    eventSource.onmessage = (event) => {
      try {
        const payment = JSON.parse(event.data);
        console.log('[SSE] Received payment:', payment);

        // Check if payment is for the currently open Spark dialog
        if (showQR && paymentMethod === 'spark' && selected !== null && payment.event === 'payment_received') {
          const currentSparkAddress = drinks[selected].sparkAddress;
          if (payment.address === currentSparkAddress) {
            console.log('[SSE] Spark payment matched current dialog!');
            setPaymentSuccess(true);

            // Close dialog and return to main after 3 seconds
            setTimeout(() => {
              clearSelection();
            }, 3000);
          }
        }

        // Check if payment is for the currently open Ark dialog
        // DISABLED FOR TESTING - need to see raw WebSocket messages first
        // if (showQR && paymentMethod === 'arkade' && selected !== null && payment.event === 'payment_received') {
        //   // Ark payments come through with address = "arkade"
        //   if (payment.address === 'arkade') {
        //     console.log('[SSE] Ark payment matched current dialog!');
        //     setPaymentSuccess(true);

        //     // Close dialog and return to main after 3 seconds
        //     setTimeout(() => {
        //       clearSelection();
        //     }, 3000);
        //   }
        // }
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
  }, [showQR, paymentMethod, selected]);

  const createInvoice = async (choiceKey: string): Promise<BTCPayInvoice | null> => {
    try {
      console.log('[Ark] Creating invoice via API for:', choiceKey);

      const response = await fetch('/api/ark-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ choiceKey }),
      });

      if (!response.ok) {
        console.error('[Ark] API error:', response.status);
        return null;
      }

      const invoiceData: BTCPayInvoice = await response.json();
      console.log('[Ark] Invoice created:', invoiceData);
      return invoiceData;
    } catch (error) {
      console.error('[Ark] Error creating invoice:', error);
      return null;
    }
  };

  const handleDrinkSelection = async (index: number) => {
    setSelected(index);

    // If arkade or bitcoin, create invoice first
    if (paymentMethod === 'arkade' || paymentMethod === 'bitcoin') {
      setIsCreatingInvoice(true);
      const choiceKey = drinks[index].arkChoiceKey;
      const newInvoice = await createInvoice(choiceKey);
      setIsCreatingInvoice(false);

      if (newInvoice) {
        setInvoice(newInvoice);
        setShowQR(true);
      } else {
        alert('Failed to create invoice. Please try again.');
        setSelected(null);
      }
    } else {
      // For lightning and spark, just show QR immediately
      setShowQR(true);
    }
  };

  const getLnurlForSelection = () => {
    if (selected === null) return lightning.lnurl;
    return drinks[selected].lnurl;
  };

  const getSparkAddressForSelection = () => {
    if (selected === null) return "sp1pgssx62n2d6npdcuwnx0ajeq2gsqsmd24n6ta54dcgc2rz6a8ats7epetyatya";
    return drinks[selected].sparkAddress;
  };

  const basePrice = selected !== null ? drinks[selected].price : 1000;
  const getTotalAmount = () => {
    if (selected === null) return basePrice;
    return drinks[selected].bepsiAmounts['1x'];
  };
  const totalAmount = getTotalAmount();

  const baseSparkPrice = selected !== null ? drinks[selected].sparkPrice : 1;
  const getSparkBepsiAmount = () => {
    if (selected === null) return baseSparkPrice;
    return drinks[selected].sparkPrice;
  };
  const sparkBepsiAmount = getSparkBepsiAmount();

  const getQRValue = () => {
    if (paymentMethod === 'lightning') {
      return getLnurlForSelection();
    } else if (paymentMethod === 'spark') {
      return getSparkAddressForSelection();
    } else if (paymentMethod === 'arkade' && invoice) {
      return invoice.invoiceBitcoinUrlQR;
    } else if (paymentMethod === 'bitcoin' && invoice) {
      return invoice.address;
    }
    return '';
  };

  const getQRTitle = () => {
    if (paymentMethod === 'lightning') return 'Scan to Pay with Lightning';
    if (paymentMethod === 'spark') return 'Scan to Pay with Spark';
    if (paymentMethod === 'arkade') return 'Scan to Pay with Arkade';
    if (paymentMethod === 'bitcoin') return 'Scan to Pay with Bitcoin';
    return '';
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center sm:p-2 ${inter.className}`}
    >
      <div className="w-full sm:max-w-[470px] lg:max-w-[540px] h-screen sm:h-[90vh] bg-dull-blue flex flex-col gap-2 background-dull-blue items-center justify-start sm:border-2 border-grey relative">
        <div className="w-full px-2 pt-2">
          <button onClick={toggleFullscreen} className="w-full">
            <Image src={banner} alt="banner" width={600} height={300} className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity" />
          </button>
        </div>

        {/* Step 1: Payment Method Selection */}
        {!paymentMethod && (
          <div className="flex-1 w-full px-2 flex flex-col justify-start pt-4">
            <div className="bg-grey w-full p-5 rounded-sm">
              <h2 className="text-2xl text-center mb-4">Choose Payment Method</h2>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => router.push('/crypto-qr')}
                  className="w-full bg-background text-white py-5 px-4 hover:bg-background-alt transition-colors border-4 border-background-alt"
                >
                  <div className="text-3xl font-bold mb-1">
                    💰 CRYPTO
                  </div>
                  <p className="text-base opacity-80">Pay with USDC or ETH</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('bitcoin')}
                  className="w-full bg-orange-500 text-white py-5 px-4 hover:opacity-90 transition-colors border-4 border-background-alt"
                >
                  <div className="text-3xl font-bold mb-1">
                    ₿ BITCOIN
                  </div>
                  <p className="text-base opacity-80">Bitcoin on-chain</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('lightning')}
                  className="w-full bg-red text-white py-5 px-4 hover:opacity-90 transition-colors border-4 border-background-alt"
                >
                  <div className="text-3xl font-bold mb-1">
                    ⚡ LIGHTNING
                  </div>
                  <p className="text-base opacity-80">Bitcoin Lightning Network</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('spark')}
                  className="w-full bg-blue-600 text-white py-5 px-4 hover:opacity-90 transition-colors border-4 border-background-alt"
                >
                  <div className="text-3xl font-bold mb-1 inline-flex items-center justify-center w-full">
                    <div className="bg-black p-1 rounded mr-2">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M12 2L13.5 8.5L20 7L14.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9.5 12L4 7L10.5 8.5L12 2Z" fill="currentColor"/>
                      </svg>
                    </div>
                    SPARK
                  </div>
                  <p className="text-base opacity-80">Spark on Bitcoin</p>
                </button>

                <button
                  onClick={() => setPaymentMethod('arkade')}
                  className="w-full bg-purple-600 text-white py-5 px-4 hover:opacity-90 transition-colors border-4 border-background-alt"
                >
                  <div className="text-3xl font-bold mb-1">
                    <span className="text-3xl mr-2">{ark.icon}</span> ARKADE
                  </div>
                  <p className="text-base opacity-80">Ark on Bitcoin</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Drink Selection (shown after payment method chosen) */}
        {paymentMethod && !showQR && (
          <>
            <div className="bg-grey flex flex-col w-full py-2 px-2">
              <p className="text-xl">Choose a drink:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 grid-flow-row gap-2 py-2">
                {drinks.map(({ id, name, color }, index) => (
                  <button
                    key={id}
                    style={{ backgroundColor: color }}
                    onClick={() => handleDrinkSelection(index)}
                    disabled={isCreatingInvoice}
                    className={`h-16 sm:h-14 text-3xl sm:text-4xl text-white ${
                      isCreatingInvoice ? "opacity-50 cursor-wait" : ""
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full mt-auto px-2 pb-2">
              <button
                onClick={clearSelection}
                className="w-full bg-background text-white py-3 px-4 text-2xl hover:bg-background-alt transition-colors border-4 border-background-alt"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>

      {/* Step 3: QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => !paymentSuccess && setShowQR(false)}>
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
                <h2 className="text-2xl mb-4 text-center">{getQRTitle()}</h2>
                <QRCodeSVG
                  value={getQRValue()}
                  size={300}
                  level="M"
                />
                <p className="text-3xl mt-6 mb-2 text-center font-bold">
                  {selected !== null ? drinks[selected].name.toUpperCase() : ""}
                </p>
                <p className="text-4xl font-bold text-center mb-4">
                  {(paymentMethod === 'arkade' || paymentMethod === 'bitcoin') && invoice
                    ? `${invoice.due} ${invoice.paymentMethodCurrency}`
                    : `${totalAmount} SATS / ${sparkBepsiAmount} BEPSI`
                  }
                </p>
                <button
                  className="mt-4 w-full bg-red text-white p-4 rounded text-2xl font-bold"
                  onClick={() => {
                    setShowQR(false);
                    setSelected(null);
                  }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Loading overlay for invoice creation */}
      {isCreatingInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Generating Invoice...</h2>
            <p className="text-gray-600">Please wait while we create your {paymentMethod === 'bitcoin' ? 'Bitcoin' : 'Arkade'} invoice</p>
          </div>
        </div>
      )}
    </main>
  );
}
