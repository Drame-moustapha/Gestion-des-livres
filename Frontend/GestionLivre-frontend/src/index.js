import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "react-notification-alert/dist/animate.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "select2/dist/css/select2.min.css";
import "quill/dist/quill.core.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/scss/argon-dashboard-pro-react.scss?v1.2.1";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import IndexView from "views/Index.js";
import { AuthProvider } from "./services/AuthContext";
import Register from "./views/pages/AUTHENTIFICATION/Register";
import ProtectedRoute from "./services/ProtectedRoute";
import Login from "./views/pages/AUTHENTIFICATION/Login";
import LivresLecteur from "./views/pages/LIVRE/LivresLecteur";


function Index() {
  // Ajouter la balise <meta> pour interdire la traduction Google
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "google";
    meta.content = "notranslate";
    document.head.appendChild(meta);

    // Empêcher la traduction pour tout le corps de l'application
    document.body.setAttribute("translate", "no");
  }, []);

  return (
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/admin/*" element={<AdminLayout />} />
              <Route path="/admin/livres" element={<LivresLecteur />} />
            <Route path="/auth/*" element={<AuthLayout />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            <Route path="/" element={<IndexView />} />
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
  );
}

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
      <Index />
    </React.StrictMode>
);
