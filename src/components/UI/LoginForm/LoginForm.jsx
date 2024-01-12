import React, { useContext, useState } from "react";
import { Context } from "../../..";
import MyInput from "../MyInput/MyInput";
import MyButton from "../MyButton/MyButton";
import classes from "./LoginForm.module.css"
import { useNavigate } from "react-router-dom";
import { UnauthorizedError, MasterNotFoundError, MasterWhorstPasswordError } from "../../../exceptions/HttpErrorException";



function Login({ whoAuth, urlToRedirect = "" }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {store} = useContext(Context);

    const navigate = useNavigate();

    async function authorize(e) {
        e.preventDefault();
        var flag = true;

        try {
            await store.login(username, password, whoAuth);
        } catch (e) {
            flag = false;
            if (e instanceof UnauthorizedError) {
                setErrorMessage("Неверный логин или пароль.");
            } else if (e instanceof MasterNotFoundError) {
                setErrorMessage("Мастер не найден.")
            } else if (e instanceof MasterWhorstPasswordError) {
                setErrorMessage("Неверный пароль.")
            }
        }

        if (flag) {
            localStorage.setItem("whoAuth", whoAuth);
            if (urlToRedirect) navigate(urlToRedirect);
        }
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
            {errorMessage && <div>{errorMessage}</div>}
        </div>    
    );
};

export default Login;
