import React, { useEffect, useState } from "react";
import classes from "./RepairOrder.module.css"
import RepairOrderService from "../../services/RepairOrderService";
import { useParams } from "react-router-dom";


function RepairOrder() {
    const params = useParams();

    const [repairOrder, setRepairOrder] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function fetchRepairOrder() {
        setIsLoading(true);
        const response = await RepairOrderService.fetchRepairOrder(params.id);
        setRepairOrder(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRepairOrder()
    }, [])

    if (isLoading) {
        return (
            <div>Загрузка...</div>
        )
    }

    var createdAtDate = new Date(repairOrder.created_at);
    var updatedAtDate = new Date(repairOrder.updated_at);

    return (
        <div className={classes.repairOrderInfo}>
            <strong>{repairOrder.id}. {repairOrder.phone_model}</strong>
            <p>Имя владельца: {repairOrder.customer_full_name}</p>
            <p>Номер телефона владельца: {repairOrder.customer_phone_number}</p>
            <p>Дата сдачи на ремонт: {createdAtDate.getDate()}.{createdAtDate.getMonth() + 1}.{createdAtDate.getFullYear()}</p>
            <p>Дата обновления статуса: {updatedAtDate.getDate()}.{updatedAtDate.getMonth() + 1}.{updatedAtDate.getFullYear()}</p>
            <p>IMEI: {repairOrder.imei}</p>
            <p>Дефект: {repairOrder.defect}</p>
            { repairOrder.note && <p>Примечание: {repairOrder.note}</p> }
            <p>Статус: {repairOrder.status}</p>
        </div>
    )
}


export default RepairOrder;
