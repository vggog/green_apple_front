import api from "../http";


export default class MasterService {
    static async getAllMasters() {
        return api.get("/admin/master/all")
    }

    static async addNewMaster(data) {
        return api.post("admin/master/", data);
    }

    static async getMasterInfo(masterID) {
        return api.get("/admin/master/" + masterID);
    }

    static updateMasterInfo(data, masterID) {
        return api.put("/admin/master/" + masterID, data)
    }

    static async deleteMaster(masterID) {
        return api.delete("admin/master/" + masterID);
    }

    static async getAllRepairOrders() {
        return api.get("/admin/repair_orders/all")
    }

    static async getRepairOrder(repair_order_id) {
        return api.get("/admin/repair_orders/" + repair_order_id)
    }
}
