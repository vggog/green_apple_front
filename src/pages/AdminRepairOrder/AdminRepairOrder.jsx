import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasterService from "../../services/MasterService";
import classes from "./AdminRepairOrder.module.css"
import StatusChanged from "../../components/UI/StatusChanged/StatusChanged";


function AdminRepairOrder() {
    var response;
    const params = useParams();

    const [repairOrder, setRepairOrder] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    async function fetchRepairOrder() {
        setIsLoading(true);
        response = await MasterService.getRepairOrder(params.id);
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

    console.log(repairOrder)

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
            <StatusChanged statusChangedList={repairOrder.status_changes}/>
        </div>
    );
}

export default AdminRepairOrder;
