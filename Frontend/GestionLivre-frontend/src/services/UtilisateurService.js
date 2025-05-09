import axios from "axios";

const authentification = "http://localhost:8080/api/v1/utilisateurs";





// Récupérer tous les utilisateurs (avec le paramètre actif en option)
export const getAllUtilisateurs = async (actif) => {
    try {
        const url = actif !== undefined ? `${authentification}?actif=${actif}` : authentification;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
        throw error;
    }
};

// Récupérer un utilisateur par ID
export const getUserById = async (id) => {
    try {
        const response = await axios.get(`${authentification}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur par ID :", error);
        throw error;
    }
};
export const countUsers = async ( ) => {
    try {
        const response = await axios.get(`${authentification}/count`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre d'utilisateurs  :", error);
        throw error;
    }
};

// Mettre à jour un utilisateur
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`${authentification}/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
        throw error;
    }
};

// Supprimer un utilisateur par ID
export const deleteUserById = async (id) => {
    try {
        await axios.delete(`${authentification}/${id}`);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur par ID :", error);
        throw error;
    }
};

// Supprimer un utilisateur par objet
export const deleteUser = async (userData) => {
    try {
        await axios.delete(`${authentification}`, { data: userData });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        throw error;
    }
};
