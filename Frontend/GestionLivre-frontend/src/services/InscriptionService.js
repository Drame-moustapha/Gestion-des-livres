
import axios from "axios";


const authentification = "http://localhost:8080/api/v1";


export const createUser = async (compteData) => {
    try {
        const response = await axios.post(`${authentification}/utilisateurs`, compteData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erreur lors de la création de l'utilisateur");
    }
};

export const createAuteur = async (compteData) => {
    try {
        const response = await axios.post(`${authentification}/utilisateurs/auteur`, compteData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erreur lors de la création de l'utilisateur");
    }
};


// Service to fetch compte by username
export const getCompteByUsername = async (username) => {
    try {
      const response = await axios.get(`${authentification}/utilisateurs/username/${username}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching account data:", error);
      throw error;
    }
  };



// Fonction pour se connecter
export const connecter = async (user,pass) => {
    try {
        const response = await axios.post(`${authentification}/login?username=${user}&password=${pass}`);

        return response.data;
    } catch (error) {
        throw new Error(error.message || "Erreur lors de la connexion");
    }
};