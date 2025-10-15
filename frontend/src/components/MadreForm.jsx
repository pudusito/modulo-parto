import { useEffect, useState } from "react";
import { createMadre, getMadre, updateMadre } from "../api/wrapper";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function MadreForm() {
  const [madre, setMadre] = useState({ nombre: "", rut: "", edad: 0 });
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadMadre = async () => {
      if (params.id) {
        const response = await getMadre(params.id);
        setMadre(response.data);
      }
    };
    loadMadre();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      await updateMadre(params.id, madre);
      toast.success("Madre actualizada");
    } else {
      await createMadre(madre);
      toast.success("Madre creada");
    }
    navigate("/");
  };

  return (
    <div>
      <form className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Nombre</label>
          <input
            type="text"
            value={madre.nombre}
            onChange={(e) => setMadre({ ...madre, nombre: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">RUT</label>
          <input
            type="text"
            value={madre.rut}
            onChange={(e) => setMadre({ ...madre, rut: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Edad</label>
          <input
            type="number"
            value={madre.edad}
            onChange={(e) => setMadre({ ...madre, edad: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
