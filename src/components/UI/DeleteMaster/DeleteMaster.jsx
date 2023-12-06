import React, { useState } from "react";
import cl from "./DeleteMaster.module.css"
import { useNavigate } from "react-router-dom";
import MasterService from "../../../services/MasterService";


function DeleteMaster({setVisible, masterID}) {

    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    async function deleteMaster() {
        try {
            setIsDeleting(true);
            const response = await MasterService.deleteMaster(masterID);
        } catch (e) {
            console.log(e);
        } finally {
            setIsDeleting(false);
            navigate("/admin/master/all")
        }
    }

    return (
        <div className={cl.deleteMaster}>
            <h3>Вы хотите удалить мастера?</h3>
            {isDeleting
                ? <div>Загрузка...</div>
                : <div className={cl.deleteMasterBtns}>
                      <button className={cl.deleteMasterButton} onClick={() => setVisible(false)}>
                          Нет
                      </button>
                      <button className={cl.deleteMasterButton} onClick={deleteMaster}>
                          Да
                      </button>
                  </div>
            }
        </div>
    )
}


export default DeleteMaster;
