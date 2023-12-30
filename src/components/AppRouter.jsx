import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, adminRoutes, systemRoutes, masterRoutes } from "../route";


function AppRouter() {

    const routes = publicRoutes;

    if (localStorage.getItem("whoAuth") === "admin") {
        routes.push(...adminRoutes);
    } else if (localStorage.getItem("whoAuth") === "master") {
        routes.push(...masterRoutes);
    }

    routes.push(...systemRoutes);

    return (
        <Routes>
            {
                routes.map(
                    route => <Route element={<route.component />} path={route.path} exact={route.exact} key={route.path}/>
                )
            }
        </Routes>
    );
};


export default AppRouter;
