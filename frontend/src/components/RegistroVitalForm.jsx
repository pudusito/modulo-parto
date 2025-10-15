import { useEffect, useState } from "react";
import { createVital, getVital, updateVital, getMadres, getUsers } from "../api/wrapper";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegistroVitalForm() {
  const [vital, setVital] = useState({
    madre: "",
    enfermero: "",
    altura: 0,
    peso: 0,
    temperatura: 0,
    presion: "",
    frecuencia_cardiaca: 0,
  });

  const [madres, setMadres] = useState([]);
  const [personal, setPersonal] = useState([]); // solo enfermeros
  const navigate = useNavigate();
  const params = useParams();

  // 🔹 Cargar opciones
  useEffect(() => {
    const loadOptions = async () => {
      try {
        // pacientes
        const madresResp = await getMadres();
        setMadres(madresResp.data);

        // usuarios filtrando enfermeros
        const usersResp = await getUsers();
        const enfermeros = usersResp.data.filter(u => u.rol === "Enfermero");
        setPersonal(enfermeros);
      } catch (err) {
        console.error(err);
        toast.error("Error cargando opciones");
      }
    };

    const loadVital = async () => {
      if (params.id) {
        try {
          const response = await getVital(params.id);
          setVital(response.data);
        } catch (err) {
          console.error(err);
          toast.error("Error cargando registro vital");
        }
      }
    };

    loadOptions();
    loadVital();
  }, [params.id]);

  // 🔹 Guardar registro vital
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await updateVital(params.id, vital);
        toast.success("Registro vital actualizado");
      } else {
        await createVital(vital);
        toast.success("Registro vital creado");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Ocurrió un error al guardar");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8"
      >

        <h1 className="text-[3rem] text-center font-bold flex justify-center items-center text-cyan-600 mb-[2rem] ">
         Formulario Madre 
        </h1>        
        {/* Selección de madre */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Madre</label>
          <select
            value={vital.madre}
            onChange={(e) => setVital({ ...vital, madre: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Seleccione una madre</option>
            {madres.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de enfermero */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Enfermero</label>
          <select
            value={vital.enfermero}
            onChange={(e) => setVital({ ...vital, enfermero: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="">Seleccione un enfermero</option>
            {personal.map((p) => (
              <option key={p.id} value={p.id}>
                {p.username}
              </option>
            ))}
          </select>
        </div>

        {/* Otros campos numéricos */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Altura (cm)</label>
          <input
            type="number"
            value={vital.altura}
            onChange={(e) => setVital({ ...vital, altura: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Peso (kg)</label>
          <input
            type="number"
            value={vital.peso}
            onChange={(e) => setVital({ ...vital, peso: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Temperatura (°C)</label>
          <input
            type="number"
            value={vital.temperatura}
            onChange={(e) => setVital({ ...vital, temperatura: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Presión</label>
          <input
            type="text"
            value={vital.presion}
            onChange={(e) => setVital({ ...vital, presion: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Frecuencia Cardíaca</label>
          <input
            type="number"
            value={vital.frecuencia_cardiaca}
            onChange={(e) => setVital({ ...vital, frecuencia_cardiaca: e.target.value })}
            className="shadow border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
