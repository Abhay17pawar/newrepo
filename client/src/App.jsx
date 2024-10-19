import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Home/Homepage"
import AuthDemo from "./Auth/AuthLogic";
import NearestNurse from "./NurseId/NurseId";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/auth" element={<AuthDemo />} />
      <Route path="/Home" element={<Homepage />} />
      <Route path="/NearNurse" element={<NearestNurse />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App;
