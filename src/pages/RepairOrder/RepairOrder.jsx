import React, { useEffect, useState } from "react";
import classes from "./RepairOrder.module.css"
import RepairOrderService from "../../services/RepairOrderService";
import { useParams } from "react-router-dom";


function RepairOrder() {
    var response;
    const params = useParams();

    const [repairOrder, setRepairOrder] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatingLoading, setIsUpdatingLoading] = useState(false);
    const [isFetchFileLoading, setIsFetchFileLoading] = useState(false);

    const [statusOfRepairOrder, setStatusOfRepairOrder] = useState("");

    var statuses = ["Принят на ремонт", "Ремонтируется", "Готов", "Выдан клиенту"]

    async function fetchRepairOrder() {
        setIsLoading(true);
        response = await RepairOrderService.fetchRepairOrder(params.id);
        setRepairOrder(response.data);
        setStatusOfRepairOrder(response.data.status);
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

    async function updateRepairOrderStatus(e) {
        e.preventDefault();

        setIsUpdatingLoading(true);
        response = await RepairOrderService.updateRepairOrderStatus(params.id, {"status": statusOfRepairOrder});

        setRepairOrder(response.data);
        setStatusOfRepairOrder(response.data.status);
        setIsUpdatingLoading(false);
    }

    async function getReceiptFile() {
        setIsFetchFileLoading(true);
        await RepairOrderService.getReceiptFile(params.id).then(response => {

            const href = URL.createObjectURL(response.data, {type: 'application/pdf'});
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'Квитанция ' + params.id + '.pdf');
            document.body.appendChild(link);
            link.click();
        
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
        })
        setIsFetchFileLoading(false)
    }

    var indexOfStatus = statuses.indexOf(repairOrder.status);
    
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
            
            <p>Статус: <select defaultValue={repairOrder.status} onChange={(e) => setStatusOfRepairOrder(e.target.value)}>
                {
                    statuses.slice(0, indexOfStatus).map( (statusItem) => 
                        <option key={statuses.indexOf(statusItem)} value={statusItem}>{statusItem}</option>
                    )
                }
                <option disabled value={repairOrder.status}>{repairOrder.status}</option>
                {
                    statuses.slice(indexOfStatus + 1, ).map( (statusItem) => 
                        <option key={statuses.indexOf(statusItem)} value={statusItem}>{statusItem}</option>
                    )
                }
            </select></p>

            { 
            isUpdatingLoading ?
                <div>Загрузка...</div>
                
                : <button 
                    className={classes.updateStatusBtn} 
                    disabled={repairOrder.status === statusOfRepairOrder} 
                    onClick={updateRepairOrderStatus}
                >
                    Обновить статус
                </button> 
                
            }
            
            { 
            isFetchFileLoading ?
                <div>Загрузка...</div>
                
                : <button 
                    className={classes.updateStatusBtn} 
                    onClick={getReceiptFile}
                >
                    Загрузить квитанцию
                </button> 
                
            }
        </div>
    )
}


export default RepairOrder;
