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
      <div className="w-full sm:max-w-[470px] lg:max-w-[540px] h-screen sm:h-[90vh] bg-dull-blue flex flex-col gap-4 background-dull-blue items-center justify-center sm:border-2 border-grey relative">
        <div className="w-full px-6 flex flex-col items-center gap-6">
          <Image src={banner} alt="banner" width={400} height={200} className="w-full max-w-sm h-auto" />
          
          <div className="bg-grey w-full p-6 rounded-sm flex flex-col items-center">
            <h2 className="text-4xl text-center mb-6">Scan with Your Phone</h2>
            
            <div className="bg-grey p-4 rounded">
              <QRCodeSVG
                value={cryptoUrl}
                size={450}
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
    </main>
  );
}