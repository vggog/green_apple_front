import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";

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

    async login(username, password) {
        const response = await AuthService.login(username, password);
        localStorage.setItem('token', response.data.access_token);
    }
}
