import { useEffect, useState } from "react";
import React from "react";
import RepairOrderService from "../../services/RepairOrderService";
import BriefInfoRepairOrders from "../../components/UI/BriefInfoRepairOrders/BriefInfoRepairOrder";
import classes from "./AllRepairOrders.module.css"
import MyButton from "../../components/UI/MyButton/MyButton"
import { useNavigate } from "react-router-dom";


function AllRepairOrders() {
    const navigate = useNavigate();

    const [repairOrders, setRepairOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function GetAllRepairOrders() {
        setIsLoading(true);
        const response = await RepairOrderService.getAllRepairOrders();
        setRepairOrders(response.data);
        setIsLoading(false);
    }

    function redirectToAddRepairOrder() {
        navigate("/repair_orders/add");
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
            <MyButton onClick={redirectToAddRepairOrder}>Создать заказ</MyButton>
            {
                repairOrders.map( (repairOrder) => 
                    <BriefInfoRepairOrders key={repairOrder.id} repairOrder={repairOrder} />
                )
            }
        </div>
    )
} 

export default AllRepairOrders;
