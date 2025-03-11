'use client'
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';


const API_URL = process.env.NEXT_PUBLIC_API_URL;
const VirgenView = () => {

  const { userData } = useAuth();
  // console.log("id de usuario:", userData?.user.idUser);
  console.log("token de usuario", userData?.token);
  
  
  const [messages, setMessages] = useState<{id: string;
                                            texto: string;
                                            imagenUrl?: string;
                                            fechaPublicacion: string;
                                            estado: boolean;
                                            idUser: string;
                                          }[]>([]);
  // const [editingId, setEditingId] = useState<number | null>(null);
  // const [editInput, setEditInput] = useState('');  

  // Se cargan los mensajes desde el back
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/mensajesVirgen`, {
          method: "GET",
          // headers: {
          //   Authorization: `Bearer ${userData?.token}`,
          // },
        });

        if (!response.ok) {
          const errorText = await response.text();    // Intenta leer el mensaje del backend
          throw new Error(`Error al obtener los mensajes: ${errorText}`);
        }
        const data = await response.json();
        setMessages(data);
        console.log(data);

      } catch (error) {
        console.error("Error en fetchMessages:", error);
      }
    };
  
    // if (userData?.user.idUser) {
    //   fetchMessages();
    // }
    fetchMessages();
  }, []);  // [userData?.user.idUser] Se volverá a montar cuando se loguee otro idUser

  const handleSubmit = async (values: { texto: string; imagen?: File }, { resetForm }: { resetForm: () => void }) => {
    if (!userData || !userData.user || !userData.user.idUser) {
    toast.error("Porfavor, Inicia Sesión para continuar", {
      position: "top-center"
    });
      return;
    }

    const token = userData.token;
    if (!token) {
      toast.error("Autenticación inválida. Intenta iniciar sesión nuevamente.", {
        position: "top-center"
      });
      return;
    }
    
    if (!values.texto.trim()) {
      toast.error("Debes escribir un mensaje para enviar", {
                  position: "top-center"
      });
      return;
    }
    
    const formData = new FormData();
    formData.append('texto', values.texto);
    formData.append('usuarioId', userData?.user.idUser) // formData.append("usuarioId", userData.user.idUser.toString());  
    
    if (values.imagen) {
      formData.append('file', values.imagen);
    }

    console.log([...formData.entries()].map(([key, value]) => ({ key, value })));
  
    try {
      toast.success("Enviando tu mensaje...", {
                    position: "top-center"
      });

      const response = await fetch(`${API_URL}/mensajesVirgen/addMensajeVirgen/${userData.user.idUser}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      // Se verifica si la respuesta es texto plano
      const responseText = await response.text();
      console.log("Respuesta del servidor:", responseText);
      
      if (!response.ok) {
        //const errorText = await response.text();                    
        throw new Error(`Error al guardar el mensaje: ${responseText}`);
      }
      
      // Si el servidor envía texto plano, se intenta convertirlo solo si es válido
      let newMessage;
      try {
        newMessage = JSON.parse(responseText);
      } catch (error) {
        console.warn("La respuesta del servidor no es un JSON válido.", error);
        newMessage = { id: Date.now(), text: values.texto };                  // se usan valores temporales
      }

      setMessages([...messages, newMessage]);

      
      toast.success("Tu mensaje fue enviado y está en espera de aprobación.", {
                    position: "top-center",
                    duration: 5000 
      });
  
      resetForm();
    } catch (error) {
      console.error("Error al guardar el mensaje:", error);
      toast.error("Hubo un problema al enviar el mensaje. Por favor intenta nuevamente.", {
                  position: "top-center"
      });
    }
  };

  // const handleDelete = (id: number) => {
  //   const updatedMessages = messages.filter(msg => msg.id !== id);
  //   setMessages(updatedMessages);
  // };

  // const handleEdit = (id: number, text: string) => {
  //   setEditingId(id);
  //   setEditInput(text);
  // };

  // const handleSaveEdit = () => {
  //   const updatedMessages = messages.map(msg => (msg.id === editingId ? { ...msg, text: editInput } : msg));
  //   setMessages(updatedMessages);
  //   setEditingId(null);
  //   setEditInput('');
  // };
  const formatosPermitidos = ["image/jpeg", "image/png", "image/webp"];
  
  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center text-black flex flex-col items-center justify-center p-8" style={{ backgroundImage: 'url(/images/flores.webp)' }}>
      <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-lg max-w-2xl text-center mt-16 flex">
        
        {/* Imagen al costado izquierdo */}
        <div className="hidden md:block w-48  flex-shrink-0 p-3">
          <img
            src="/images/virgen.jpg"
            alt="Virgen de San Nicolás"
            className="w-full h-[400px] object-cover rounded-full shadow-lg border-4 border-white-300"
          />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-fuchsia-600 mb-4">Mensajes a la Virgen de San Nicolás</h1>
          <p className="text-lg text-gray-800 mb-4">Un espacio para dejar tus plegarias y pensamientos a la Virgen de San Nicolás.</p>

          <Formik initialValues={{ texto: '', image: undefined }} onSubmit={handleSubmit}>
            {({ setFieldValue }) => (
              <Form className="mb-4 flex flex-col items-center">
                <Field as="textarea"
                        name="texto"
                        className="w-full p-2 border rounded-lg text-center"
                        placeholder="Escribe tu mensaje..."
                        rows={3} />
                <div className=" text-sm mt-2 flex flex-col items-center">
                  <input type="file"
                        accept="image/*"
                        className="p-2 border rounded-lg"
                        onChange={(event) => {
                          const file = event.currentTarget.files?.[0];
                          if (file) {
                            console.log("Archivo seleccionado:", file);
                            
                            // verifica si el formato es permitido
                            if (!formatosPermitidos.includes(file.type)) {
                              toast.error("Formato de imagen no válido. Usa JPG, PNG, WebP.", {
                                          position: 'top-center',
                                          duration: 5000
                              });
                              return;
                            }
                          }

                          setFieldValue("imagen", file)}}
                  />
                  <span className=" text-sm text-gray-600">(Opcional)</span>
                </div>

                <button type="submit" className="mt-2 px-4 py-2 bg-fuchsia-600 text-white rounded-lg">Publicar</button>
              </Form>
            )}
          </Formik>
          
          <div className="w-full mt-4">
            {messages
            .map((msg) => (
              <div key={msg.id} className="p-3 rounded-lg shadow-md mb-2 text-center">
                {msg.estado ? (
                  <>
                    <p className="text-gray-800 font-bold text-lg">
                      {msg.texto}
                    </p>

                    {msg.imagenUrl && (
                      <div className="flex justify-center">
                        <img src={msg.imagenUrl} alt="Imagen del mensaje" className="mt-2 max-w-xs rounded-lg" />
                      </div>
                    )}

                    <p className="text-xs text-gray-500">
                    Fecha {new Date(msg.fechaPublicacion).toLocaleString()}
                    </p>
                  </>
                ) : (
                  <div>
                  <p className="text-gray-500 italic">
                    Plegaria pendiente de aprobación.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Fecha de solicitud {new Date(msg.fechaPublicacion).toLocaleString()}
                  </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirgenView;



// {editingId === msg.id ? (
//   <div>
//     <textarea className="w-full p-2 border rounded-lg" value={editInput} onChange={(e) => setEditInput(e.target.value)}></textarea>
//     <button onClick={handleSaveEdit} className="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg">Guardar</button>
//   </div>
// ) : (
//   <>
//     <p className="text-gray-800">{msg.text}</p>
//     <div className="mt-2 flex justify-center gap-4">
//       <button onClick={() => handleEdit(msg.id, msg.text)} className="text-blue-500">Editar</button>
//       <button onClick={() => handleDelete(msg.id)} className="text-red-500">Eliminar</button>
//     </div>
//   </>
// )}