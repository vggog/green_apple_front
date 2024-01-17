import api from "../http";
import { API_URL } from "../http";

import axios from "axios";

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

    static async getReceiptFile(repairOrderId) {
        return axios(
            {
                url: API_URL + "/master/repair_orders/receipt/" + repairOrderId,
                method: 'GET',
                responseType: "blob"
            }
        ).then((response) => {return response}).catch(async (error) => {
            const originalConfig = error.config;
            if (error.response) {
                if (error.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    var rs;
                    if (localStorage.getItem("whoAuth") === "admin") {
                        rs = await api.get("/admin/auth/refresh");
                    } else if (localStorage.getItem("whoAuth") === "master") {
                        rs = await api.get("/master/refresh");
                    }
                    
                    const accessToken = rs.data.access_token;
                    localStorage.removeItem("token");
                    localStorage.setItem("token", accessToken);

                    return api(originalConfig);
                }
                
                return error.response
        }})
        // return api.get("/master/repair_orders/receipt/" + repairOrderId, {
        //     headers: {
        //         "Content-Type": "application/octet-stream"
        //     }
        // }
        // );
    }
}
