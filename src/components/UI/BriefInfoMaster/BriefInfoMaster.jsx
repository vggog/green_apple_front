import React from "react";
import classes from "./BriefInfoMaster.module.css"
import { useNavigate } from "react-router-dom";


function BriefMasterInfo(props) {
    const navigate = useNavigate();

    function redirectToMasterInfoPage() {
        navigate("/admin/master/" + props.master.id)
    }
    
    return (
        <div className={classes.briefInfoMaster} onClick={() => {redirectToMasterInfoPage()}}>
            <strong>{props.master.id}. {props.master.surname} {props.master.name}</strong>
        </div>
    );
};


export default BriefMasterInfo;
