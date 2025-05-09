import React, { createContext, useState, useEffect, useCallback } from "react";
import { connecter, getCompteByUsername } from "./InscriptionService";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { match } from "path-to-regexp";
// Créer le contexte
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [authData, setAuthData] = useState(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRoles = localStorage.getItem("authRoles");


    let roles = [];
    if (storedRoles) {
      try {
        roles = JSON.parse(storedRoles); // Assurez-vous que les rôles sont correctement parsés
      } catch (error) {
        console.warn("Rôles mal formés dans localStorage. Réinitialisation.");
        roles = []; // Valeur par défaut si invalide
      }
    }


    if (!storedToken) return null;

    return {
      token: storedToken,
      username: localStorage.getItem("authUsername"),
      password: localStorage.getItem("authPassword"),
      id: localStorage.getItem("authId"),
      nom: localStorage.getItem("authNom"),
      prenom: localStorage.getItem("authPrenom"),
      sexe: localStorage.getItem("authSexe"),

      roles,

    };
  });

  // Fonction pour mettre à jour le localStorage
  const updateLocalStorage = (data) => {
    localStorage.setItem("authToken", data.token);
    localStorage.setItem("authUsername", data.username);
    localStorage.setItem("authPassword", data.password);
    localStorage.setItem("authId", data.id);
    localStorage.setItem("authNom", data.nom);
    localStorage.setItem("authPrenom", data.prenom);
    localStorage.setItem("authSexe", data.sexe);
    localStorage.setItem("authRoles", JSON.stringify(data.roles));
  };

  // Fonction de connexion
  const login = async (username, password) => {
    try {
      const user={username,password};
      const tokenn = await connecter(username,password);
      const token=tokenn.token;
      console.log("Token brut reçu :", tokenn);

      if (!token) throw new Error("Token manquant ou invalide.");

      // Vérification du token
      try {
        const decodedToken = jwtDecode(token);
        console.log("Token décodé :", decodedToken);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          throw new Error("Le token est déjà expiré.");

        }
      } catch (error) {
        console.error("Erreur de décodage du token :", error.message);
        throw new Error("Le token reçu est invalide.");
      }

      const compte = await getCompteByUsername(username); // Récupération des infos utilisateur
      if (!compte) {
        throw new Error("Les informations utilisateur sont incorrectes.");
      }

      // Extraire les données utilisateur
      const { id, nom, prenom, sexe, } = compte;
      const roles = (compte.roles || []).map((role) => role.name?.toUpperCase());

      // Créer la charge utile d'authentification
      const authPayload = {
        token,
        username,
        id,
        nom,
        prenom,
        sexe,
        roles,
      };

      // Sauvegarder les données
      setAuthData(authPayload);
      updateLocalStorage(authPayload);
      return authPayload;
      //console.log("Connexion réussie :", authPayload);
    } catch (error) {
      console.error("Erreur pendant la connexion :", error.message);
      alert(error.message || "Connexion échouée. Veuillez vérifier vos informations.");
    }
  };

  // Fonction de déconnexion
  const logout = useCallback(() => {
    setAuthData(null);
    const profileImage = localStorage.getItem('profileImage');
    localStorage.clear();
    navigate("/auth/login");
  }, [navigate]);

  // Vérification périodique de l'expiration du token
  useEffect(() => {
    const checkTokenExpiration = () => {
      if (!authData || !authData.token) return;

      try {
        const decodedToken = jwtDecode(authData.token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          console.warn("Token expiré. Déconnexion automatique.");
          logout();
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token :", error.message);
        logout();
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Vérifie toutes les 60 secondes

    return () => clearInterval(interval);
  }, [authData, logout]);

  // Déconnexion après inactivité
  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        console.warn("Aucune activité détectée. Déconnexion automatique.");
        logout();
      }, 3600000); // Déconnexion après 10 minutes d'inactivité
    };

    const handleActivity = () => {
      resetTimer();
    };

    window.addEventListener("click", handleActivity);
    window.addEventListener("keypress", handleActivity);
    window.addEventListener("mousemove", handleActivity);

    resetTimer(); // Initialise le premier timer

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      window.removeEventListener("mousemove", handleActivity);
    };
  }, [logout]);

  useEffect(() => {
    // Liste des routes publiques (y compris les routes dynamiques)
    const publicPaths = [
      "/auth/login",
      "/auth/register",
      "/",

    ];

    // Vérifie si la route actuelle est une route publique
    const isPublicPath = publicPaths.some((path) => {
      const isMatch = match(path, { decode: decodeURIComponent });
      return isMatch(location.pathname);
    });

    if (isPublicPath) {
      return; // Ne pas vérifier l'authentification sur les routes publiques
    }
    if (!authData || !authData.token) {
      console.warn("Aucune authentification ou token trouvé.");
      navigate("/auth/login");
      return;
    }

    try {
      const decodedToken = jwtDecode(authData.token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        console.warn("Token expiré. Déconnexion automatique.");
        logout();
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token :", error.message);
      logout(); // Déconnexion si le token est invalide
    }
  }, [authData, navigate, logout, location.pathname]);




  return (
      <AuthContext.Provider
          value={{
            authData,
            setAuthData,
            login,
            logout,

          }}
      >
        {children}
      </AuthContext.Provider>
  );
};
