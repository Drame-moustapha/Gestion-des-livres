import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, BreadcrumbItem, Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import du hook useNavigate

import routes from "routes";

function HeaderSimple({ name, parentName, nameMere }) {
  const navigate = useNavigate(); // Initialisation de useNavigate

  const getRoutes = (routes) => {
    let routeName = name;
    let routeParentName = parentName;
    routes.forEach((prop) => {
      if (prop.collapse) {
        const childRoutes = getRoutes(prop.views);
        if (childRoutes) {
          routeName = childRoutes.name || routeName;
          routeParentName = childRoutes.parentName || routeParentName;
        }
      } else if (prop.name && prop.parentName) {
        routeName = prop.name;
        routeParentName = prop.parentName;
        routes = prop.childRoutes;
      }
    });
    return { name: routeName, parentName: routeParentName, nameMere };
  };

  const { name: resolvedName, parentName: resolvedParentName } = getRoutes(routes);

  return (
    <div className="header mt-0 pb-6 content_title content_title--calendar text-success table-responsive">
      <Container fluid>
        <div className="header-body">
          <Row className="align-items-center py-4">
            <Col className="col-xl-6">
              <Breadcrumb className="d-none d-md-inline-block ml-lg-4" listClassName="breadcrumb-links breadcrumb-dark">
                <BreadcrumbItem>
                  <a href="#" onClick={(e) => e.preventDefault()}>
                    <i className="fas fa-home text-success" />
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <a
                    className="text-success"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(-1); // Retour à la page précédente
                    }}
                  >
                    {resolvedParentName}
                  </a>
                </BreadcrumbItem>
                <BreadcrumbItem aria-current="page" className="active text-success">
                  {resolvedName}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

HeaderSimple.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default HeaderSimple;
