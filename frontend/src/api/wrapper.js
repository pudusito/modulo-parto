import axios from 'axios';

// 🔹 Configuración base
const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// Función para agregar token JWT a los headers
const authConfig = () => {
  const token = localStorage.getItem('access_token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ================= Usuarios =================
const usersApi = axios.create({ baseURL: API_BASE_URL + 'users/' });

export const getUsers = () => usersApi.get('', authConfig());
export const getUser = (id) => usersApi.get(`${id}/`, authConfig());
export const createUser = (user) => usersApi.post('', user, authConfig());
export const updateUser = (id, user) => usersApi.put(`${id}/`, user, authConfig());
export const deleteUser = (id) => usersApi.delete(`${id}/`, authConfig());

// ================= Grupos =================
const groupsApi = axios.create({ baseURL: API_BASE_URL + 'groups/' });

export const getGroups = () => groupsApi.get('', authConfig());

// ================= Madres =================
const madresApi = axios.create({ baseURL: API_BASE_URL + 'madres/' });

export const getMadres = () => madresApi.get('', authConfig());
export const getMadre = (id) => madresApi.get(`${id}/`, authConfig());
export const createMadre = (madre) => madresApi.post('', madre, authConfig());
export const updateMadre = (id, madre) => madresApi.put(`${id}/`, madre, authConfig());
export const deleteMadre = (id) => madresApi.delete(`${id}/`, authConfig());

// ================= Registro Vital =================
const vitalesApi = axios.create({ baseURL: API_BASE_URL + 'vitales/' });

export const getVitales = () => vitalesApi.get('', authConfig());
export const getVital = (id) => vitalesApi.get(`${id}/`, authConfig());
export const createVital = (vital) => vitalesApi.post('', vital, authConfig());
export const updateVital = (id, vital) => vitalesApi.put(`${id}/`, vital, authConfig());
export const deleteVital = (id) => vitalesApi.delete(`${id}/`, authConfig());

// ================= Consultas Matrona =================
const consultasApi = axios.create({ baseURL: API_BASE_URL + 'consultas/' });

export const getConsultas = () => consultasApi.get('', authConfig());
export const getConsulta = (id) => consultasApi.get(`${id}/`, authConfig());
export const createConsulta = (consulta) => consultasApi.post('', consulta, authConfig());
export const updateConsulta = (id, consulta) => consultasApi.put(`${id}/`, consulta, authConfig());
export const deleteConsulta = (id) => consultasApi.delete(`${id}/`, authConfig());

// ================= Partos =================
const partosApi = axios.create({ baseURL: API_BASE_URL + 'partos/' });

export const getPartos = () => partosApi.get('', authConfig());
export const getParto = (id) => partosApi.get(`${id}/`, authConfig());
export const createParto = (parto) => partosApi.post('', parto, authConfig());
export const updateParto = (id, parto) => partosApi.put(`${id}/`, parto, authConfig());
export const deleteParto = (id) => partosApi.delete(`${id}/`, authConfig());

// ================= Feedback Jefe =================
const feedbackApi = axios.create({ baseURL: API_BASE_URL + 'feedback/' });

export const getFeedbacks = () => feedbackApi.get('', authConfig());
export const getFeedback = (id) => feedbackApi.get(`${id}/`, authConfig());
export const createFeedback = (feedback) => feedbackApi.post('', feedback, authConfig());
export const updateFeedback = (id, feedback) => feedbackApi.put(`${id}/`, feedback, authConfig());
export const deleteFeedback = (id) => feedbackApi.delete(`${id}/`, authConfig());
