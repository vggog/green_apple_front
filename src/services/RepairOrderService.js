import api from "../http";


export default class RepairOrderService {
    static async getAllRepairOrders() {
        return api.get("/master/repair_orders/all")
    }

    static async fetchRepairOrder(repairOrderId) {
        return api.get("/master/repair_orders/" + repairOrderId);
    }
}
