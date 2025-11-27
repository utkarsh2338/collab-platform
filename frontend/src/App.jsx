import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import { SocketProvider } from "./context/SocketContext";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectBoard from "./pages/ProjectBoard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPasswordSent from "./pages/ForgotPasswordSent";
import OAuthSuccess from "./pages/OAuthSuccess";

// NEW pages
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <ProjectProvider>
            <Routes>
              {/* Public */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/forgot-password/sent" element={<ForgotPasswordSent />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/oauth-success" element={<OAuthSuccess />} />

              {/* Projects */}
              <Route
                path="/projects"
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />

              {/* Settings */}
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />

              {/* Protected */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/project/:projectId"
                element={
                  <ProtectedRoute>
                    <ProjectBoard />
                  </ProtectedRoute>
                }
              />

              {/* Default */}
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>

            <ToastContainer />
          </ProjectProvider>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
