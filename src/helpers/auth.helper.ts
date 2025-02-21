import { ILoginProps } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(userData: ILoginProps) {
    try {
        const response = await fetch(`${API_URL}/user/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        if(response.ok){
            alert("Haz iniciado sesión con éxito")
            console.log(response)
            return response.json();
        } else {
            throw new Error('User already exist')
        }
    } catch (error: any) {
        alert("Ocurrió un error al iniciar sesión. Intenta nuevamente")
        
    }
}