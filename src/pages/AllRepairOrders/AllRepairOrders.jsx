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
    const [error, setError] = useState("");

    async function GetAllRepairOrders() {
        setIsLoading(true);
        const response = await RepairOrderService.getAllRepairOrders();
        try {
            if (response.status === 200) {
                const rawRepairOrders = response.data;
                setRepairOrders(rawRepairOrders.filter((item) => item.status !== "Выдан клиенту"));
            } else if (response.status === 401) {
                setError("Токен устарел, перезайдите в учётную запись.");
            } else {
                setError("Произошла ошибка сервера.")
            }
        } catch {
            setError("Произошла ошибка сервера.");
        }
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
    } else if (error) {
        return (
            <div>{error}</div>
        )
    } else if (repairOrders.length === 0) {
        return (
            <div className={classes.allRepairOrders}>
                <h1 style={{"textAlign": "center"}}>Все заказы на ремонт</h1>
                <hr />
                <MyButton onClick={redirectToAddRepairOrder}>Создать заказ</MyButton>
                <div>Список заказов пуст.</div>
            </div>
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
