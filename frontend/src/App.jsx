import { BrowserRouter as Router, Routes, Route } from "react-router-dom";/* #npm install react-router-dom */
import LandingPage from "./pages/Landing";
import RegistroVitalForm from "./components/RegistroVitalForm";
import ConsultaMatronaForm from "./components/ConsultaMatronaForm";
import PartoForm from "./components/PartoForm";
import FeedbackForm from "./components/FeedbackForm";
import PersonalForm from "./components/PersonalClinicoForm";
import MadresForm from "./components/MadreForm";
import MadreDetails from "./layouts/MadreDetails";

import { Toaster } from "react-hot-toast"; /* #npm install react-hot-toast */
import Header from "./pages/Header";

function App() {
  return (
    <Router>
      <Header />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Formularios */}


        <Route path="/personal" element={<PersonalForm />} />

        <Route path="/madres" element={<MadresForm />} />
        <Route path="/madres/:id" element={<MadreDetails />} />
        
        <Route path="/vitales" element={<RegistroVitalForm />} />

        <Route path="/consultas" element={<ConsultaMatronaForm />} />

        <Route path="/partos" element={<PartoForm />} />

        <Route path="/feedback" element={<FeedbackForm />} />

      </Routes>
    </Router>
  );
}

export default App;

