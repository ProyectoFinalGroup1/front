import Link from "next/link";
import Image from "next/image";
// <Link href="/"> <Image src="/images/logo.jpg" alt="Logo" width={25} height={25}™ /></Link>
const Footer = () => {
  return (
    <footer className="bg-white bg-opacity-30 shadow-md
                      w-full
                      py-4
                      text-center
                      text-m text-gray-500 font-semibold
                      ">
      <div className="flex flex-row justify-around">
          <div className="flex flex-row">
            <Link href="/">
              <p>
                VALLE DE PAZ ©2025.
              </p>
            </Link>
          </div>
          
          <div>
            <p>
              ®All Rights Reserved
            </p>
          </div>

          <div className="flex flex-row">
            <Link href="https://www.facebook.com/share/19qtxcDyzh/?mibextid=wwXIfr">
              <p>
                <Image src="/images/logoFB.png" alt="Logo" width={25} height={25}/>
              </p>
            </Link>

            <Link href="https://www.instagram.com/valledepaz.cp?igsh=MWtrYnkzaDNsdnA3NA==">
              <p className="px-8">
                <Image src="/images/logoIG.png" alt="Logo" width={25} height={25}/>
              </p>
            </Link>

            <p>
              <Image src="/images/logoWP.png" alt="Logo" width={20} height={20}/>
            </p>
          </div>

      </div>

    </footer>
  );
}

export default Footer;