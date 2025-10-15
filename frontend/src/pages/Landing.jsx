import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getMadres, getUsers } from "../api/wrapper";

export default function LandingPage() {
  const [madres, setMadres] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Cargar pacientes
    const loadMadres = async () => {
      try {
        const response = await getMadres();
        setMadres(response.data);
      } catch (error) {
        console.error("Error cargando madres:", error);
      }
    };

    // Cargar personal clínico
    const loadUsuarios = async () => {
      try {
        const response = await getUsers();
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    };

    loadMadres();
    loadUsuarios();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">

      {/* Lista de Personal Clínico */}
      <div className="w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Personal Clínico</h2>
        <ul className="bg-white shadow rounded divide-y divide-gray-200">
          {usuarios.map((user) => (
            <li key={user.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{user.username}</p>
                {/* Mostrar todos los grupos */}
                <p>Grupo: {user.grupos?.join(", ") || "Sin grupo"}</p>
              </div>
              <Link
                to={`/usuarios/${user.id}`}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
              >
                Ver detalles
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Lista de pacientes */}
      <div className="w-full max-w-2xl mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Pacientes Registrados</h2>
        <ul className="bg-white shadow rounded divide-y divide-gray-200">
          {madres.map((madre) => (
            <li key={madre.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-bold">{madre.nombre}</p>
                <p>RUT: {madre.rut}</p>
                <p>Edad: {madre.edad}</p>
              </div>
              <Link
                to={`/madres/${madre.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Ver detalles
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">Gestión de Partos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
        <Link
          to="/vitales"
          className="bg-red-500 text-white py-4 px-6 rounded-lg text-center hover:bg-red-600"
        >
          Enfermeros: Registros Vitales
        </Link>

        <Link
          to="/consultas"
          className="bg-yellow-500 text-white py-4 px-6 rounded-lg text-center hover:bg-yellow-600"
        >
          Matrona: Consulta
        </Link>

        <Link
          to="/partos"
          className="bg-purple-500 text-white py-4 px-6 rounded-lg text-center hover:bg-purple-600"
        >
          Cirujano: Partos
        </Link>

        <Link
          to="/feedback"
          className="bg-indigo-500 text-white py-4 px-6 rounded-lg text-center hover:bg-indigo-600"
        >
          Jefe Hospital: Feedback
        </Link>
      </div>
    </div>
  );
}
