import React from "react";
import classes from "./AdminLogin.module.css"
import Login from "../../components/UI/LoginForm/LoginForm";


function AdminLogin() {
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
            <Login whoAuth="admin" urlToRedirect="/admin/master/all"/>
        </div>
    );
};


export default AdminLogin;
