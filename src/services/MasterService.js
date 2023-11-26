import api from "../http";


export default class MasterService {
    static async getAllMasters() {
        return api.get("/admin/master/all")
    }

    static async getMasterInfo(masterID) {
        return api.get("/admin/master/" + masterID);
    }
}
