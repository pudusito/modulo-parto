import { useEffect, useState } from "react";
import { createParto, getParto, updateParto } from "../api/wrapper";
import { getMadres, getUsers } from "../api/wrapper";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function PartoForm() {
  const [parto, setParto] = useState({
    madre: "",
    tipo: "natural",
    medico: "", // médico responsable
    hora_inicio: "",
    hora_termino: "",
    resultado: "",
  });

  const [madres, setMadres] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  // 🔹 Cargar opciones y datos existentes
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const madresResp = await getMadres();
        setMadres(madresResp.data);

        const usuariosResp = await getUsers();
        setMedicos(usuariosResp.data.filter(u => u.rol?.toLowerCase() === "medico"));
      } catch (error) {
        console.error("Error cargando opciones:", error);
        toast.error("Error cargando opciones");
      }
    };

    const loadParto = async () => {
      if (params.id) {
        try {
          const response = await getParto(params.id);
          setParto(response.data);
        } catch (error) {
          console.error("Error cargando parto:", error);
          toast.error("Error cargando parto");
        }
      }
    };

    loadOptions();
    loadParto();
  }, [params.id]);

  // 🔹 Guardar parto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await updateParto(params.id, parto);
        toast.success("Parto actualizado");
      } else {
        await createParto(parto);
        toast.success("Parto creado");
      }
      navigate("/");
    } catch (error) {
      console.error("Error guardando parto:", error);
      toast.error("No se pudo guardar el parto");
    }
  };

  return (
    <div>
      <form className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8" onSubmit={handleSubmit}>
        
        {/* Madre */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Madre</label>
          <select
            value={parto.madre}
            onChange={(e) => setParto({ ...parto, madre: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Seleccione una madre</option>
            {madres.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>

        {/* Tipo de parto */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tipo de Parto</label>
          <select
            value={parto.tipo}
            onChange={(e) => setParto({ ...parto, tipo: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="natural">Natural</option>
            <option value="cesarea">Cesárea</option>
            <option value="instrumental">Instrumental</option>
          </select>
        </div>

        {/* Médico responsable */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Médico Responsable</label>
          <select
            value={parto.medico}
            onChange={(e) => setParto({ ...parto, medico: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Seleccione un médico</option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>{m.username}</option>
            ))}
          </select>
        </div>

        {/* Hora inicio */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Hora Inicio</label>
          <input
            type="datetime-local"
            value={parto.hora_inicio}
            onChange={(e) => setParto({ ...parto, hora_inicio: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* Hora término */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Hora Término</label>
          <input
            type="datetime-local"
            value={parto.hora_termino}
            onChange={(e) => setParto({ ...parto, hora_termino: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* Resultado */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Resultado</label>
          <textarea
            value={parto.resultado}
            onChange={(e) => setParto({ ...parto, resultado: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
