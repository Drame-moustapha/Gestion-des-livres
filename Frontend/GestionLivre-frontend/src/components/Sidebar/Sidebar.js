import React, { useContext } from "react";
import { useLocation, NavLink as NavLinkRRD, Link } from "react-router-dom";
import classnames from "classnames";
import { PropTypes } from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Collapse, NavbarBrand, Navbar, NavItem, NavLink, Nav } from "reactstrap";
import { AuthContext } from "../../services/AuthContext";

function Sidebar({ toggleSidenav, sidenavOpen, routes, logo, rtlActive }) {
    const [state, setState] = React.useState({});
    const location = useLocation();
    const { authData } = useContext(AuthContext);
    const userRoles = authData?.roles || [];

    React.useEffect(() => {
        setState(getCollapseStates(routes));
    }, [routes]);

    const activeRoute = (routeName) => location.pathname.includes(routeName) ? "active" : "";

    const onMouseEnterSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.add("g-sidenav-show");
        }
    };

    const onMouseLeaveSidenav = () => {
        if (!document.body.classList.contains("g-sidenav-pinned")) {
            document.body.classList.remove("g-sidenav-show");
        }
    };

    const getCollapseStates = (routes) => {
        let initialState = {};
        routes.forEach((prop) => {
            if (prop.collapse) {
                initialState = {
                    [prop.state]: getCollapseInitialState(prop.views),
                    ...getCollapseStates(prop.views),
                    ...initialState,
                };
            }
        });
        return initialState;
    };

    const getCollapseInitialState = (routes) => {
        return routes.some((route) =>
            route.collapse ? getCollapseInitialState(route.views) : location.pathname.includes(route.path)
        );
    };

    const closeSidenav = () => {
        if (window.innerWidth < 1200) toggleSidenav();
    };

    const createLinks = (routes, depth = 0) => {
        return routes
            .filter((route) => !route.hidden && (!route.roles || route.roles.some(role => userRoles.includes(role))))
            .map((prop, key) => {
                if (prop.redirect) return null;

                const paddingLeft = `${depth * 20}px`;

                if (prop.collapse) {
                    const st = { [prop.state]: !state[prop.state] };
                    return (
                        <NavItem key={key} style={{ paddingLeft }}>
                            <NavLink
                                href="#pablo"
                                onClick={(e) => { e.preventDefault(); setState(st); }}
                                className={classnames({ active: getCollapseInitialState(prop.views) })}
                            >
                                {prop.icon && <i className={prop.icon} />}
                                <span className="nav-link-text">{prop.name}</span>
                            </NavLink>
                            <Collapse isOpen={state[prop.state]}>
                                <Nav className="nav-sm flex-column ml-4">{createLinks(prop.views, depth + 1)}</Nav>
                            </Collapse>
                        </NavItem>
                    );
                }

                return (
                    <NavItem className={activeRoute(prop.layout + prop.path)} key={key} style={{ paddingLeft }}>
                        <NavLink to={prop.layout + prop.path} onClick={closeSidenav} tag={NavLinkRRD}>
                            {prop.icon && <i className={prop.icon} />}
                            <span className="nav-link-text">{prop.name}</span>
                        </NavLink>
                    </NavItem>
                );
            });
    };

    const scrollBarInner = (
        <div className="scrollbar-inner">
            <div className="sidenav-header d-flex align-items-center">
                {logo && (
                    <NavbarBrand to={logo.innerLink || "#"} tag={logo.innerLink ? Link : "a"} className="d-flex align-items-center">
                        <img alt={logo.imgAlt} className="navbar-brand-img" src={logo.imgSrc} />
                        <span className="  ml-0">SUNU BIBLIOTHEQUE</span>
                    </NavbarBrand>
                )}
                <div className="ml-auto">
                    <div className={classnames("sidenav-toggler d-none d-xl-block", { active: sidenavOpen })} onClick={toggleSidenav}>
                        <div className="sidenav-toggler-inner">
                            <i className="sidenav-toggler-line" />
                            <i className="sidenav-toggler-line" />
                            <i className="sidenav-toggler-line" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-inner">
                <Collapse navbar isOpen={true}>
                    <Nav navbar>{createLinks(routes)}</Nav>
                </Collapse>
            </div>
        </div>
    );

    return (
        <Navbar
            className={"sidenav navbar-vertical navbar-expand-xs navbar-light bg-white " + (rtlActive ? "" : "fixed-left")}
            onMouseEnter={onMouseEnterSidenav}
            onMouseLeave={onMouseLeaveSidenav}
        >
            {navigator.platform.includes("Win") ? <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar> : scrollBarInner}
        </Navbar>
    );
}

Sidebar.defaultProps = {
    routes: [{}],
    toggleSidenav: () => {},
    sidenavOpen: false,
    rtlActive: false,
};

Sidebar.propTypes = {
    toggleSidenav: PropTypes.func,
    sidenavOpen: PropTypes.bool,
    routes: PropTypes.arrayOf(PropTypes.object),
    logo: PropTypes.shape({
        innerLink: PropTypes.string,
        imgSrc: PropTypes.string.isRequired,
        imgAlt: PropTypes.string.isRequired,
    }),
    rtlActive: PropTypes.bool,
};

export default Sidebar;