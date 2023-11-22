import React from "react";
import classes from "./AdminLogin.module.css"
import Login from "../../components/UI/LoginForm/LoginForm";


function AdminLogin() {
    // const {store} = useContext(Context);

    // console.log(store.isAuth, store.user)

    if (localStorage.getItem("whoAuth") === "admin") {
        return (
            <div>Вы авторизировались как админ.</div>
        )
    }

    return (
        <div className={classes.adminLoginPage}>
            <Login whoAuth="admin" urlToRedirect="/admin/master/all"/>
        </div>
    );
};


export default AdminLogin;
