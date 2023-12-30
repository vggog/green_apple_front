import React from "react";
import MyButton from "../MyButton/MyButton";
import AuthService from "../../../services/AuthService";
import MasterAuth from "../../../services/MasterAuth";

import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();

    async function logout() {
        if (localStorage.getItem("whoAuth") === "admin" ) {
            await AuthService.logout();
        }
        else if (localStorage.getItem("whoAuth") === "master" ) {
            await MasterAuth.logout();
        }
        navigate('/');
    }

    return (
        <div className="navbar">
            { localStorage.getItem("whoAuth") && <MyButton style={{'float': 'right'}} onClick={logout}>Выйти</MyButton> }
        </div>
    )
}

export default Navbar;
