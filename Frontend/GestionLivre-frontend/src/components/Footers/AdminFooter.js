import React from "react";
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function AdminFooter() {
  return (
      <footer  className="bg-white text-black py-2" id="footer-main">
        <Container fluid>
          <Row className="align-items-center justify-content-lg-between">
            <Col lg="6">
              <div className="copyright text-center text-lg-left text-muted ">
                © {new Date().getFullYear()}{" "}
                <a
                    className="font-weight-bold ml-1 "
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                  GESTION DES LIVRES
                </a>
              </div>
            </Col>
            <Col lg="6">
              <Nav className="nav-footer justify-content-center justify-content-lg-end">

                <NavItem>
                  <NavLink
                      href="https://www.linkedin.com/in/moustaphadramekandji/"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                    Développé par SMD
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
          </Row>
        </Container>
      </footer>
  );
}

export default AdminFooter;