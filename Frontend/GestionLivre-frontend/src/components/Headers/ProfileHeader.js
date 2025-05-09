import React, { useContext } from "react";
import { AuthContext } from "../../services/AuthContext"; //ajouter le contexte
import { Button, Container, Row, Col } from "reactstrap";

function ProfileHeader() {
  const { authData } = useContext(AuthContext);



  return (
    <>
      <div
        className="header pb-6 d-flex align-items-center"
        style={{
          minHeight: "40px",
         // backgroundImage: 'url("' + require("assets/img/brand/argon-react-white.png") + '")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="accent-gray-500" />

        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col className=" mb-3 ml-3">
              <h7 className="display-1 text-blue">{authData ? `${authData.nom} ${authData.prenom} ` : "mon profile"}</h7>

            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ProfileHeader;
