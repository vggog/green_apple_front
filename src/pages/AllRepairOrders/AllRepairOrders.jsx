import { useEffect, useState } from "react";
import React from "react";
import RepairOrderService from "../../services/RepairOrderService";
import BriefInfoRepairOrders from "../../components/UI/BriefInfoRepairOrders/BriefInfoRepairOrder";
import classes from "./AllRepairOrders.module.css"


function AllRepairOrders() {
    const [repairOrders, setRepairOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function GetAllRepairOrders() {
        setIsLoading(true);
        const response = await RepairOrderService.getAllRepairOrders();
        setRepairOrders(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        GetAllRepairOrders()
    }, [])

    if (isLoading) {
        return (
            <div>Загрузка...</div>
        )
    } else if (repairOrders.length === 0) {
        return (
            <div>Список заказов пуст.</div>
        )
    }

    return (
        <div className={classes.allRepairOrders}>
            <h1 style={{"textAlign": "center"}}>Все заказы на ремонт</h1>
            {
                repairOrders.map( (repairOrder) => 
                    <BriefInfoRepairOrders key={repairOrder.id} repairOrder={repairOrder} />
                )
            }
        </div>
    )
} 

export default AllRepairOrders;
