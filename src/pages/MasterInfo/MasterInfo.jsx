import React, {useEffect, useState} from "react";
import classes from "./MasterInfo.module.css"
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import MasterService from "../../services/MasterService";


function MasterInfo() {
    const params = useParams();

    const [master, setMaster] = useState({});
    const [phone, setPhone] = useState("");

    const [fetchMaster, isLoading, masterError] = useFetching(async () => {
        const response = await MasterService.getMasterInfo(params.id);
        setMaster(response.data);
        setPhone(response.data.phone);
    })

    useEffect(() => {
        fetchMaster()
    }, [])

    if (isLoading) {
        return (
            <div>Загрузка</div>
        )
    }

    return (
        <div className={classes.masterInfo}>
            <h3>Информация о мастере</h3>
            <p><b>id:</b> {master.id}</p>
            <p><b>Фамилие имя:</b> {master.surname} {master.name}</p>
            <div>
                <div>Номер телефона:</div>
                <input
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    type="text"
                    placeholder="Номер телефона"
                    className={classes.phoneNumberInput}
                />
            </div>
        </div>
    )
}


export default MasterInfo;
