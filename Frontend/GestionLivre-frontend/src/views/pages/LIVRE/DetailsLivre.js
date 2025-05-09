import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, Navbar, CardBody, Row, Col, Spinner } from "reactstrap";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import '@react-pdf-viewer/attachment/lib/styles/index.css';

import { getFile, getLivreById } from "services/LivreService";
import { getAuteurById } from "services/AuteurService";
import { AuthContext } from "services/AuthContext";

const DetailsLivre = () => {
    const { id } = useParams();
    const { authData } = useContext(AuthContext);
    const token = authData.token;

    const [selectedLivre, setSelectedLivre] = useState(null);
    const [selectedFileUrl, setSelectedFileUrl] = useState(null);
    const [selectedAuteur, setSelectedAuteur] = useState(null);
    const [loading, setLoading] = useState(true);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    /**
     * Fonction pour charger les informations du livre
     */
    const fetchLivreData = async () => {
        try {
            setLoading(true);

            const livre = await getLivreById(id, token);
            setSelectedLivre(livre);

            if (livre.fichier) {
                const fileUrl = await getFile(livre.fichier, token);
                console.log("URL du fichier :", fileUrl);

                // Nettoyage de l'ancienne URL Blob
                if (selectedFileUrl) {
                    URL.revokeObjectURL(selectedFileUrl);
                }

                setSelectedFileUrl(fileUrl);
            }

            if (livre.auteur && livre.auteur.id) {
                const auteur = await getAuteurById(livre.auteur.id, token);
                setSelectedAuteur(auteur);
            }

        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Effet pour charger les données du livre et gérer le nettoyage
     */
    useEffect(() => {
        fetchLivreData();

        // Cleanup pour révoquer l'URL Blob
        return () => {
            if (selectedFileUrl) {
                URL.revokeObjectURL(selectedFileUrl);
            }
        };
    }, [id, token]); // Recharger uniquement lorsque `id` ou `token` change

    return (
        <div className="container-fluid min-vh-80">
            <Navbar />

            <Card className="mt-4 border rounded-2 table-responsive">
                <CardHeader>
                    <Row className=" d-flex justify-content-center align-items-center my-4 h2  text-blue">AUTEUR DU LIVRE</Row>
                    {selectedAuteur ? (
                        <Row>
                            <Col>Nom : {selectedAuteur.nom}</Col>
                            <Col>Prénom : {selectedAuteur.prenom}</Col>
                            <Col>Sexe : {selectedAuteur.sexe}</Col>
                            <Col>Biographie : {selectedAuteur.biographie}</Col>
                        </Row>
                    ) : (
                        <Spinner color="primary" />
                    )}
                </CardHeader>

                <CardBody>
                    <Row>
                        <Col md={4}>
                            <h5>Informations du Livre</h5>
                            {selectedLivre ? (
                                <>
                                    <p><strong>Titre :</strong> {selectedLivre.titre}</p>
                                    <p><strong>Prix :</strong> {selectedLivre.prix} €</p>
                                    <p><strong>Langue :</strong> {selectedLivre.langue}</p>
                                    <p><strong>Fichier :</strong> {selectedLivre.fichier}</p>
                                    <p><strong>Résumé :</strong> {selectedLivre.resume}</p>
                                </>
                            ) : (
                                <Spinner color="primary" />
                            )}
                        </Col>
                    <Col>
                    <h4>Prévisualisation du fichier</h4>
                    <div
                        style={{
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            padding: "10px",
                            height: "500px",
                            overflow: "auto",
                        }}
                    >
                        {loading ? (
                                <Spinner color="primary" />
                            ) : selectedFileUrl ? (
                            <Worker   workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                <Viewer fileUrl={selectedFileUrl} plugins={[defaultLayoutPluginInstance]} />
                            </Worker>
                        ) : (
                            <p>Aucun fichier disponible</p>
                        )}
                    </div>
                    </Col>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default DetailsLivre;
