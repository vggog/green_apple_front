import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import MasterAuth from "../services/MasterAuth"


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
        localStorage.setItem('token', response.data.access_token);
    }
}
