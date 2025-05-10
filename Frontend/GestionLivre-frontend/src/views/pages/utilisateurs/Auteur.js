import React, { useEffect, useState, useContext } from "react";
import {
    Button,
    Container,
    FormGroup,
    Form,
    Row,
    Col,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Card,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import { AuthContext } from "services/AuthContext";
import "assets/css/monstyle.css";
import { updateAuteur, getAllAuteurs, deleteAuteurById } from "services/AuteurService";
import { createAuteur } from "services/InscriptionService";

const { SearchBar } = Search || {};

const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: true,
    showTotal: true,
    sizePerPage: 10,
});

function Auteur() {
    const [auteurs, setAuteurs] = useState([]);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState(initialFormState());
    const [isEditing, setIsEditing] = useState(false);
    const { authData } = useContext(AuthContext);
    const token = authData?.token;

    useEffect(() => {
        fetchAuteurs();
    }, []);

    function initialFormState() {
        return {
            id: null,
            nom: "",
            prenom: "",
            username: "",
            sexe: "HOMME",
            password: "",
            actif: true,
            biographie: "",
        };
    }

    const fetchAuteurs = async () => {
        try {
            const res = await getAllAuteurs(token);
            setAuteurs(Array.isArray(res) ? res : []);
        } catch (err) {
            console.error("Erreur lors du chargement des auteurs :", err);
        }
    };

    const handleAdd = () => {
        setIsEditing(false);
        setFormData(initialFormState());
        setModal(true);
    };

    const handleEdit = (auteur) => {
        setIsEditing(true);
        setFormData(auteur);
        setModal(true);
    };
    const handleSave = async () => {
        try {
            if (isEditing) {
                await updateAuteur(formData.id, formData, token);
            } else {
                await createAuteur(formData);
            }
            setModal(false);
            fetchAuteurs();
        } catch (err) {
            console.error("Erreur d'enregistrement :", err.response?.data || err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet auteur ?")) {
            try {
                await deleteAuteurById(id, token);
                fetchAuteurs();
            } catch (err) {
                console.error("Erreur de suppression :", err);
            }
        }
    };

    const columns = [
        { dataField: "id", text: "#", formatter: (cell, row, rowIndex) => rowIndex + 1 },
        { dataField: "nom", text: "Nom", sort: true },
        { dataField: "prenom", text: "Prénom", sort: true },
        { dataField: "username", text: "Nom d'utilisateur", sort: true },
        { dataField: "sexe", text: "Sexe" },
        {
            dataField: "actif",
            text: "Actif",
            formatter: (cell) => (cell ? "Oui" : "Non"),
        },
        { dataField: "biographie", text: "Biographie" ,
            style: {
                width: '250px',
                whiteSpace: 'normal',    // autorise le retour à la ligne
                wordWrap: 'break-word'   // coupe les mots longs
            } },
        {
            dataField: "actions",
            text: "Actions",
            formatter: (cell, row) => (
                <>
                    <a className="mr-2 text-info" onClick={() => handleEdit(row)}><i className="fas fa-edit" /></a>
                    <a className="text-danger" onClick={() => handleDelete(row.id)}><i className="fas fa-trash" /></a>
                </>
            ),
        },
    ];

    return (
        <Container className="mt-5" fluid>
            <Card>
                <ToolkitProvider keyField="id" data={auteurs} columns={columns} search>
                    {(props) => (
                        <div className="py-4 table-responsive">
                            <Row className="align-items-center">
                                <Col xl="6">
                                    <Button className="colordark" onClick={handleAdd}>Ajouter un auteur</Button>
                                </Col>
                                <Col xl="6" className="text-right">
                                    {SearchBar ? (
                                        <SearchBar className="form-control-sm" {...props.searchProps} placeholder="Rechercher..." />
                                    ) : (
                                        <div>Recherche non disponible</div>
                                    )}
                                </Col>
                            </Row>
                            <BootstrapTable
                                {...props.baseProps}
                                bootstrap4
                                pagination={pagination}
                                bordered={false}
                            />
                        </div>
                    )}
                </ToolkitProvider>
            </Card>

            {/* Modal pour ajout / modification */}
            <Modal isOpen={modal} toggle={() => setModal(!modal)} className="modal-lg">
                <ModalHeader className="colordark text-white" toggle={() => setModal(!modal)}>
                    {isEditing ? "Modifier Auteur" : "Ajouter Auteur"}
                </ModalHeader>
                <ModalBody>
                    <Form>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Prénom</Label>
                                    <Input
                                        type="text"
                                        value={formData.prenom}
                                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Nom</Label>
                                    <Input
                                        type="text"
                                        value={formData.nom}
                                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Sexe</Label>
                                    <Input
                                        type="select"
                                        value={formData.sexe}
                                        onChange={(e) => setFormData({ ...formData, sexe: e.target.value })}
                                    >
                                        <option value="">-- Sélectionnez --</option>
                                        <option value="HOMME">HOMME</option>
                                        <option value="FEMME">FEMME</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            {!isEditing && (
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Nom d'utilisateur</Label>
                                        <Input
                                            type="email"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                            )}
                        </Row>
                        {!isEditing && (
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label>Mot de passe</Label>
                                        <Input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        )}

                        <FormGroup>
                            <Label>Biographie</Label>
                            <Input
                                type="textarea"
                                value={formData.biographie}
                                onChange={(e) => setFormData({ ...formData, biographie: e.target.value })}
                            />

                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>
                        {isEditing ? "Sauvegarder" : "Ajouter"}
                    </Button>
                    <Button color="secondary" onClick={() => setModal(false)}>Annuler</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}

export default Auteur;
