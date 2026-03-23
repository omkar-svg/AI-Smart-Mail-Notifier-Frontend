import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

import LandingPage from "./Pages/LandingPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import ViewEmail from "./Pages/viewemail"
import AllEmails from "./Pages/AllEmails";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/viewemail/:id" element={<ProtectedRoute><ViewEmail /></ProtectedRoute>} /> 
          <Route path="/allemails" element={<ProtectedRoute><AllEmails /></ProtectedRoute>} />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;