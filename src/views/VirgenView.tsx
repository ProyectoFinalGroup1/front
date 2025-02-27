'use client'
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';

const VirgenView = () => {
  const [messages, setMessages] = useState<{ id: number; text: string; image?: string }[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editInput, setEditInput] = useState('');

  useEffect(() => {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = (values: { text: string; image?: File }, { resetForm }: any) => {
    if (values.image) {
      const reader = new FileReader();
      reader.readAsDataURL(values.image);
      reader.onload = () => {
        const newMessages = [...messages, { id: Date.now(), text: values.text, image: reader.result as string }];
        setMessages(newMessages);
        resetForm();
      };
    } else {
      const newMessages = [...messages, { id: Date.now(), text: values.text }];
      setMessages(newMessages);
      resetForm();
    }
  };

  const handleDelete = (id: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
  };

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditInput(text);
  };

  const handleSaveEdit = () => {
    const updatedMessages = messages.map(msg => (msg.id === editingId ? { ...msg, text: editInput } : msg));
    setMessages(updatedMessages);
    setEditingId(null);
    setEditInput('');
  };

  return (
    <div className="min-h-screen bg-fixed bg-cover bg-center text-black flex flex-col items-center justify-center p-8" style={{ backgroundImage: 'url(/images/fondo.jpg)' }}>
      <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-lg max-w-2xl text-center mt-16">
        <h1 className="text-4xl font-bold text-fuchsia-600 mb-4">Mensajes a la Virgen de San Nicolás</h1>
        <p className="text-lg text-gray-800 mb-4">Un espacio para dejar tus plegarias y pensamientos a la Virgen de San Nicolás.</p>
        
        <Formik initialValues={{ text: '', image: undefined }} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form className="mb-4 flex flex-col items-center">
              <Field as="textarea" name="text" className="w-full p-2 border rounded-lg text-center" placeholder="Escribe tu mensaje..." rows={3} />
              <div className="mt-2 flex flex-col items-center">
                <input type="file" accept="image/*" className="p-2 border rounded-lg" onChange={(event) => setFieldValue("image", event.currentTarget.files?.[0])} />
                <span className="text-gray-600">(Opcional)</span>
              </div>
              <button type="submit" className="mt-2 px-4 py-2 bg-fuchsia-600 text-white rounded-lg">Publicar</button>
            </Form>
          )}
        </Formik>
        
        <div className="w-full mt-4">
          {messages.map((msg) => (
            <div key={msg.id} className="p-3 rounded-lg shadow-md mb-2 text-center">
              {editingId === msg.id ? (
                <div>
                  <textarea className="w-full p-2 border rounded-lg" value={editInput} onChange={(e) => setEditInput(e.target.value)}></textarea>
                  <button onClick={handleSaveEdit} className="mt-2 px-3 py-1 bg-green-600 text-white rounded-lg">Guardar</button>
                </div>
              ) : (
                <>
                  <p className="text-gray-800">{msg.text}</p>
                  {msg.image && <img src={msg.image} alt="Mensaje adjunto" className="mt-2 w-32 h-auto rounded-lg mx-auto" />}
                  <div className="mt-2 flex justify-center gap-4">
                    <button onClick={() => handleEdit(msg.id, msg.text)} className="text-blue-500">Editar</button>
                    <button onClick={() => handleDelete(msg.id)} className="text-red-500">Eliminar</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirgenView;














// import React from 'react';

// const VirgenView = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-white to-pink-400 text-black flex flex-col items-center justify-center p-8">
//       <div className="bg-white bg-opacity-70 p-6 rounded-2xl shadow-lg max-w-2xl text-center">
//         <h1 className="text-4xl font-bold text-fuchsia-600 mb-4">Mensajes a la Virgen de San Nicolás</h1>
//         <p className="text-lg text-gray-800">
//           Un espacio para dejar tus plegarias y pensamientos a la Virgen de San Nicolás. Comparte tus sentimientos y encuentra consuelo en la fe.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default VirgenView;