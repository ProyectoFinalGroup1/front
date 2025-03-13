import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { IUserSession } from "@/types/index";
import toast from "react-hot-toast";

const DonationForm = () => {
  const { userData } = useAuth() as { userData: IUserSession | null };
  const [amount, setAmount] = useState<number | "">("");
  //const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleDonation = async () => {
    if (!amount || amount <= 0) {
      alert("Por favor, ingresa un monto válido.");
      return;
    }

    const donationData = {
      monto: Number(amount),
      email: userData?.user?.email || "",
      nombreMostrar: userData?.user?.nombre
        ? `${userData?.user?.nombre} ${userData?.user?.apellido ?? ""}`.trim()
        : undefined,
      mensajeAgradecimiento: "Gracias por tu generosidad",
      mostrarEnMuro: true,
    };

    try {
      const response = await fetch(`${API_URL}/mercadopago/donar`, {
      // const response = await fetch(`${apiUrl}/mercadopago/donar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userData?.token || ""}`,
        },
        body: JSON.stringify(donationData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al procesar la donación: ${errorText}`);
      }

      const data = await response.json();

      if (data?.pagoInfo?.init_point) {
        window.location.href = data.pagoInfo.init_point;
      } else {
        alert("No se recibió la URL de pago. Inténtalo nuevamente.");
      }
    } catch (error) {
      console.error("Error en la donación:", error);
      toast.error("Hubo un problema con la donación. Inténtalo nuevamente.");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        placeholder="Ingrese el monto"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 rounded w-full mb-3"
      />

      <button
        onClick={handleDonation}
        className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition w-full"
      >
        Donar
      </button>
    </div>
  );
};

export default DonationForm;

