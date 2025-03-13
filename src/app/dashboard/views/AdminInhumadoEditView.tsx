// app/admin/inhumados/[inhumadoId]/editar/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { XCircle } from "lucide-react";

interface Inhumado {
  id: string;
  nombre: string;
  apellido: string;
  fnac: string;
  ffal: string;
  valle: string;
  sector: string;
  manzana: string;
  parcela: string;
  simbolo: string;
  ncliente: string;
  imagenUrl: string;
}

export default function EditarInhumado({
  params,
}: {
  params: { inhumadoId: string };
}) {
  const { inhumadoId } = params;
  const router = useRouter();
  const [inhumado, setInhumado] = useState<Inhumado | null>(null);
  const [formData, setFormData] = useState<Partial<Inhumado>>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInhumado = async () => {
      try {
        const tokenData = localStorage.getItem('userSession');
        const parsedToken = tokenData ? JSON.parse(tokenData) : null;
        const token = parsedToken?.token;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/inhumados/${inhumadoId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("No se pudo obtener la información del inhumado");
        }
        const data = await response.json();

        setInhumado(data);
        setFormData(data);
        setImagePreview(data.imagenUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchInhumado();
  }, [inhumadoId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //comento para build
  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Verificar si hay cambios reales
    let hasChanges = false;

    // Comparar cada campo del formulario con el original
    for (const key in formData) {
      if (formData[key] !== inhumado?.[key as keyof Inhumado]) {
        hasChanges = true;
        break;
      }
    }

    // Si hay una nueva imagen, también hay cambios
    if (imageFile) {
      hasChanges = true;
    }

    // Si no hay cambios, mostrar mensaje y salir
    if (!hasChanges) {
      setSaving(false);
      toast("No hay cambios para guardar");
      return;
    }

    // Mostrar toast de confirmación con botones personalizados
    toast.custom((t) => (
      <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
        <p className="text-gray-800 font-semibold mb-2">
          ¿Estás seguro de guardar los cambios?
        </p>
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={async () => {
              toast.dismiss(t.id); // Cerrar el toast de confirmación
              toast.loading("Guardando cambios...");

              try {
                

                // Crear un FormData para enviar tanto los datos como la imagen en un solo request
                const completeFormData = new FormData();

                // Solo agregar los campos que realmente han cambiado
                for (const key in formData) {
                  if (
                    formData[key] !== inhumado?.[key as keyof Inhumado] &&
                    formData[key] !== null &&
                    formData[key] !== undefined
                  ) {
                    completeFormData.append(key, formData[key]!.toString());
                  }
                }

                // Agregar la imagen si existe
                if (imageFile) {
                  completeFormData.append("imagen", imageFile);
                }

                // Enviar todos los datos en un solo request
                const tokenData = localStorage.getItem("userSession");
                const parsedToken = tokenData ? JSON.parse(tokenData) : null;
                const token = parsedToken?.token
                const updateResponse = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/inhumados/${inhumadoId}`,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    body: completeFormData,
                  }
                );

                if (!updateResponse.ok) {
                  const errorData = await updateResponse.json();
                  throw new Error(
                    errorData.message ||
                      "Error al actualizar los datos del inhumado"
                  );
                }

                toast.dismiss(); // Cerrar cualquier toast de carga
                toast.success("Inhumado actualizado con éxito");
                router.push(`/dashboard/admin/inhumados/detalle/${inhumadoId}`);
              } catch (err) {
                toast.dismiss();
                toast.error(
                  err instanceof Error ? err.message : "Error desconocido"
                );
                setError(
                  err instanceof Error ? err.message : "Error desconocido"
                );
                setSaving(false);
              }
            }}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
            onClick={() => {
              toast.dismiss(t.id);
              setSaving(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    ));
  };

  // Función para cancelar y volver atrás
  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error && !inhumado) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => router.push("dashboard/admin/inhumados")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Volver a la lista
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-right" />
      <div className=" shadow-lg rounded-2xl p-6 max-w-4xl w-full m-20">
        <h1 className="text-2xl font-bold text-center mb-4">
          Editar Inhumado
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre y Apellido */}
            <div>
              <label className="block mb-2 text-gray-700">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nombre"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.nombre || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">
                Apellido <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="apellido"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.apellido || ""}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">
                Fecha de Nacimiento
              </label>
              <input
               
                name="fnac"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.fnac || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">
                Fecha de Fallecimiento
              </label>
              <input
                
                name="ffal"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.ffal || ""}
                onChange={handleInputChange}
              />
            </div>

            {/* Select de Valle */}
            <div>
              <label className="block mb-2 text-gray-700">
                Valle <span className="text-red-500">*</span>
              </label>
              <select
                name="valle"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.valle || ""}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un Valle</option>
                {[
                  "Sauces",
                  "Nogales",
                  "Magnolias",
                  "Robles",
                  "Cipreses",
                  "Ciisas",
                ].map((valle) => (
                  <option key={valle} value={valle}>
                    {valle}
                  </option>
                ))}
              </select>
            </div>

            {/* Select de Sector */}
            <div>
              <label className="block mb-2 text-gray-700">Sector</label>
              <select
                name="sector"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.sector || ""}
                onChange={handleInputChange}
              >
                <option value="">Seleccione un Sector</option>
                {["A", "B", "C"].map((sector) => (
                  <option key={sector} value={sector}>
                    {sector}
                  </option>
                ))}
              </select>
            </div>

            {/* Resto de los campos */}
            <div>
              <label className="block mb-2 text-gray-700">Manzana</label>
              <input
                type="text"
                name="manzana"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.manzana || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Parcela</label>
              <input
                type="text"
                name="parcela"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.parcela || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Símbolo</label>
              <input
                type="text"
                name="simbolo"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.simbolo || ""}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">
                Número de Cliente
              </label>
              <input
                type="text"
                name="ncliente"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.ncliente || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-gray-700">
              Imagen <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <div className="mt-2 relative inline-block">
             
                <div className="relative h-20 w-20 border rounded overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    
                     className="w-20 h-20 object-cover border rounded"
                  />
                </div>
                {/* Botón para cerrar la vista previa */}
                <button
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                >
                  <XCircle size={16} className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>
          )}

          <div className="flex justify-center mt-4 gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all ${
                saving ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {saving ? "Guardando..." : "Guardar Cambios"} 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
