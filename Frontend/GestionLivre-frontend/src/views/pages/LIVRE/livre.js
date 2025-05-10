import React, {useEffect, useState, useContext, useMemo} from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import {
  Button, Container, FormGroup, Form, Row, Col, Modal, ModalHeader,
  ModalBody, ModalFooter, Input, Label, Card
} from "reactstrap";
import {AuthContext} from "../../../services/AuthContext";
import "assets/css/monstyle.css";
import {getAllLivres,getAllLivresByAuteur,getLivreById,updateLivre,createLivre,fileUploads,deleteLivreById} from "services/LivreService";
import {getAllAuteurs,getAuteurById} from "services/AuteurService";
import {useNavigate} from "react-router-dom";
const pagination = paginationFactory({
  page: 1,
  alwaysShowAllBtns: true,
  showTotal: true,
  withFirstAndLast: false,
  sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
    <div className="dataTables_length" id="datatable-basic_length">
      <label>
        Afficher{" "}
        <select
          name="datatable-basic_length"
          aria-controls="datatable-basic"
          className="form-control form-control-sm"
          onChange={(e) => onSizePerPageChange(e.target.value)}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>{" "}
        entrées.
      </label>
    </div>
  ),
});

const { SearchBar } = Search;

function Livre() {
  const { authData } = useContext(AuthContext);
  const [livres, setLivres] = useState([]);

  const [modal, setModal] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState({});
 const [isEditing, setIsEditing] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [livreToDelete, setLivreToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [auteurs, setAuteurs] = useState([]);

  const token = authData.token;
  const role=authData.roles?.[0];
  const isAdmin = role === "ADMIN";
  const [formData, setFormData] = useState({ id: null, titre: "", prix: "", langue: "", resume: "",fichier: "", auteur: { id: isAdmin ? "" : authData?.id } });
    const navigate=useNavigate();
  const id=authData.id;

    useEffect(() => {
        fetchLivres();
        fetchAuteurs();
    }, [id, isAdmin, token]);

    const fetchLivres = async () => {
        try {
            const res = isAdmin ? await getAllLivres(token) : await getAllLivresByAuteur(id, token);
            setLivres(res);
        } catch (error) {
            console.error("Erreur lors de la récupération des livres :", error);
            setLivres([]);
        }
    };


  const fetchAuteurs = async () => {
    try {
      const res = await getAllAuteurs(token);
      setAuteurs(res);

    } catch (error) {
      console.error("Erreur chargement auteurs :", error);
    }
  };

    const filteredLivres = useMemo(() => {
        if (!searchTerm) return livres;
        return livres.filter(livre =>
            livre.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            livre.langue?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, livres]);




    const handleAdd = () => {
    setFormData({ id: null, titre: "", prix: "", langue: "",resume: "",fichier: "", auteur: { id: isAdmin ? "" : authData.id } });

    setIsEditing(false);
    setModal(true);
  };
    const handleFileChange = (event) => {
        if (!event || !event.target || !event.target.files) return;

        const file = event.target.files[0];
        if (!file) return;
        // Enregistrer uniquement le nom du fichier dans formData
        setFormData({ ...formData, fichier: file.name });
        // Enregistrer le fichier réel dans uploadedFiles
        setUploadedFiles({ ...uploadedFiles, fichier: file });
    };


    const handleSave = async () => {
    try {
      if (isEditing) {
        await updateLivre(formData.id, formData, token);
      } else {
          console.info("le fichier téléchargé :: ",uploadedFiles.fichier);
          await fileUploads(uploadedFiles.fichier,token);
        await createLivre(formData, token);
      }
      fetchLivres();
      setModal(false);
    } catch (error) {
      console.error("Erreur de sauvegarde :", error);
    }
  };

  const handleEdit = (livre) => {
    setFormData({
      ...livre,
      auteur: livre.auteur || { id: "" },
    });
    setIsEditing(true);
    setModal(true);
  };

  const handleDelete = (livre) => {
    setLivreToDelete(livre);
    setConfirmDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteLivreById(livreToDelete.id, token);
      fetchLivres();
      setConfirmDeleteModal(false);
    } catch (error) {
      console.error("Erreur suppression :", error);
    }
  };
    const handleView = (livre) => {
        navigate(`/admin/detailsLivre/${livre.id}`);
    };

  const actionFormatter = (cell, row) => (
      <div>
          <a size="sm" className="mr-2 text-blue" onClick={() => handleView(row)}><i className="fas fa-eye"/></a>
          <a size="sm" className="mr-2 text-info" onClick={() => handleEdit(row)}><i className="fas fa-edit"/></a>
          <a size="sm" className="mr-2 text-danger" onClick={() => handleDelete(row)}><i className="fas fa-trash"/></a>
      </div>
  );

    const columns = [
        {
            dataField: "rowIndex", // Champ pour le numéro de ligne
            text: "#",
      sort: true,
      formatter: (cell, row, rowIndex) => rowIndex + 1},
    { dataField: "titre", text: "Titre", sort: true },
    { dataField: "prix", text: "Prix", sort: true },
    { dataField: "langue", text: "Langue", sort: true },
        { dataField: "resume", text: "Résumé", sort: true },
        { dataField: "fichier", text: "Fichier", sort: true },
    {
      dataField: "auteur.id",
      text: "Auteur",
      formatter: (cell, row) => row.auteur?.id || row.auteur || "",
    },
    {
      dataField: "actions",
      text: "Actions",
      formatter: actionFormatter,
    },
  ];

  return (
    <Container className="mt-4" fluid>
      <Card>
        <ToolkitProvider
          data={filteredLivres}
          keyField="id"
          columns={columns}
          search
        >
          {(props) => (
            <div className="py-4 table-responsive">
              <Row className="align-items-center">
                <Col className="col-xl-6">
                  <Button className="colordark text-white" onClick={handleAdd}>Ajouter un livre</Button>
                </Col>
                <Col className="col-xl-6 text-right">
                  <label>
                    Recherche :{" "}
                    <SearchBar className="form-control-sm" placeholder="Rechercher..." {...props.searchProps} />
                  </label>
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

      <Modal isOpen={modal} toggle={() => setModal(!modal)} className="modal-lg">
        <ModalHeader  className="colordark text-white " toggle={() => setModal(!modal)}>
          {isEditing ? "Modifier Livre" : "Ajouter Livre"}
        </ModalHeader>
        <ModalBody>
            <Form>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Titre</Label>
                            <Input type="text" value={formData.titre}
                                   onChange={(e) => setFormData({...formData, titre: e.target.value})}/>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label>Prix</Label>
                            <Input type="number" step="0.01" value={formData.prix}
                                   onChange={(e) => setFormData({...formData, prix: parseFloat(e.target.value)})}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Résumé</Label>
                            <Input type="textarea" value={formData.resume}
                                   onChange={(e) => setFormData({...formData, resume: e.target.value})}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Langue</Label>
                            <Input type="text" value={formData.langue}
                                   onChange={(e) => setFormData({...formData, langue: e.target.value})}/>
                        </FormGroup>
                    </Col>

                </Row>

                <Row>
                    {!isEditing &&(
                        <Col md={6}>
                            <FormGroup>
                                <Label>Fichier pdf</Label>
                                <Input type="file" accept="application/pdf"
                                       onChange={(e) => handleFileChange(e)}/>
                            </FormGroup>
                        </Col>
                    )}
                    {!isEditing && (
                    <Col md={6}>

                        {authData.role !== "ADMIN" && (
                            <FormGroup>
                                <Label>Auteur</Label>
                                <Input type="select" value={formData.auteur.id}
                                       onChange={(e) => setFormData({...formData, auteur: {id: e.target.value}})}>
                                    <option value="">Sélectionner un auteur</option>
                                    {auteurs.map((a) => (
                                        <option key={a.id} value={a.id}>{a.nom}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        )}

                    </Col>
                    )}
                </Row>
            </Form>
        </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={handleSave}>{isEditing ? "Sauvegarder" : "Ajouter"}</Button>
              <Button color="secondary" onClick={() => setModal(false)}>Annuler</Button>
          </ModalFooter>
      </Modal>

        <Modal isOpen={confirmDeleteModal} toggle={() => setConfirmDeleteModal(!confirmDeleteModal)}>
        <ModalHeader toggle={() => setConfirmDeleteModal(!confirmDeleteModal)}>Confirmation</ModalHeader>
        <ModalBody>Voulez-vous vraiment supprimer ce livre ?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>Supprimer</Button>
          <Button color="secondary" onClick={() => setConfirmDeleteModal(false)}>Annuler</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
}

export default Livre;
