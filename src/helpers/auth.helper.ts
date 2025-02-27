import { ILoginProps } from "@/types";
import { IRegisterProps } from "@/types/IRegister";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(userData: ILoginProps) {
    try {
        const response = await fetch(`${API_URL}/auth/signin`, { // Aquí va el cambio
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json(); // Agregá 'await' aquí también

        if (!response.ok) {
            throw new Error(data.message || "Ocurrió un error al iniciar sesión. Intentá nuevamente");
        }

        toast.success("¡Has iniciado sesión!", {
          position: "top-center"
        });

        return data;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Ocurrió un error al iniciar sesión. Intentá nuevamente";

        toast.error(errorMessage, {
          position: "top-center"
        });

        throw new Error(errorMessage);
    }
}

export async function register(userData: IRegisterProps) {
    try {
        const response = await fetch(`${API_URL}/auth/signup`, { // Aquí va el cambio
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json(); // Agregá 'await' aquí también

        if (!response.ok) {
            throw new Error(data.message || "Error en el registro");
        }

        toast.success("¡Registro exitoso!", {
          position: "top-right",
        });

        return data;
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Error en el registro";

        toast.error(errorMessage, {
          position: "top-right",
        });

        throw new Error(errorMessage);
    }
}
