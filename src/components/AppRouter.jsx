import React from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../route";


function AppRouter() {
    return (
        <Routes>
            {
                publicRoutes.map(
                    route => <Route element={<route.component />} path={route.path} exact={route.exact} key={route.path}/>
                )
            }
        </Routes>
    );
};


export default AppRouter;
