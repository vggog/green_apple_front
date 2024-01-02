import React, { useContext, useState } from "react";
import { Context } from "../../..";
import MyInput from "../MyInput/MyInput";
import MyButton from "../MyButton/MyButton";
import classes from "./LoginForm.module.css"
import { useNavigate } from "react-router-dom";


function Login({ whoAuth, urlToRedirect = "" }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {store} = useContext(Context);

    const navigate = useNavigate();

    function authorize(e) {
        e.preventDefault();
        store.login(username, password, whoAuth);
        localStorage.setItem("whoAuth", whoAuth);
        if (urlToRedirect) navigate(urlToRedirect);
    }

    return (
        <div className={classes.loginForm}>
            <MyInput
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="username"
            />
            <MyInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="пароль"
            />
            <MyButton onClick={authorize}>Войти</MyButton>
        </div>    
    );
};

export default Login;
