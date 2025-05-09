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
import axios from "axios";
import {updateUser,getAllUtilisateurs,deleteUserById} from "services/UtilisateurService";
import {createUser} from "services/InscriptionService";

const { SearchBar } = Search || {};

const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  sizePerPage: 10,
});

function Lecteur() {
  const [lecteurs, setLecteurs] = useState([]);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState());
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLecteur, setSelectedLecteur] = useState(null);
  const { authData } = useContext(AuthContext);
  const token = authData?.token;

  useEffect(() => {
    fetchLecteurs();
  }, []);

  function initialFormState() {
    return {
      id: null,
      nom: "",
      prenom: "",
      username: "",
      sexe: "Homme",
      password: "",
      actif: true,
    };
  }
  const fetchLecteurs = async () => {
    try {
      const res = await getAllUtilisateurs(true);
      console.info("Lecteurs du chargement des utilisateurs ::", res);

      const lecteurs = Array.isArray(res)
          ? res.filter(utilisateur =>
              utilisateur.roles.some(role => role.name === "USER")
          )
          : [];
      setLecteurs(lecteurs);

    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs :", err);
    }
  };


  const handleAdd = () => {
    setIsEditing(false);
    setFormData(initialFormState());
    setModal(true);
  };

  const handleEdit = (lecteur) => {
    setIsEditing(true);
    setFormData(lecteur);
    setSelectedLecteur(lecteur);
    setModal(true);
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await updateUser(formData.id, formData);
      } else {
        await createUser(formData);
      }
      setModal(false);
      fetchLecteurs();
    } catch (err) {
      console.error("Erreur d'enregistrement :", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce lecteur ?")) {
      try {
        await deleteUserById(id);
        fetchLecteurs();
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
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
          <>
            <a size="sm" className="mr-2 text-info" onClick={() => handleEdit(row)}><i className="fas fa-edit" /></a>
            <a size="sm" className="mr-2 text-danger" onClick={() => handleDelete(row.id)}><i className="fas fa-trash" /></a>
          </>
      ),
    },
  ];

  return (
      <Container className="mt-5" fluid>
        <Card>
          <ToolkitProvider keyField="id" data={lecteurs} columns={columns} search>
            {(props) => (
                <div className="py-4 table-responsive">
                  <Row className="align-items-center">
                    <Col xl="6">
                      <Button color="primary" onClick={handleAdd}>Ajouter un lecteur</Button>
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
      </Container>
  );
}

export default Lecteur;
