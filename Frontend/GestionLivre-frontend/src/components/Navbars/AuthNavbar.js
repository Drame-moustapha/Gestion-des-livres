
import React from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
} from "reactstrap";

function AdminNavbar() {
  return (
    <>
       <Navbar
        className="navbar-horizontal navbar-main navbar-dark navbar-transparent"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <NavbarBrand to="/" tag={Link} className="nav-link-circle d-flex align-items-center">
          
            <img
              alt="..."
             
              src={require("assets/img/brand/blue.png")}
            />
            <span className="nav-link-inner--text ml-2">Uasz</span>
            
          </NavbarBrand>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/admin/dashboard">
                    <img alt="..." src={require("assets/img/brand/blue.png")} />
                    
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="mr-auto" navbar>
              
              <NavItem>
                <NavLink to="/auth/login" tag={Link} className="nav-link-circle">
                  <span className="nav-link-inner--text" >Login</span>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/auth/register0" tag={Link} className="nav-link-circle">
                  <span className="nav-link-inner--text" >Register</span>
                </NavLink>
              </NavItem>

            </Nav>
            <hr className="d-lg-none" />
            
            
          </UncontrolledCollapse> *
         </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
