import api from "../http";


export default class CustomerService {

    static async fetchRepairOrder(repairOrderId) {
        return api.get("/track/" + repairOrderId);
    }
}
