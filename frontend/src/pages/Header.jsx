import { Link } from 'react-router-dom';

export default function Header() {
  
  return (
    <>
    <header className="w-full bg-sky-900 text-white p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">Gestión de Partos</h1>

        <Link
          to="/madres"
          className="bg-white text-sky-900 px-4 py-2 rounded hover:bg-gray-100"
        >
          Agregar Paciente
        </Link>

        <Link
          to="/personal"
          className="bg-white text-sky-900 px-4 py-2 rounded hover:bg-gray-100"
        >
          Agregar Personal Clínico
        </Link>

        <Link
          to="/"
          className="bg-white text-sky-900 px-4 py-2 rounded hover:bg-gray-100"
        >
          Inicio
        </Link>


    </header>
    </>
  );
}

