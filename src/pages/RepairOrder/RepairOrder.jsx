import React, { useEffect, useState } from "react";
import classes from "./RepairOrder.module.css"
import RepairOrderService from "../../services/RepairOrderService";
import { useParams } from "react-router-dom";
import api from "../../http";


function RepairOrder() {
    var response;
    const params = useParams();

    const [repairOrder, setRepairOrder] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatingLoading, setIsUpdatingLoading] = useState(false);
    const [isFetchFileLoading, setIsFetchFileLoading] = useState(false);

    const [error, setError] = useState("");

    const [statusOfRepairOrder, setStatusOfRepairOrder] = useState("");

    var statuses = ["Принят на ремонт", "Ремонтируется", "Готов", "Выдан клиенту"]

    async function fetchRepairOrder() {
        setIsLoading(true);
        try {
            response = await RepairOrderService.fetchRepairOrder(params.id);
            if (response.status === 200) {
                setRepairOrder(response.data);
                setStatusOfRepairOrder(response.data.status);
            } else if (response.status === 401) {
                setError("Токен устарел, перезайдите в учётную запись.");
            }
        } catch (TypeError) {
            setError("Ошибка сервера.")
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchRepairOrder()
    }, [])

    if (isLoading) {
        return (
            <div>Загрузка...</div>
        )
    }

    if (error) {
        return (
            <div>{error}</div>
        )
    }

    var createdAtDate = new Date(repairOrder.created_at);
    var updatedAtDate = new Date(repairOrder.updated_at);

    async function updateRepairOrderStatus(e) {
        e.preventDefault();

        setIsUpdatingLoading(true);
        try {
            response = await RepairOrderService.updateRepairOrderStatus(params.id, {"status": statusOfRepairOrder});
            if (response.status === 200) {
                setRepairOrder(response.data);
                setStatusOfRepairOrder(response.data.status);
            } else if (response.status === 401) {
                setError("Токен устарел, перезайдите в учётную запись.");
            }
        } catch (TypeError) {
            setError("Ошибка сервера при обновление статуса");
        } finally {
            setIsUpdatingLoading(false);
        }
    }

    async function getReceiptFile() {
        setIsFetchFileLoading(true);
        try {
            await RepairOrderService.getReceiptFile(params.id).then(response => {

                const href = URL.createObjectURL(response.data, {type: 'application/pdf'});
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', 'Квитанция ' + params.id + '.pdf');
                document.body.appendChild(link);
                link.click();
            
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
            }).catch( async (error) => {
                const originalConfig = error.config;

                if (error.response) {
                    if (error.response.status === 401 && !originalConfig._retry) {
                        var url = originalConfig.url;
        
                        if (url.slice(url.length - "refresh".length) === "refresh") {
                            setError("Токен устарел, перезайдите в учётную запись.");
                        }
        
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
        
                    return error.response;
                }
            })
        } catch (TypeError) {
            setError("Ошибка сервера при получение квитанции");
        } finally {
            setIsFetchFileLoading(false)
        }
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
