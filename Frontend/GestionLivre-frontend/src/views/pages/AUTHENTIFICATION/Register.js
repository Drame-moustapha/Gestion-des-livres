import React, { useState } from "react";
import { FaIdCard, FaMars } from "react-icons/fa";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    InputGroup, Input,
    InputGroupAddon,
    InputGroupText,
    Container,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import logo from "assets/img/brand/blue.png";
import IndexNavbar from "../../../components/Navbars/IndexNavbar";
import { useNavigate } from "react-router-dom";
import { createAuteur, createUser } from "../../../services/InscriptionService";

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedRole, setSelectedRole] = useState("Lecteur");
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        prenom: Yup.string().required("Prénom requis."),
        nom: Yup.string().required("Nom requis."),
        email: Yup.string().email("Email invalide.").required("Email requis."),
        password: Yup.string().min(8, "Au moins 8 caractères.").required("Mot de passe requis."),
        sexe: Yup.string().required("Sexe requis."),
        role: Yup.string().required("Rôle requis."),
        biographie: Yup.string().when("role", {
            is: "Auteur",
            then: (schema) => schema.required("Biographie requise."),
            otherwise: (schema) => schema.notRequired(),
        }),
    });

    const handleSubmit = async (values) => {
        setLoading(true);
        setErrorMessage("");
        try {
            const compteData = {
                username: values.email,
                password: values.password,
                prenom: values.prenom,
                nom: values.nom,
                sexe: values.sexe,
                biographie: values.role === "Auteur" ? values.biographie : "",
            };

            if (values.role === "Auteur") {
                await createAuteur(compteData);
            } else {
                await createUser(compteData);
            }

            setShowModal(true);
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || error.message || "Une erreur est survenue lors de l'inscription."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        navigate("/auth/login");
    };

    return (
        <>
            <IndexNavbar className="bg-white text-white" />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col className="col-xl-5">
                        <div className="text-center mb-3">
                            <a href="#" className={selectedRole === "Auteur" ? "text-primary" : "text-secondary"} onClick={() => setSelectedRole("Auteur")}>Auteur</a>
                            <span className="mx-2">|</span>
                            <a href="#" className={selectedRole === "Lecteur" ? "text-primary" : "text-secondary"} onClick={() => setSelectedRole("Lecteur")}>Lecteur</a>
                        </div>
                        <Card>
                            <CardHeader className="text-center">
                                <img src={logo} alt="Logo" className="mb-3 mt-2" style={{ width: "100px" }} />
                                <h1>Créer un nouveau compte {selectedRole}</h1>
                                <h3>Veuillez remplir tous les champs</h3>
                            </CardHeader>
                            <CardBody>
                                <Formik
                                    initialValues={{ prenom: "", nom: "", sexe: "", email: "", password: "", role: selectedRole, biographie: "" }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                    enableReinitialize
                                >
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                        <form onSubmit={handleSubmit}>
                                            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
                                            <FormGroup>
                                                <Input type="text" name="prenom" placeholder="Prénom" value={values.prenom} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.prenom && errors.prenom && <div className="text-danger">{errors.prenom}</div>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Input type="text" name="nom" placeholder="Nom" value={values.nom} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.nom && errors.nom && <div className="text-danger">{errors.nom}</div>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Input type="select" name="sexe" value={values.sexe} onChange={handleChange} onBlur={handleBlur}>
                                                    <option value="">Sélectionnez le sexe</option>
                                                    <option value="Homme">Masculin</option>
                                                    <option value="Femme">Féminin</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.email && errors.email && <div className="text-danger">{errors.email}</div>}
                                            </FormGroup>
                                            <FormGroup>
                                                <Input type="password" name="password" placeholder="Mot de passe" value={values.password} onChange={handleChange} onBlur={handleBlur} />
                                                {touched.password && errors.password && <div className="text-danger">{errors.password}</div>}
                                            </FormGroup>
                                            {selectedRole === "Auteur" && (
                                                <FormGroup>
                                                    <Input type="textarea" name="biographie" placeholder="Biographie" value={values.biographie} onChange={handleChange} onBlur={handleBlur} />
                                                    {touched.biographie && errors.biographie && <div className="text-danger">{errors.biographie}</div>}
                                                </FormGroup>
                                            )}
                                            <Button color="primary" block type="submit" disabled={loading}>
                                                {loading ? "Enregistrement..." : "S'inscrire"}
                                            </Button>
                                        </form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={showModal} toggle={handleModalClose} centered>
                <ModalBody className="text-center">
                    <h4 className="font-weight-bold mb-3">Inscription réussie !</h4>
                    <p>Votre compte {selectedRole} a été créé avec succès. Veuillez consulter votre email pour activer votre compte.</p>
                    <Button color="success" onClick={handleModalClose}>OK</Button>
                </ModalBody>
            </Modal>
        </>
    );
};

export default Register;
