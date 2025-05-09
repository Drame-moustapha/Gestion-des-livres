import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

function AuthHeader({ title, lead }) {
  return (
    <header style={{ backgroundColor: '#80BF00', padding: '2.0rem 0' }} id="header-main"> 
      <Container>
        <div className="header-body text-center mb-3"> 
          <Row className="justify-content-center">
            <Col className="px-3" lg="3" md="4" xl="4">
              {title && <h1 style={{ color: 'blue' }}>{title}</h1>}
              {lead && <p className="text-lead" style={{ color: 'blue' }}>{lead}</p>}
            </Col>
          </Row>
        </div>
      </Container>
    </header>
  );
}

AuthHeader.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
};

export default AuthHeader;
