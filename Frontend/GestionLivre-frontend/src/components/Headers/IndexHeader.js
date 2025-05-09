
import React from "react";

import { Link } from "react-router-dom";

import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";
import Login from "views/pages/AUTHENTIFICATION/Login";

function IndexHeader() {
  return (
    <>

<div className="header bg-primary pt-5 pb-7">
        <Container>
          <div className="header-body">
            <Row className="align-items-center">
              <Col lg="6">
                <div className="pr-5">
                  <h1 className="display-2 text-white font-weight-bold mb-0">
                    Gestion Simplifiée des Activités
                  </h1>
                  <h2 className="display-4 text-white font-weight-light">
                    Une plateforme puissante pour organiser et suivre vos activités.
                  </h2>
                  <p className="text-white mt-4">
                    Notre application vous aide à gérer efficacement vos tâches, événements, et bien plus encore, le tout dans un seul endroit pratique.
                  </p>
                  <div className="mt-5">
                    <Button
                      className="btn-neutral my-2"
                      color="default"
                      to="/features"
                      tag={Link}
                    >
                      Découvrir les Fonctionnalités
                    </Button>
                    <Button
                      className="my-2"
                      color="default"
                      href="https://www.example.com/contact"
                    >
                      Contactez-nous
                    </Button>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <Row className="pt-5">
                  <Col md="6">
                    <Card>
                      <CardBody>
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow mb-4">
                          <i className="ni ni-calendar-grid-58" />
                        </div>
                        <h5 className="h3">Gestion des Activités</h5>
                        <p>Organisez et planifiez vos tâches efficacement.</p>
                      </CardBody>
                    </Card>
                    <Card>
                      <CardBody>
                        <div className="icon icon-shape bg-gradient-secondary text-white rounded-circle shadow mb-4">
                          <i className="ni ni-bullet-list-67" />
                        </div>
                        <h5 className="h3">Suivi des Tâches</h5>
                        <p>Gardez une vue d'ensemble sur l'avancement de vos tâches.</p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col className="pt-lg-5 pt-4" md="6">
                    <Card className="mb-4">
                      <CardBody>
                        <div className="icon icon-shape bg-gradient-success text-white rounded-circle shadow mb-4">
                          <i className="ni ni-planet" />
                        </div>
                        <h5 className="h3">Événements</h5>
                        <p>Inscrivez-vous et gérez votre participation à des événements.</p>
                      </CardBody>
                    </Card>
                    <Card className="mb-4">
                      <CardBody>
                        <div className="icon icon-shape bg-gradient-warning text-white rounded-circle shadow mb-4">
                          <i className="ni ni-support-16" />
                        </div>
                        <h5 className="h3">Support</h5>
                        <p>Obtenez de l'aide et des conseils pour utiliser notre application.</p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
    
    </>
  );
}

export default IndexHeader;
