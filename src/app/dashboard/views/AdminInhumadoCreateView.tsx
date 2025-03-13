"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { XCircle } from "lucide-react";
import { IInhumadoFormData } from "@/types";




const AdminInhumadoCreateView = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<IInhumadoFormData>({
    nombre: "",
    apellido: "",
    fnac: "",
    ffal: "",
    valle: "",
    sector: "",
    manzana: "",
    parcela: "",
    simbolo: "",
    ncliente: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        !formData.nombre ||
        !formData.apellido ||
        !formData.valle ||
        !imageFile
      ) {
        toast.error("Por favor complete todos los campos requeridos");
        return;
      }

      const submitData = new FormData();
      submitData.append("file", imageFile);

      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      const tokenData = localStorage.getItem('userSession');
      const parsedToken = tokenData ? JSON.parse(tokenData) : null;
      const token = parsedToken?.token;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inhumados/addInhumado`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "POST",
          body: submitData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el inhumado");
      }

      toast.success("Inhumado/a dado/a de alta correctamente");
      router.push("/dashboard/admin/inhumados");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" shadow-lg rounded-2xl p-6 max-w-4xl w-full m-20">
        <h1 className="text-2xl font-bold text-center mb-4">
          Agregar Nuevo Inhumado
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Nombre", name: "nombre", required: true },
              { label: "Apellido", name: "apellido", required: true },
              { label: "Fecha de Nacimiento", name: "fnac", type: "date" },
              { label: "Fecha de Fallecimiento", name: "ffal", type: "date" },
            ].map(({ label, name, type = "text", required }) => (
              <div key={name}>
                <label className="block mb-2 text-gray-700">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  name={name}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData[name as keyof IInhumadoFormData]}
                  onChange={handleInputChange}
                  required={required}
                />
              </div>
            ))}

            <div>
              <label className="block mb-2 text-gray-700">
                Valle <span className="text-red-500">*</span>
              </label>
              <select
                name="valle"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.valle}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un Valle</option>
                {["Sauces", "Nogales", "Magnolias", "Robles", "Cipreses"].map(
                  (valle) => (
                    <option key={valle} value={valle}>
                      {valle}
                    </option>
                  )
                )}
              </select>
            </div>

            {[
              { label: "Manzana", name: "manzana" },
              { label: "Parcela", name: "parcela" },
              { label: "Símbolo", name: "simbolo" },
              { label: "Número de Cliente", name: "ncliente" },
            ].map(({ label, name }) => (
              <div key={name}>
                <label className="block mb-2 text-gray-700">{label}</label>
                <input
                  type="text"
                  name={name}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData[name as keyof IInhumadoFormData]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block mb-2">
              Imagen <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/jpeg, image/png"
              className="w-full p-2 border rounded"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <div className="mt-2 relative inline-block">
               
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="w-20 h-20 object-cover border rounded"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-200"
                  >
                    <XCircle size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center mt-4 gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-gray-500 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-all ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Guardando..." : "Guardar Inhumado"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminInhumadoCreateView;
