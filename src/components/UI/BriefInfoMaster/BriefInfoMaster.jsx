import React from "react";
import classes from "./BriefInfoMaster.module.css"


function BriefMasterInfo(props) {
    
    return (
        <div className={classes.briefInfoMaster}>
            <strong>{props.master.id}. {props.master.surname} {props.master.name}</strong>
        </div>
    );
};


export default BriefMasterInfo;
