import { useEffect, useState } from "react";
import { createConsulta, getConsulta, updateConsulta } from "../api/wrapper";
import { getMadres, getUsers } from "../api/wrapper"; // Cambié getUser por getUsers para traer todas las matronas
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function ConsultaMatronaForm() {
  const [consulta, setConsulta] = useState({
    madre: "",
    matrona: "",
    numero_consulta: 1,
    detalle: "",
  });

  const [madres, setMadres] = useState([]);
  const [matronas, setMatronas] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        // Traemos todas las madres
        const madresResp = await getMadres();
        setMadres(madresResp.data);

        // Traemos todos los usuarios y filtramos solo matronas
        const usuariosResp = await getUsers();
        setMatronas(usuariosResp.data.filter(u => u.rol?.toLowerCase() === "matrona"));
      } catch (error) {
        console.error("Error cargando opciones:", error);
      }
    };

    const loadConsulta = async () => {
      if (params.id) {
        try {
          const response = await getConsulta(params.id);
          setConsulta(response.data);
        } catch (error) {
          console.error("Error cargando consulta:", error);
        }
      }
    };

    loadOptions();
    loadConsulta();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await updateConsulta(params.id, consulta);
        toast.success("Consulta actualizada");
      } else {
        await createConsulta(consulta);
        toast.success("Consulta creada");
      }
      navigate("/");
    } catch (error) {
      console.error("Error guardando consulta:", error);
      toast.error("Error al guardar la consulta");
    }
  };

  return (
    <div>
      <form className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8" onSubmit={handleSubmit}>
        {/* Selección de madre */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Madre</label>
          <select
            value={consulta.madre}
            onChange={(e) => setConsulta({ ...consulta, madre: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Seleccione una madre</option>
            {madres.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>

        {/* Selección de matrona */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Matrona</label>
          <select
            value={consulta.matrona}
            onChange={(e) => setConsulta({ ...consulta, matrona: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Seleccione una matrona</option>
            {matronas.map((m) => (
              <option key={m.id} value={m.id}>{m.username}</option>
            ))}
          </select>
        </div>

        {/* Número de consulta */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Número de Consulta</label>
          <input
            type="number"
            value={consulta.numero_consulta}
            onChange={(e) => setConsulta({ ...consulta, numero_consulta: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* Detalle */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Detalle</label>
          <textarea
            value={consulta.detalle}
            onChange={(e) => setConsulta({ ...consulta, detalle: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
