import axios from "axios";

const auteursEndpoint = "http://localhost:8080/api/v1/auteurs";

// Fonction pour configurer le header avec le token
const getAuthHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});
// Récupérer tous les auteurs
export const getAllAuteurs = async (token) => {
    try {
        const response = await axios.get(`${auteursEndpoint}`,getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des auteurs :", error);
        throw error;
    }
};

// Récupérer un auteur par ID
export const getAuteurById = async (id,token) => {
    try {
        const response = await axios.get(`${auteursEndpoint}/${id}`,getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'auteur par ID :", error);
        throw error;
    }
};

export const countAuteur = async ( token) => {
    try {
        const response = await axios.get(`${auteursEndpoint}/count`, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'auteurs  :", error);
        throw error;
    }
};

// Mettre à jour un auteur
export const updateAuteur = async (id, auteurData,token) => {
    try {
        const response = await axios.put(`${auteursEndpoint}/${id}`, auteurData,getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'auteur :", error);
        throw error;
    }
};

// Supprimer un auteur par ID
export const deleteAuteurById = async (id,token) => {
    try {
        await axios.delete(`${auteursEndpoint}/${id}`,getAuthHeaders(token));
    } catch (error) {
        console.error("Erreur lors de la suppression de l'auteur :", error);
        throw error;
    }
};
