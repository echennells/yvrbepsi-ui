import { VT323 } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { QRCodeSVG } from "qrcode.react";
import banner from "@/assets/bepsi-banner.png";

const inter = VT323({ weight: "400", subsets: ["latin-ext"] });

export default function CryptoQR() {
  const router = useRouter();
  
  // The URL that will be encoded in the QR code - pointing to the crypto payment page
  const cryptoUrl = "https://bepsi.dctrl.wtf/crypto";

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center sm:p-2 ${inter.className}`}
    >
      <div className="w-full sm:max-w-[470px] lg:max-w-[540px] h-screen sm:h-[90vh] bg-dull-blue flex flex-col gap-2 background-dull-blue items-center justify-start sm:border-2 border-grey relative overflow-hidden">
        <div className="w-full flex flex-col items-center h-full">
          {/* Logo matching lightning page size */}
          <div className="w-full px-2 pt-2">
            <Image 
              src={banner} 
              alt="banner" 
              width={600} 
              height={300} 
              className="w-full h-auto" 
              priority
            />
          </div>
          
          <div className="flex-1 w-full px-2 flex flex-col justify-start">
            <div className="bg-grey w-full p-6 rounded-sm flex flex-col items-center">
              <h2 className="text-5xl text-center mb-6 mt-6">Scan with Your Phone</h2>
            
            <div className="bg-grey p-3 rounded">
              <QRCodeSVG
                value={cryptoUrl}
                size={350}
                level="M"
                includeMargin={true}
                fgColor="#FF0000"
                bgColor="#E5E7EB"
              />
            </div>
            
              <button 
                onClick={() => router.push('/')}
                className="w-full bg-background text-white py-3 px-4 text-xl hover:bg-background-alt transition-colors border-4 border-background-alt mt-6"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}