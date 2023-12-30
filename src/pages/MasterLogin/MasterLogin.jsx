import React from "react";
import classes from "./MasterLogin.module.css"
import Login from "../../components/UI/LoginForm/LoginForm";


function MasterLogin() {
    let whoAuth = {
        admin: "админ",
        master: "мастер",
    }
    
    if (localStorage.getItem("whoAuth")) {
        return (
            <div>Вы авторизировались как {whoAuth[localStorage.getItem("whoAuth")]}.</div>
        )
    }

    return (
        <div className={classes.adminLoginPage}>
            <Login whoAuth="master" urlToRedirect="/"/>
        </div>
    );
};


export default MasterLogin;