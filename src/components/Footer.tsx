import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "./WhatsappButton";

const Footer = () => {
  return (
    <footer className="bg-white bg-opacity-30 shadow-md w-full py-4 text-center text-sm text-gray-500 font-semibold">
      <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 px-4 max-w-5xl mx-auto">
        {/* Nombre y copyright */}
        <div>
          <Link href="/">
            <p className="hover:text-gray-700 transition-colors">VALLE DE PAZ ©2025.</p>
          </Link>
        </div>

        {/* Derechos reservados */}
        <div>
          <p>®All Rights Reserved</p>
        </div>

        {/* Redes sociales y WhatsApp */}
        <div className="flex items-center gap-4">
          <Link href="https://www.facebook.com/share/19qtxcDyzh/?mibextid=wwXIfr">
            <Image src="/images/logoFB.png" alt="Facebook" width={25} height={25} className="hover:scale-110 transition-transform" />
          </Link>

          <Link href="https://www.instagram.com/valledepaz.cp?igsh=MWtrYnkzaDNsdnA3NA==">
            <Image src="/images/logoIG.png" alt="Instagram" width={25} height={25} className="hover:scale-110 transition-transform" />
          </Link>

          <WhatsAppButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
