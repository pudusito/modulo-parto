import { useEffect, useState } from "react";
import { createFeedback, getFeedback, updateFeedback } from "../api/wrapper";
import { getPartos, getUsers, getMadres } from "../api/wrapper";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function FeedbackJefeForm() {
  const [feedback, setFeedback] = useState({
    parto: "",
    jefe: "",
    comentario: "",
    equipo_asignado: [],
  });

  const [partos, setPartos] = useState([]);
  const [madres, setMadres] = useState([]);
  const [jefes, setJefes] = useState([]);
  const [personal, setPersonal] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  // 🔹 Cargar opciones y feedback existente
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [madresResp, partosResp, usersResp] = await Promise.all([
          getMadres(),
          getPartos(),
          getUsers(),
        ]);

        setMadres(madresResp.data);
        setPartos(partosResp.data);
        setPersonal(usersResp.data);

        // Solo jefes
        const jefesFiltrados = usersResp.data.filter(u => u.rol?.toLowerCase() === "jefe");
        setJefes(jefesFiltrados);
      } catch (error) {
        console.error("Error cargando opciones:", error);
        toast.error("Error cargando opciones");
      }
    };

    const loadFeedback = async () => {
      if (params.id) {
        try {
          const response = await getFeedback(params.id);
          setFeedback(response.data);
        } catch (error) {
          console.error("Error cargando feedback:", error);
          toast.error("Error cargando feedback");
        }
      }
    };

    loadOptions();
    loadFeedback();
  }, [params.id]);

  // 🔹 Manejo de cambio de parto
  const handlePartoChange = (e) => {
    const partoId = e.target.value;
    setFeedback((prev) => {
      const partoSeleccionado = partos.find(p => p.id === Number(partoId));
      let equipoConMedicos = [...prev.equipo_asignado];

      // Asignar médico automáticamente al equipo
      if (partoSeleccionado && partoSeleccionado.medico) {
        const medicoId = Number(partoSeleccionado.medico);
        if (!equipoConMedicos.includes(medicoId)) equipoConMedicos.push(medicoId);
      }

      // Mantener el jefe seleccionado manualmente
      const jefeId = prev.jefe;

      return {
        ...prev,
        parto: partoId,
        jefe: jefeId,
        equipo_asignado: equipoConMedicos
      };
    });
  };

  // 🔹 Manejo de checkboxes de equipo
  const handleCheckbox = (id) => {
    const numId = Number(id);
    setFeedback((prev) => ({
      ...prev,
      equipo_asignado: prev.equipo_asignado.includes(numId)
        ? prev.equipo_asignado.filter(x => x !== numId)
        : [...prev.equipo_asignado, numId],
    }));
  };

  // 🔹 Guardar feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...feedback };
      if (params.id) {
        await updateFeedback(params.id, payload);
        toast.success("Feedback actualizado");
      } else {
        await createFeedback(payload);
        toast.success("Feedback creado");
      }
      navigate("/");
    } catch (error) {
      console.error("Error guardando feedback:", error);
      toast.error("No se pudo guardar el feedback");
    }
  };

  // 🔹 Obtener nombre de madre
  const getNombreMadre = (madreId) => {
    const madre = madres.find(m => m.id === Number(madreId));
    return madre ? madre.nombre : "Desconocida";
  };

  return (
    <div>
      <form className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8" onSubmit={handleSubmit}>
        {/* Parto */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Parto</label>
          <select
            value={feedback.parto}
            onChange={handlePartoChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Seleccione un parto</option>
            {partos.map((p) => (
              <option key={p.id} value={p.id}>
                {getNombreMadre(p.madre)} - {p.tipo}
              </option>
            ))}
          </select>
        </div>

        {/* Jefe */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Jefe</label>
          <select
            value={feedback.jefe}
            onChange={(e) => setFeedback({ ...feedback, jefe: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Seleccione un jefe</option>
            {jefes.map((j) => (
              <option key={j.id} value={j.id}>{j.username}</option>
            ))}
          </select>
        </div>

        {/* Equipo asignado */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Equipo Asignado</label>
          <div className="grid grid-cols-2 gap-2">
            {personal.map((p) => (
              <label key={p.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={feedback.equipo_asignado.includes(Number(p.id))}
                  onChange={() => handleCheckbox(p.id)}
                  className="mr-2"
                />
                {p.username} ({p.rol})
              </label>
            ))}
          </div>
        </div>

        {/* Comentario */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Comentario</label>
          <textarea
            value={feedback.comentario}
            onChange={(e) => setFeedback({ ...feedback, comentario: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}

