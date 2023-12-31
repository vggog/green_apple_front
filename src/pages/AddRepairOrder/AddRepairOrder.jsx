import React, { useState } from "react";
import PhoneNumberInput from "../../components/UI/PhoneNumberForm/PhoneNumberForm";
import classes from "./AddRepairOrder.module.css"
import RepairOrderService from "../../services/RepairOrderService";
import { useNavigate } from "react-router-dom";


function AddRepairOrder() {
    const navigate = useNavigate();

    const [customerFullName, setCustomerFullName] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [phoneModel, setPhoneModel] = useState("");
    const [imei, setIMEI] = useState("");
    const [defect, setDefect] = useState("");
    const [note, setNote] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    async function sendDataToBackEnd(e) {
        e.preventDefault();

        const repairOrderData = {
            "customer_full_name": customerFullName,
            "customer_phone_number": customerPhoneNumber,
            "phone_model": phoneModel,
            "imei": imei,
            "defect": defect,
            "note": note,
        }

        setIsLoading(true);
        const response = await RepairOrderService.addRepairOrder(repairOrderData);
        console.log(response)
        const repairOrder = response.data;
        setIsLoading(false);

        navigate("/repair_orders/" + repairOrder.id);
    }

    function inputAllData() {
        return (
            customerFullName &&
            customerPhoneNumber &&
            phoneModel &&
            imei &&
            defect 
        )
    }

    if (isLoading) {
        return (
            <div>
                Загрузка...
            </div>
        )
    }

    return (
        <div className={classes.addRepairOrder}>
            <form className={classes.addRepairOrderForm}>
                <input 
                    onChange={(e) => setCustomerFullName(e.target.value)}
                    value={customerFullName}
                    type="text"
                    placeholder="Ф.И.О."
                    className={classes.inputForm}
                />
                <PhoneNumberInput
                    phoneNumber={customerPhoneNumber} 
                    setPhoneNumber={setCustomerPhoneNumber}
                    className={classes.inputForm}
                />
                <input 
                    onChange={(e) => setPhoneModel(e.target.value)}
                    value={phoneModel}
                    type="text"
                    placeholder="Модель телефона"
                    className={classes.inputForm}
                />
                <input 
                    onChange={(e) => setIMEI(e.target.value)}
                    value={imei}
                    type="text"
                    placeholder="IMEI"
                    className={classes.inputForm}
                />
                <input 
                    onChange={(e) => setDefect(e.target.value)}
                    value={defect}
                    type="text"
                    placeholder="Заявленная неисправность"
                    className={classes.inputForm}
                />
                <input 
                    onChange={(e) => setNote(e.target.value)}
                    value={note}
                    type="text"
                    placeholder="Примечание"
                    className={classes.inputForm}
                /> 

                <button 
                    className={classes.addRepairOrderBtn} 
                    disabled={!inputAllData()} 
                    onClick={sendDataToBackEnd}
                >
                    Добавить
                </button>
            </form>
        </div>
    )
}


export default AddRepairOrder;
