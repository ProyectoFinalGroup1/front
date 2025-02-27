'use client'
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'


const LogOutButton = () => {
    const { setUserData } = useAuth();
    const router = useRouter();
    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem("userSession")
        Cookies.remove("userData", { path:''} )
        router.push("/")

    }
    return (
        <button onClick={handleLogout}
        className="inline-flex items-center justify-center rounded-xl bg-green-800 px-4 py-2 text-lg font-bold text-white transition-all duration-150 hover:bg-green-500 hover:text-gray-900 [text-shadow:2px_2px_4px_rgba(0,0,0,0.8)] [webkit-text-stroke:1px_black]">
            Cerrar Sesión
        </button>
    ) 
}

export default LogOutButton;