import React from "react";

import Login from "views/pages/AUTHENTIFICATION/Login.js";
import Register from "views/pages/AUTHENTIFICATION/Register.js";
import Dashbord from "./views/pages/Dashbords/Dashbord";
import Livre from "views/pages/LIVRE/livre";

import Lecteur from "views/pages/utilisateurs/Lecteur";
import Auteur from "./views/pages/utilisateurs/Auteur";
import DetailsLivre from "./views/pages/LIVRE/DetailsLivre";



const routes = [
  {

    path: "/",
    name: "Tableau de bord",
    icon: "ni ni-chart-bar-32 text-info",
    state: "MonCollapse",
    miniName: "T",
    component: <Dashbord />,
    layout: "/admin",
    roles: ["ADMIN"]


  },
  {
    collapse: true,
    name: "Mon Compte",
    icon: "ni ni-single-02 text-blue",
    state: "Mon CompteCollapse",
    hidden: true,
    views: [

      {
        path: "/login",
        name: "Login",
        miniName: "L",
        component: <Login />,
        layout: "/auth",
        hidden: true,
      },

      {
        path: "/register",
        name: "Register",
        miniName: "R",
        component: <Register />,
        layout: "/auth",
        hidden: true,
      },


    ],
  },
  {
    path: "/detailsLivre/:id",
    name: "Details Livre",
    miniName: "D",
    component: <DetailsLivre />,
    layout: "/admin",
    hidden: true,

  },
  {
    path: "/livre",
    name: "Livre",
    icon: "fas fa-book text-info",
    miniName: "L",
    component: <Livre />,
    layout: "/admin",
    roles: ["ADMIN","AUTEUR"],
    
  },
  {
    path: "/auteur",
    name: "Auteurs",
    icon: "ni ni-single-02 text-info",
    miniName: "A",
    component: <Auteur />,
    layout: "/admin",
    roles: ["ADMIN"],
  },
  {
    path: "/lecteur",
    name: "Lecteurs",
    icon: "fas fa-users-cog text-info",
    miniName: "L",
    component: <Lecteur />,
    layout: "/admin",
    roles: ["ADMIN"],

  },

]


export default routes;
