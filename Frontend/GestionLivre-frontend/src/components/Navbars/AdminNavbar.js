
import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";

import PropTypes from "prop-types";

import {

  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,

  Media,
  Navbar,
  NavItem,
  Nav,
  Container,

} from "reactstrap";
import { AuthContext } from "../../services/AuthContext";
import { FaSignOutAlt } from "react-icons/fa";
import default_image_url from "../../assets/img/brand/blue.png";



function AdminNavbar({ theme, sidenavOpen, toggleSidenav }) {

  const { authData } = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const individuId= authData?.id;

  const navigate = useNavigate();
  const [document, setDocument] = useState();
  const [profileImage, setProfileImage] = useState(
      localStorage.getItem("profileImage") || default_image_url
  );






  return (
    <>
      <Navbar className="navbar-top navbar-expand border-bottom colordark">
        <Container fluid  >

          <Nav className="align-items-center ml-md-auto" navbar>
            <NavItem className="d-xl-none">
              <div
                className={classnames(
                  "pr-3 sidenav-toggler",
                  { active: sidenavOpen },
                  { "sidenav-toggler-dark": theme === "dark" }
                )}
                onClick={toggleSidenav}
              >
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                  <i className="sidenav-toggler-line" />
                </div>
              </div>
            </NavItem>


          </Nav>

          <Nav className="align-items-center ml-auto ml-md-0" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="nav-link pr-0" color="" tag="a">
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    {/* <img
                        alt="..."
                        src={require("../../assets/img/brand/blue.png")}
                    /> */}
                     <img
                         src={profileImage}
                         alt="Profile"
                         //style={{width: "180px", height: "171px", borderRadius: "50%"}}
                     />


                  </span>
                  <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold">

                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem className="noti-title" header tag="div">
                  <h4 className="text-overflow m-0"> {authData ? (
                    <>
                      {authData.nom},{authData.prenom}

                    </>
                  ) : (
                    <h2>Please log in.</h2>
                  )}</h4>
                </DropdownItem>
                <DropdownItem divider />

                <DropdownItem
                  onClick={(e) => {
                    e.preventDefault();  // Empêcher tout comportement de lien
                    logout();  // Appeler la fonction logout pour déconnecter l'utilisateur
                  }}
                >
                  
                  <FaSignOutAlt className="mr-2" />
                  <span>se déconnecter</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

        </Container>
      </Navbar>
    </>
  );
}

AdminNavbar.defaultProps = {
  toggleSidenav: () => { },
  sidenavOpen: false,
  theme: "dark",
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"]),
};

export default AdminNavbar;
