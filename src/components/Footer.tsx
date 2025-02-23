// import Link from "next/link";
// import Image from "next/image";
// <Link href="/"> <Image src="/images/logo.jpg" alt="Logo" width={30} height={30} /></Link>
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
            
            <p>
              [logo link]™ VALLE DE PAZ ©2025.
            </p>
          </div>

          <p>
            ®All Rights Reserved
          </p>
    
          <p>
            [Logo redes 1] | [Logo redes 2] | [Logo redes 2]| [Logo redes 3]
          </p>
        
      </div>

    </footer>
  );
}

export default Footer;