import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "Index.css";
import "assets/css/monstyle.css";

function IndexNavbar() {
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-md py-3">
            <div className="container">
                {/* Logo + texte à gauche */}
                <Link to="/" className="navbar-brand d-flex align-items-center gap-2">
                    <img
                        src={require("../../assets/img/brand/blue.png")}
                        alt="Logo UASZ"
                        className="rounded-circle"
                        style={{ width: "40px", height: "40px" }}
                    />
                    <span className="fw-bold text-blue-600 fs-5 m-0">Gestion des Livres</span>
                </Link>

                {/* Bouton pour version mobile */}
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
          <span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 50 50"
            >
              <path d="M0 7.5h50v5H0zm0 15h50v5H0zm0 15h50v5H0z" fill="#1d4ed8" />
            </svg>
          </span>
                </button>

                {/* Liens à droite */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav d-flex align-items-center gap-3">
                        <li className="nav-item">
                            <Link
                                to="/auth/login"
                                className={`nav-link fw-medium ${
                                    location.pathname === "/auth/login"
                                        ? "text-primary fw-bold border-bottom border-primary"
                                        : "text-gray-700"
                                }`}
                            >
                                Se connecter
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/auth/register"
                                className={`nav-link fw-medium ${
                                    location.pathname === "/auth/register"
                                        ? "text-primary fw-bold border-bottom border-primary"
                                        : "text-gray-700"
                                }`}
                            >
                                S'inscrire
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default IndexNavbar;
