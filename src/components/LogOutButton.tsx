import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import { supabase } from "@/lib/supabase";



const LogOutButton = () => {
    const { setUserData } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setUserData(null);
        localStorage.removeItem("sb-wbdarmsigbqzvkvcezkt-auth-token");
        localStorage.removeItem("userSession")
        localStorage.removeItem("chatbot_session_id")
        localStorage.removeItem("darkMode")
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