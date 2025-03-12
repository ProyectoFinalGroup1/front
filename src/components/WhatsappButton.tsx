import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa"; // Si usas react-icons

const WhatsAppButton = () => {
  const whatsappNumber = "5491166569773"; // Número en formato internacional sin "+"
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
      <FaWhatsapp size={20} color="black" />
    </Link>
  );
};

export default WhatsAppButton;
