import React from "react";
import classes from "./BriefInfoRepairOrder.module.css"


function BriefInfoRepairOrders(props) {

    var repairOrder = props.repairOrder;

    var date = new Date(repairOrder.created_at);

    return (
        <div className={classes.briefInfoRepairOrder}>
            <strong>{repairOrder.id}. {repairOrder.phone_model}</strong>
            <div>Дата сдачи на ремонт: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</div>
            <div>Статус: {repairOrder.status}</div>
        </div>
    );
}

export default BriefInfoRepairOrders;
