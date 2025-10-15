import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers } from "../api/wrapper";

export default function UsuarioDetail() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const loadUsuario = async () => {
      try {
        const response = await getUsers();
        const selected = response.data.find((u) => u.id === parseInt(id));
        setUsuario(selected);
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };

    loadUsuario();
  }, [id]);

  if (!usuario) return <p>Cargando...</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Detalle Usuario: {usuario.username}</h2>
      <p>Grupos: {usuario.grupos?.join(", ") || "Sin grupo"}</p>
    </div>
  );
}
