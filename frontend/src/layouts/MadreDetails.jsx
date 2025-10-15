import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getMadre,
  getVitales,
  getConsultas,
  getPartos,
  getUsers,
} from "../api/wrapper";

export default function MadreDetails() {
  const { id } = useParams();
  const [madre, setMadre] = useState(null);
  const [vitales, setVitales] = useState([]);
  const [consultas, setConsultas] = useState([]);
  const [partos, setPartos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Datos de la madre
        const madreResp = await getMadre(id);
        setMadre(madreResp.data);

        // Registros vitales filtrados por madre
        const vitalesResp = await getVitales();
        setVitales(vitalesResp.data.filter(v => v.madre === Number(id)));

        // Consultas filtradas por madre
        const consultasResp = await getConsultas();
        setConsultas(consultasResp.data.filter(c => c.madre === Number(id)));

        // Partos filtrados por madre
        const partosResp = await getPartos();
        setPartos(partosResp.data.filter(p => p.madre === Number(id)));

        // Todos los usuarios
        const usersResp = await getUsers();
        setUsuarios(usersResp.data);
      } catch (error) {
        console.error("Error cargando datos:", error);
        toast.error("No se pudieron cargar los datos de la madre");
      }
    };

    loadData();
  }, [id]);

  // Obtener nombre de usuario por id
  const getUsuarioNombre = (userId) => {
    const user = usuarios.find((u) => u.id === Number(userId));
    return user ? user.username : "Desconocido";
  };

  if (!madre) return <p>Cargando datos de la madre...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">{madre.nombre}</h1>
        <p><strong>RUT:</strong> {madre.rut}</p>
        <p><strong>Edad:</strong> {madre.edad}</p>

        {/* 🔹 Registros Vitales */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Registros Vitales</h2>
          {vitales.length === 0 ? (
            <p>No hay registros vitales.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {vitales.map((v) => (
                <li key={v.id} className="py-2">
                  <p><strong>Enfermero:</strong> {getUsuarioNombre(v.enfermero)}</p>
                  <p><strong>Hora:</strong> {new Date(v.fecha).toLocaleString()}</p>
                  <p><strong>Temperatura:</strong> {v.temperatura}</p>
                  <p><strong>Presión:</strong> {v.presion}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🔹 Consultas Matrona */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Consultas Matrona</h2>
          {consultas.length === 0 ? (
            <p>No hay consultas registradas.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {consultas.map((c) => (
                <li key={c.id} className="py-2">
                  <p><strong>Matrona:</strong> {getUsuarioNombre(c.matrona)}</p>
                  <p><strong>Fecha:</strong> {new Date(c.fecha).toLocaleString()}</p>
                  <p><strong>Observación:</strong> {c.observacion}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🔹 Partos */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Partos</h2>
          {partos.length === 0 ? (
            <p>No hay partos registrados.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {partos.map((p) => (
                <li key={p.id} className="py-2">
                  <p><strong>Tipo de Parto:</strong> {p.tipo}</p>
                  <p><strong>Médico Responsable:</strong> {getUsuarioNombre(p.medico)}</p>
                  <p><strong>Hora Inicio:</strong> {new Date(p.hora_inicio).toLocaleString()}</p>
                  <p><strong>Hora Término:</strong> {new Date(p.hora_termino).toLocaleString()}</p>
                  <p><strong>Resultado:</strong> {p.resultado}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
