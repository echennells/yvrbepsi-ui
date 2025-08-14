import { VT323 } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import banner from "@/assets/bepsi-banner.png";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

export default function Splash() {
  const router = useRouter();

  const handleCrypto = () => {
    router.push('/crypto-qr');
  };

  const handleLightning = () => {
    router.push('/lightning');
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center sm:p-2 ${inter.className}`}
    >
      <div className="w-full sm:max-w-[600px] lg:max-w-[700px] h-screen sm:h-[90vh] bg-dull-blue flex flex-col gap-2 background-dull-blue items-center justify-start sm:border-2 border-grey relative overflow-hidden">
        <div className="w-full flex flex-col items-center h-full">
          {/* Logo takes up much more prominent space - approximately 40% of screen */}
          <div className="w-full flex items-center justify-center pt-12 pb-4 px-4">
            <Image 
              src={banner} 
              alt="banner" 
              width={1024} 
              height={574} 
              className="w-full max-w-[550px] h-auto" 
              priority
            />
          </div>
          
          {/* Payment methods section - more compact */}
          <div className="flex-1 w-full px-6 flex flex-col justify-start pt-8">
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
                  <p className="text-base opacity-80">Pay with USDC, ETH, or Solana</p>
                </button>

                <button
                  onClick={handleLightning}
                  className="w-full bg-background text-white py-5 px-4 hover:bg-background-alt transition-colors border-4 border-background-alt"
                >
                  <div className="text-3xl font-bold mb-1">
                    ⚡ LIGHTNING
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