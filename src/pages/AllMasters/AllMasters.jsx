import React, { useEffect, useState } from "react";
import classes from "./AllMasters.module.css";
import BriefMasterInfo from "../../components/UI/BriefInfoMaster/BriefInfoMaster";
import MasterService from "../../services/MasterService";
import { useFetching } from "../../hooks/useFetching";


function AllMasters() {
    const [masters, setMasters] = useState([]);

    const [fetchMasters, isLoading, masterError] = useFetching(async () => {
        const response = await MasterService.getAllMasters();
        setMasters(response.data);
    })

    useEffect(() => {
        fetchMasters()
    }, [])

    if (isLoading) {
        return (
            <div>Загрузка</div>
        )
    }

    if (!masters.length) {
        return (
            <h1>Список мастеров пуст.</h1>
        )
    }

    return (
        <div className={classes.allMasters}>
            <h1>Все мастера</h1>
            {
                masters.map( (master) => 
                    <BriefMasterInfo key={master.id} master={master} />
                 )
            }
        </div>
    );
};


export default AllMasters;
