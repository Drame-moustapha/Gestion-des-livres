import React, {useContext} from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import AdminFooter from "../components/Footers/AdminFooter.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import routes from "../routes";
import {AuthContext} from "../services/AuthContext";

function Admin() {
  const [sidenavOpen, setSidenavOpen] = React.useState(true);
  const location = useLocation();
  const mainContentRef = React.useRef(null);
    const { authData } = useContext(AuthContext);
    const token = authData.token;
    const role=authData.roles?.[0];
    const isAdmin = role === "ADMIN";

  // Scroll to top on route change
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContentRef.current.scrollTop = 0;
  }, [location]);

  // Get routes
  const getRoutes = (routes) => {
    return routes.flatMap((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
            <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  // Get brand text for the navbar
  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  // Toggle sidebar
  const toggleSidenav = (e) => {
    if (document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-pinned");
      document.body.classList.add("g-sidenav-hidden");
    } else {
      document.body.classList.add("g-sidenav-pinned");
      document.body.classList.remove("g-sidenav-hidden");
    }
    setSidenavOpen(!sidenavOpen);
  };

  // Get navbar theme based on route
  const getNavbarTheme = () => {
    return location.pathname.indexOf("admin/alternative-dashboard") === -1
        ? "dark"
        : "light";
  };

  return (
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Sidebar */}
          {isAdmin ? (
        <Sidebar
            routes={routes}
            toggleSidenav={toggleSidenav}
            sidenavOpen={sidenavOpen}
            logo={{
              innerLink: "/",
              imgSrc: require("../assets/img/brand/blue.png"),
              imgAlt: "...",
            }}
        />
          ): ""}

        {/* Main content */}
        <div
            className="main-content"
            ref={mainContentRef}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
        >
          <div>
            <AdminNavbar
                theme={getNavbarTheme()}
                toggleSidenav={toggleSidenav}
                sidenavOpen={sidenavOpen}
                brandText={getBrandText(location.pathname)}
            />
            <Routes>
              {getRoutes(routes)}
              <Route
                  path="*"
                  element={<Navigate to="/admin/dashboard" replace />}
              />
            </Routes>
          </div>
        </div>
          {/* Footer */}
          <AdminFooter style={{ flexShrink: 0 }} />


        {/* Backdrop for sidebar on mobile */}
        {sidenavOpen && (
            <div className="backdrop d-xl-none" onClick={toggleSidenav} />
        )}
      </div>
  );
}

export default Admin;