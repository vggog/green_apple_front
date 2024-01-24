import React from "react";
import classes from "./StatusChanged.module.css"


function StatusChanged({statusChangedList}) {

    if (!statusChangedList) {
        return (
            <div>

            </div>
        )
    }

    function getDate(rowDate) {
        const date = new Date(rowDate);
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    }

    function getMasterLink(master) {
        return "/admin/master/" + master.id;
    }

    return (
        <div>
            <ul className={classes.statusChangedList}>
                {
                    statusChangedList.map( (item) =>
                        <li
                            key={statusChangedList.indexOf(item)}
                            className={classes.statusChangedList_item}
                        >{item.status} | {getDate(item.created_at)} | <a className={classes.toMasterLink} href={getMasterLink(item.master)}>{item.master.surname} {item.master.name}</a></li>
                    )
                }
            </ul>
        </div>
    );
}

export default StatusChanged;
