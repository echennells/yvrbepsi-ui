import { VT323 } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import banner from "@/assets/bepsi-banner.png";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

export default function Splash() {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCrypto = () => {
    router.push('/crypto-qr');
  };

  const handleLightning = () => {
    router.push('/lightning');
  };

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

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center sm:p-2 ${inter.className}`}
    >
      <div className="w-full sm:max-w-[470px] lg:max-w-[540px] h-screen sm:h-[90vh] bg-dull-blue flex flex-col gap-2 background-dull-blue items-center justify-start sm:border-2 border-grey relative overflow-hidden">
        <div className="w-full flex flex-col items-center h-full">
          {/* Logo matching lightning page size */}
          <div className="w-full px-2 pt-2">
            <button
              onClick={toggleFullscreen}
              className="w-full focus:outline-none cursor-pointer"
            >
              <Image
                src={banner}
                alt="banner"
                width={600}
                height={300}
                className="w-full h-auto"
                priority
              />
            </button>
          </div>

          {/* Payment methods section - more compact */}
          <div className="flex-1 w-full px-2 flex flex-col justify-start pt-4">
            <div className="bg-grey w-full p-5 rounded-sm">
              <h2 className="text-2xl text-center mb-4">Choose Payment Method</h2>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCrypto}
                  className="w-full bg-background text-white py-5 px-4 hover:bg-background-alt transition-colors border-4 border-background-alt"
                >
                  <div className="text-3xl font-bold mb-1">
                    💰 CRYPTO
                  </div>
                  <p className="text-base opacity-80">Pay with USDC or ETH</p>
                </button>

                <button
                  onClick={handleLightning}
                  className="w-full bg-background text-white py-5 px-4 hover:bg-background-alt transition-colors border-4 border-background-alt"
                >
                  <div className="text-3xl font-bold mb-1">
                  <span className="text-amber-500 text-2xl">₿</span> BITCOIN
                  </div>
                  <p className="text-base opacity-80">Pay with Bitcoin Lightning Network</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
