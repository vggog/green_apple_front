import React, { useEffect, useState } from "react";
import classes from "./statusOfOrderForCustomer.module.css"
import CustomerService from "../../services/CustomerService";


function StatusOfOrderForCustomer({repairOrderId}) {
    const [repairOrder, setRepairOrder] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [serviceError, setServiceError] = useState("");

    async function fetchRepairOrder() {
        var response;
        setIsLoading(true);
        response = await CustomerService.fetchRepairOrder(repairOrderId);
        if (response.status === 200) {
            setRepairOrder(response.data);
        } else if (response.status === 404) {
            setServiceError("Заказ на ремонт с таким трек-номером не найден.");
        } else {
            setServiceError("Произошла ошибка.");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRepairOrder()
    }, [])

    if (isLoading) {
        return (
            <div>
                Загрузка...
            </div>
        )
    }

    if (serviceError) {
        return (
            <div className={classes.statusOfOrder}>
                {serviceError}
            </div>
        )
    }

    var createdAtDate = new Date(repairOrder.created_at);
    var updatedAtDate = new Date(repairOrder.updated_at);

    return (
        <div className={classes.statusOfOrder}>
            <p>Статус заказа: {repairOrder.status}</p>
            <p>Дата сдачи на ремонт: {createdAtDate.getDate()}.{createdAtDate.getMonth() + 1}.{createdAtDate.getFullYear()}</p>
            <p>Дата обновления статуса: {updatedAtDate.getDate()}.{updatedAtDate.getMonth() + 1}.{updatedAtDate.getFullYear()}</p>
        </div>
    )
}


export default StatusOfOrderForCustomer;
