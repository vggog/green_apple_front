import React from "react";
import classes from "./BriefInfoRepairOrder.module.css"
import { useNavigate } from "react-router-dom";


function BriefInfoRepairOrders(props) {
    const navigate = useNavigate();

    var repairOrder = props.repairOrder;
    var date = new Date(repairOrder.created_at);

    function redirectToRepairOrderInfo() {
        navigate("/repair_orders/" + repairOrder.id);
    }

    return (
        <div className={classes.briefInfoRepairOrder} onClick={redirectToRepairOrderInfo}>
            <strong>{repairOrder.id}. {repairOrder.phone_model}</strong>
            <div>Дата сдачи на ремонт: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</div>
            <div>Статус: {repairOrder.status}</div>
        </div>
    );
}

export default BriefInfoRepairOrders;
