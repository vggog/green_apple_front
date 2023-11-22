import api from "../http";


export default class AuthService {
    static async login(username, password) {
        return api.post("/admin/auth", {password, username}, { 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    }
}
