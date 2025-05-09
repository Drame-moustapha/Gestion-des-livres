import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert, Form,
} from "reactstrap";
import logo from "assets/img/brand/blue.png";
import { AuthContext } from "services/AuthContext";
import IndexNavbar from "../../../components/Navbars/IndexNavbar";

const Login = () => {
  const { login, authData } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focusedPassword, setFocusedPassword] = useState(false);
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    setErrorMessage("");

    if (!username) {
      setErrorMessage("Le nom d'utilisateur est requis.");
      isValid = false;
    }
    if (!password) {
      setErrorMessage((prev) => (prev ? `${prev} ` : "") + "Le mot de passe est requis.");
      isValid = false;
    } else if (password.length < 8) {
      setErrorMessage((prev) => (prev ? `${prev} ` : "") + "Le mot de passe doit contenir au moins 8 caractères.");
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const conn=await login(username, password);

      console.info("login");
      const role=conn?.roles?.[0] || authData?.roles?.[0];
      console.info("role:::",role)
      switch (role) {
        case "ADMIN":
          navigate("/admin");
          break;

        case "AUTEUR":
          navigate("/admin/livre");
          break;
          case "USER":
            navigate("/admin/livres");
            break;
        default:
          setErrorMessage("Rôle inconnu. Veuillez contacter l'administrateur.");
          break;
      }
    } catch (error) {
      setErrorMessage("Nom d'utilisateur ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <>
        <IndexNavbar className="bg-white text-white" />
        <div
            style={{
              backgroundColor: "lightgray",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "90vh",
              display: "flex",
              alignItems: "center",
            }}
        >
          <Container>
            <Row className="justify-content-center">
              <Col className="col-xl-6">
                <Card
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.5)",
                      border: "none",
                      borderRadius: "15px",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <CardHeader className="text-center custom-header" style={{ backgroundColor: "transparent", border: "none" }}>
                    <img src={logo} alt="Logo UASZ" className="mb-3 mt-2 rounded-circle border-0 media-comment-avatar center" style={{ width: "100px" }} />
                    <p className="h2 font-weight-bold">Bienvenue à Sunu Bibliothéque</p>
                    <p className="text-muted font-weight-bold">Connectez-vous pour accéder à votre compte</p>
                  </CardHeader>
                  <CardBody className="px-lg-5 py-lg-4" style={{ backgroundColor: "transparent" }}>
                    <Form role="form">
                      {/* Username */}
                      <FormGroup className={classnames("mb-4", { focused: focusedEmail })}>
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="ni ni-single-02" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                              placeholder="Username"
                              type="text"
                              onFocus={() => setFocusedEmail(true)}
                              onBlur={() => setFocusedEmail(false)}
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              style={{ borderColor: focusedEmail ? "#80BF00" : "lightgray" }}
                          />
                        </InputGroup>
                      </FormGroup>

                      {/* Password */}
                      <FormGroup className={classnames("mb-3", { focused: focusedPassword })}>
                        <InputGroup className="input-group-merge input-group-alternative">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <Button
                                  color="link"
                                  onClick={() => setShowPassword(!showPassword)}
                                  style={{ padding: 0, border: "none", background: "none" }}
                              >
                                <i className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"} />
                              </Button>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                              placeholder="Mot de passe"
                              type={showPassword ? "text" : "password"}
                              onFocus={() => setFocusedPassword(true)}
                              onBlur={() => setFocusedPassword(false)}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              style={{ borderColor: focusedPassword ? "#80BF00" : "lightgray" }}
                          />
                        </InputGroup>
                      </FormGroup>

                      {/* Error Message */}
                      {errorMessage && (
                          <div className="text-center">
                            <Alert color="danger">{errorMessage}</Alert>
                          </div>
                      )}

                      {/* Submit Button */}
                      <div className="text-center">
                        <Button
                            className="my-4"
                            style={{ backgroundColor: "#33A17B", borderColor: "#33A17B" }}
                            type="button"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                          {loading ? "Connexion en cours..." : "Connexion"}
                        </Button>
                      </div>
                    </Form>

                    {/* Links */}
                    <Row className="mt-1">
                      <Col xs="6">
                        <Link to="/Auth/ChangePassword" className="text-light">
                          <h5>Mot de passe oublié ?</h5>
                        </Link>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Link to="/auth/register" className="text-light">
                          <h5>Créer un nouveau compte</h5>
                        </Link>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
  );
};

export default Login;