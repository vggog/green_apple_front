import { useEffect, useState } from "react";
import React from "react";
import MasterService from "../../services/MasterService";
import BriefInfoRepairOrders from "../../components/UI/BriefInfoRepairOrders/BriefInfoRepairOrder";
import classes from "./AdminAllRepairOrders.module.css"


function AdminAllRepairOrders() {
    const [repairOrders, setRepairOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function GetAllRepairOrders() {
        setIsLoading(true);
        const response = await MasterService.getAllRepairOrders();
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
