import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes, adminRoutes, systemRoutes } from "../route";


function AppRouter() {

    const routes = publicRoutes;

    if (localStorage.getItem("whoAuth") === "admin") {
        routes.push(...adminRoutes);
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
