import axios from "axios";

const livresEndpoint = "http://localhost:8080/api/v1/livres";

// Fonction pour configurer le header avec le token
const getAuthHeaders = (token) => ({
    headers: { Authorization: `Bearer ${token}` }
});

// Créer un livre
export const createLivre = async (livreData, token) => {
    try {
        const response = await axios.post(`${livresEndpoint}`, livreData, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création du livre :", error);
        throw error;
    }
};

// Récupérer tous les livres
export const getAllLivres = async (token) => {
    try {
        const response = await axios.get(`${livresEndpoint}`, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
        throw error;
    }
};

// Récupérer tous les livres d'un auteur
export const getAllLivresByAuteur = async (id, token) => {
    try {
        const response = await axios.get(`${livresEndpoint}/auteur/${id}`, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des livres par auteur :", error);
        throw error;
    }
};

// Récupérer un livre par ID
export const getLivreById = async (id, token) => {
    try {
        const response = await axios.get(`${livresEndpoint}/${id}`, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du livre par ID :", error);
        throw error;
    }
};
export const countLivre = async ( token) => {
    try {
        const response = await axios.get(`${livresEndpoint}/count`, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération du nombre de livre  :", error);
        throw error;
    }
};

// Mettre à jour un livre
export const updateLivre = async (id, livreData, token) => {
    try {
        const response = await axios.put(`${livresEndpoint}/${id}`, livreData, getAuthHeaders(token));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour du livre :", error);
        throw error;
    }
};


// Supprimer un livre par ID
export const deleteLivreById = async (id, token) => {
    try {
        await axios.delete(`${livresEndpoint}/${id}`, getAuthHeaders(token));
    } catch (error) {
        console.error("Erreur lors de la suppression du livre :", error);
        throw error;
    }
};

// Supprimer un livre par objet
export const deleteLivre = async (livreData, token) => {
    try {
        await axios.delete(`${livresEndpoint}`, { ...getAuthHeaders(token), data: livreData });
    } catch (error) {
        console.error("Erreur lors de la suppression du livre :", error);
        throw error;
    }
};


// Envoi d'un fichier
export const fileUploads = async (file,token) => {

    // Validation du fichier : taille minimale et maximale
    if (!file || file.size === 0) throw new Error("Aucun fichier sélectionné ou le fichier est vide.");
    if (file.size > 25 * 1024 * 1024) throw new Error("Le fichier est trop volumineux. Maximum 25 Mo autorisé.");

    const formData = new FormData();
    formData.append("file", file); // Assurez-vous que le champ correspond à ce que le backend attend

    // Affiche le contenu du FormData
    for (let [key, value] of formData.entries()) {
        console.log(`Clé : ${key}, Valeur :`, value);
    }
    try {
        const response = await axios.post(`${livresEndpoint}/upload`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data", // Géré automatiquement par Axios mais on peut l'ajouter explicitement
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Réponse du serveur :", response.data);

        // Retour structuré
        return {
            status: "success",
            message: response.data,
        };
    } catch (error) {
        console.error("Erreur lors de l'envoi du fichier :", error.response?.data || error.message);

        // Relance l'erreur pour gestion en amont
        throw new Error(
            error.response?.data || error.message || "Erreur lors de l'envoi du fichier."
        );
    }
};

export const getFile = async (fileName,  token) => {
    try {


        const response = await axios.get(`${livresEndpoint}/file/${fileName}`, {
            responseType: "blob",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(`Téléchargement du fichier : ${response.data}`);
        if (!response.data || response.data.size === 0) {
            throw new Error("Le fichier est vide ou introuvable.");
        }

        // Convertir le blob en une URL utilisable
        const blobUrl = URL.createObjectURL(response.data);
        console.log("Blob URL créée :", blobUrl);
        return blobUrl;
    } catch (error) {
        console.error("Erreur lors du téléchargement du fichier :", error);
        throw new Error(
            error.response?.data || "Erreur lors du téléchargement du fichier."
        );
    }
};
