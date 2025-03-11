// import SuccessView from "../../views/SuccessView";
import Link from "next/link";
import Image from "next/image";

const Donacion = () => {
    return(
        <div className="">
        <Link href="/dashboard/user/donaciones">
          <Image
            src="/images/logo.jpg"
            alt=""
            width={250}
            height={250}
            className="absolute
            top-1/2 left-1/2
            transform -translate-x-1/2 -translate-y-1/2
            transition-transform duration-300 ease-in-out 
            hover:scale-150"
          />
        </Link>            
        </div>
    );
}

export default Donacion;