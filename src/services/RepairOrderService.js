import api from "../http";


export default class RepairOrderService {
    static async getAllRepairOrders() {
        return api.get("/master/repair_orders/all")
    }

    static async fetchRepairOrder(repairOrderId) {
        return api.get("/master/repair_orders/" + repairOrderId);
    }

    static async updateRepairOrderStatus(repairOrderId, data) {
        return api.patch("/master/repair_orders/" + repairOrderId, data);
    }

    static async addRepairOrder(data) {
        return api.post("/master/repair_orders/", data);
    }
}
