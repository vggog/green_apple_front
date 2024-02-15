import { useEffect, useState } from "react";
import React from "react";
import MasterService from "../../services/MasterService";
import BriefInfoRepairOrders from "../../components/UI/BriefInfoRepairOrders/BriefInfoRepairOrder";
import classes from "./AdminAllRepairOrders.module.css"


function AdminAllRepairOrders() {
    const [repairOrders, setRepairOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function GetAllRepairOrders() {
        setIsLoading(true);
        const response = await MasterService.getAllRepairOrders();
        try {
            setRepairOrders(response.data);
            if (response.status === 401) {
                setError("Токен устарел, перезайдите в учётную запись.");
            } 
        } catch (TypeError) {
            setError("Ошибка сервера.");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        GetAllRepairOrders()
    }, [])

    if (isLoading) {
        return (
            <div>Загрузка...</div>
        )
    } else if (error) {
        return (
            <div>{error}</div>
        )
    } else if (repairOrders.length === 0) {
        return (
            <div>Список заказов пуст.</div>
        )
    }

    return (
        <div className={classes.allRepairOrders}>
            <h1 style={{"textAlign": "center"}}>Все заказы на ремонт</h1>
            <hr />
            {
                repairOrders.map( (repairOrder) => 
                    <BriefInfoRepairOrders key={repairOrder.id} repairOrder={repairOrder} />
                )
            }
        </div>
    );
}

export default AdminAllRepairOrders;
