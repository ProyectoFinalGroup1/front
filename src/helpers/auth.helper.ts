import { ILoginProps } from "@/types";
import { IRegisterProps } from "@/types/IRegister";
import toast from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(userData: ILoginProps) {
    try {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Ocurrió un error al iniciar sesión. Intentá nuevamente");
        }

        const data = await response.json(); // Se agregó el await

        toast.success("¡Has iniciado sesión!", {
          position: "top-center"
        });

        return data;
    } catch (error: any) {
        toast.error(error.message || "Ocurrió un error al iniciar sesión. Intentá nuevamente", {
          position: "top-center"
        });
        throw error;
    }
}

export async function register(userData: IRegisterProps) {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      const data = await response.json();

      toast.success("¡Registro exitoso!", {
        position: "top-right",
      });

      return data;
    } catch (error: any) {
      toast.error(error.message || "Error en el registro", {
        position: "top-right",
      });
      throw error;
    }
}
