import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import MasterAuth from "../services/MasterAuth"
import { HttpStatusCode } from "axios";
import { UnauthorizedError, MasterNotFoundError, MasterWhorstPasswordError } from "../exceptions/HttpErrorException";


export default class Store {
    user = ""
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
    }

    async login(username, password, whoAuth) {
        var response;
        if (whoAuth === "admin") {
            response = await AuthService.login(username, password);
        }
        else if (whoAuth === "master") {
            response = await MasterAuth.login(username, password);
        }

        if (response.status === 401) {
            throw new UnauthorizedError("Логин или пароль неверный.", 401)
        } else if (response.status === 404) {
            throw new MasterNotFoundError("Мастер не найден.111", 404)
        } else if (response.status === 403) {
            throw new MasterWhorstPasswordError("Мастер не найден.", 403)
        } else {
            localStorage.setItem('token', response.data.access_token);
        }
    }
}
