import React from "react";
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function AuthFooter() {
  return (
    <footer  className="bg-blue-950 text-white py-2" id="footer-main">
      <Container>
        <Row className="align-items-center justify-content-xl-between ">
          <Col xl="5">
            <div className="copyright text-center text-xl-left text-muted ml-4"  >
              <b className="font-weight-bold ml--9" style={{ color: 'blue' }}>© {new Date().getFullYear()}{" "}</b>
              <a
                className="font-weight-bold ml-1"
                href="#"
                style={{ color: 'white' }}
              >
                GESTION DES LIVRES
              </a>

            </div>
          </Col>
          <Col xl="4">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">


              <NavItem>
                <NavLink href="" target="_blank" style={{ color: 'white' }}>MD Développeur FULL STACK</NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default AuthFooter;
