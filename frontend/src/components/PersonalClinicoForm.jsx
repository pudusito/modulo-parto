import { useEffect, useState } from "react";
import { createUser, getUser, updateUser, getGroups } from "../api/wrapper";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function PersonalClinicoForm() {
  const [personal, setPersonal] = useState({
    username: "",
    password: "",
    grupo: "",
  });

  const [grupos, setGrupos] = useState([]); // grupos cargados desde el backend
  const navigate = useNavigate();
  const params = useParams();

  // 🔹 Cargar grupos disponibles
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const res = await getGroups();
        setGrupos(res.data);
        // asigna el primer grupo como valor por defecto
        if (!personal.grupo && res.data.length > 0) {
          setPersonal((prev) => ({ ...prev, grupo: res.data[0].name }));
        }
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar los grupos");
      }
    };
    loadGroups();
  }, []);

  // 🔹 Cargar usuario si es edición
  useEffect(() => {
    const loadUser = async () => {
      if (params.id) {
        try {
          const response = await getUser(params.id);
          setPersonal({
            username: response.data.username,
            password: "",
            grupo: response.data.grupos?.[0] || "", // usar primer grupo del array
          });
        } catch (error) {
          console.error(error);
          toast.error("Error al cargar el usuario");
        }
      }
    };
    loadUser();
  }, [params.id]);

  // 🔹 Guardar usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (params.id) {
        await updateUser(params.id, {
          username: personal.username,
          grupo: personal.grupo,
        });
        toast.success("Usuario actualizado");
      } else {
        await createUser({
          username: personal.username,
          password: personal.password,
          grupo: personal.grupo,
        });
        toast.success("Usuario creado");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al guardar");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8"
      >
        {/* Usuario */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Usuario</label>
          <input
            type="text"
            value={personal.username}
            onChange={(e) =>
              setPersonal({ ...personal, username: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        {/* Contraseña (solo al crear) */}
        {!params.id && (
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={personal.password}
              onChange={(e) =>
                setPersonal({ ...personal, password: e.target.value })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
        )}

        {/* Grupo */}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Grupo</label>
          <select
            value={personal.grupo}
            onChange={(e) =>
              setPersonal({ ...personal, grupo: e.target.value })
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          >
            {grupos.map((g) => (
              <option key={g.id} value={g.name}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
}
