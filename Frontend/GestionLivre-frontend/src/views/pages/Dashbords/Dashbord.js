
import React, {useContext, useEffect, useState} from "react";


import "Index.css";
import {AuthContext} from "../../../services/AuthContext";
import {countLivre, getAllLivres} from "services/LivreService";
import {countAuteur} from "services/AuteurService";
import {countUsers} from "services/UtilisateurService";
import {Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import "Index.css";
function Dashbord() {

    const { authData } = useContext(AuthContext);
    const token = authData.token;
    const[livres,setLivres]=useState([]);
    const[livre,setLivre]=useState(0);
    const[auteur,setAuteur]=useState(0);
    const[user,setUser]=useState(0);
    const [livresParLangue, setLivresParLangue] = useState([]);

    useEffect(() => {
        fetchLivres();
        fetchUser()

    }, []);

    const fetchUser = async () => {
        try {

            const res = await countUsers();
            setUser(res);
        } catch (error) {
            console.error("Erreur lors de la récupération du nombre d'utilisateurs :", error);

        }
    };

    const fetchLivres = async () => {
        try {

            const res = await countLivre(token);
            setLivre(res);
            const l = await getAllLivres(token);
            setLivres(l);

            const livresParLangueData = l.reduce((acc, livre) => {
                const { langue } = livre;
                acc[langue] = (acc[langue] || 0) + 1;
                return acc;
            }, {});

            const formattedData = Object.entries(livresParLangueData).map(([langue, count]) => ({
                langue,
                count
            }));

            setLivresParLangue(formattedData);

            const response = await countAuteur(token);
            setAuteur(response);
        } catch (error) {
            console.error("Erreur lors de la récupération du nombre de livres et celui des auteurs :", error);

        }
    };
    return (
        <>
            <div className="container-fluid min-vh-80">
                <Row className="d-flex justify-content-center align-items-center my-4 h2  text-blue">Tableau de bord</Row>
                <Row>
                    <Col md={4}>
                        <Card  className=" card-dashboard h-100 border-0">
                            <CardBody className="text-center bg-white rounded shadow-sm">
                                <CardTitle tag="h2" className="text-secondary mb-2">
                                    <h2>Utilisateurs</h2>
                                </CardTitle>
                                <CardText tag="h2" className={`text-success fw-bold`}>
                                    {user}
                                </CardText>
                            </CardBody>

                        </Card>
                    </Col>
                    <Col md={4} >
                        <Card  className=" card-dashboard h-100 border-0">
                            <CardBody className="text-center bg-white rounded shadow-sm">
                                <CardTitle tag="h2" className="text-secondary mb-2">
                                    <h2>Auteurs</h2>
                                </CardTitle>
                                <CardText tag="h2" className={`text-info fw-bold`}>
                                    {auteur}
                                </CardText>
                            </CardBody>

                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className=" card-dashboard h-100 border-0">
                            <CardBody className="text-center bg-white rounded shadow-sm">
                                <CardTitle tag="h2" className="text-secondary mb-2">
                                    <h2>Livres</h2>
                                </CardTitle>
                                <CardText tag="h2" className={`text-warning fw-bold`}>
                                    {livre}
                                </CardText>
                            </CardBody>

                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <h2>Courbe pour nombre de livres par langue</h2>
                    <Col md={12}>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={livresParLangue} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="langue" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Dashbord;
