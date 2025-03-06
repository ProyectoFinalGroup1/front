import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const MessageForm = () => {
  const [mensaje, setMensaje] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // mensaje
  const handleMensajeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMensaje(e.target.value);
  };

  //  imagen
  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagen(e.target.files[0]);
    }
  };

  const enviarMensaje = async () => {
    if (!mensaje) {
      toast.error('El mensaje no puede estar vacío');
      return;
    }

    setLoading(true);

    try {
      let imagenUrl = '';
      if (imagen) {
        const formData = new FormData();
        formData.append('file', imagen);
        const uploadResponse = await axios.post(`/files/uploadImage/{inhumadoId}`, formData);
        imagenUrl = uploadResponse.data.url; 
      }

      await axios.post('/publicaciones/addPublicacion', {
        mensaje,
        imagenUrl,
        estado: 'Pendiente', 
      });

      toast.success('Tu mensaje ha sido enviado y está en espera de verificación.');
      setMensaje('');
      setImagen(null);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      toast.error('Hubo un error al enviar el mensaje.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Deja un mensaje en memoria</h2>
      <textarea
        value={mensaje}
        onChange={handleMensajeChange} 
        placeholder="Escribe tu mensaje..."
        className="w-full p-4 border border-gray-300 rounded-lg"
        rows={4}
      />
      <div className="mt-4">
        <input
          type="file"
          onChange={handleImagenChange}
          accept="image/*"
          className="w-full text-gray-700"
        />
      </div>
      <div className="text-center mt-4">
        <button
          onClick={enviarMensaje}
          disabled={loading}
          className={`bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
      </div>
    </div>
  );
};

export default MessageForm;















// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const MessageForm = () => {
//   const [mensaje, setMensaje] = useState('');
//   const [imagen, setImagen] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);

//   // mensaje
//   const handleMensajeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setMensaje(e.target.value);
//   };

//   //  imagen
//   const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setImagen(e.target.files[0]);
//     }
//   };

  
//   const enviarMensaje = async () => {
//     if (!mensaje) {
//       toast.error('El mensaje no puede estar vacío');
//       return;
//     }

//     setLoading(true);

//     try {
     
//       let imagenUrl = '';
//       if (imagen) {
//         const formData = new FormData();
//         formData.append('file', imagen);
//         const uploadResponse = await axios.post(`/files/uploadImage/{inhumadoId}`, formData);
//         imagenUrl = uploadResponse.data.url; 
//       }

    
//       await axios.post('/publicaciones/addPublicacion', {
//         mensaje,
//         imagenUrl,
//         estado: 'Pendiente', 
//       });

      
//       toast.success('Tu mensaje ha sido enviado y está en espera de verificación.');
//       setMensaje('');
//       setImagen(null);

//     } catch (error) {
//       toast.error('Hubo un error al enviar el mensaje.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mb-6 bg-white p-6 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Deja un mensaje en memoria</h2>

//       <textarea
//         value={mensaje}
//         onChange={handleMensajeChange} 
//         placeholder="Escribe tu mensaje..."
//         className="w-full p-4 border border-gray-300 rounded-lg"
//         rows={4}
//       />

     
//       <div className="mt-4">
//         <input
//           type="file"
//           onChange={handleImagenChange}
//           accept="image/*"
//           className="w-full text-gray-700"
//         />
//       </div>

     
//       <div className="text-center mt-4">
//         <button
//           onClick={enviarMensaje}
//           disabled={loading}
//           className={`bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition ${loading ? 'opacity-50' : ''}`}
//         >
//           {loading ? 'Enviando...' : 'Enviar mensaje'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MessageForm;
