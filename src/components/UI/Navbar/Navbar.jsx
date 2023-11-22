import React from "react";
import MyButton from "../MyButton/MyButton";

import { useNavigate } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('whoAuth');
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className="navbar">
            { localStorage.getItem("whoAuth") && <MyButton style={{'float': 'right'}} onClick={logout}>Выйти</MyButton> }
        </div>
    )
}

export default Navbar;
