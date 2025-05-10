import React, { useEffect, useState, useContext } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";
import {
    Button, Container, FormGroup, Form, Row, Col, Modal, ModalHeader,
    ModalBody, ModalFooter, Input, Label, Card
} from "reactstrap";
import {AuthContext} from "../../../services/AuthContext";
import "assets/css/monstyle.css";
import {getAllLivres,getAllLivresByAuteur,getLivreById,updateLivre,createLivre,deleteLivre,deleteLivreById} from "services/LivreService";
import {getAllAuteurs,getAuteurById} from "services/AuteurService";
import AdminNavbar from "../../../components/Navbars/AdminNavbar";
import AdminFooter from "../../../components/Footers/AdminFooter";
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

function LivresLecteur() {
    const { authData } = useContext(AuthContext);
    const [livres, setLivres] = useState([]);
    const [filteredLivres, setFilteredLivres] = useState([]);
    const [modal, setModal] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
    const [livreToDelete, setLivreToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [auteurs, setAuteurs] = useState([]);

    const token = authData.token;
    const role=authData.roles?.[0];
    const isAdmin = role === "ADMIN";
    const [formData, setFormData] = useState({ id: null, titre: "", prix: "", langue: "", auteur: { id: isAdmin ? "" : authData?.id } });
    const navigate=useNavigate();
    const id=authData.id;

    useEffect(() => {
        fetchLivres();

    }, []);




    const fetchLivres = async () => {
        try {

                const res = await getAllLivres(token);

                setLivres(res);

        } catch (error) {
            console.error("Erreur lors de la récupération des livres :", error);
            setLivres([]);
        }
    };



    useEffect(() => {
        console.log("Livres avant filtre:", livres);

        if (livres.length === 0) {
            console.log("Aucun livre disponible.");
            setFilteredLivres([]);
            return;
        }

        const filtered = livres.filter((livre) => {
            const match = livre.titre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                livre.langue?.toLowerCase().includes(searchTerm.toLowerCase());
            console.log("Livre filtré:", livre, "Match:", match);
            return match;
        });

        setFilteredLivres(filtered);
        console.log("Livres filtrés:", filtered);
    }, [searchTerm, livres]);

    const handleView = (livre) => {
     navigate(`/admin/detailsLivre/${livre.id}`)
    };


    const actionFormatter = (cell, row) => (
        <div>
            <a size="sm" className="mr-2 text-blue" onClick={() => handleView(row)}><i className="fas fa-eye"/></a>
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
        {
            dataField: "auteur.nom",
            text: "Auteur",
            formatter: (cell, row) => row.auteur?.nom || "",
        },
        {
            dataField: "actions",
            text: "Actions",
            formatter: actionFormatter,
        },
    ];

    return (
        <>
            <AdminNavbar/>

        <Container className="mt-4 vh-100 min-vh-95" fluid>
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
                                    <p className="text-blue font-weight-bold" >Liste des livres</p>
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

        </Container>
            <AdminFooter style={{ flexShrink: 0 }} />
        </>
    );
}

export default LivresLecteur;
