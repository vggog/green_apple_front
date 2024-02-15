import React, { useState } from "react";
import PhoneNumberInput from "../../components/UI/PhoneNumberForm/PhoneNumberForm";
import classes from "./AddRepairOrder.module.css"
import RepairOrderService from "../../services/RepairOrderService";
import { useNavigate } from "react-router-dom";
import { getPhoneModels } from "../../utils/phoneModels";
import { getRecomendedDefects } from "../../utils/defects";


function AddRepairOrder() {
    const navigate = useNavigate();

    const [customerFullName, setCustomerFullName] = useState("");
    const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
    const [phoneModel, setPhoneModel] = useState("");
    const [imei, setIMEI] = useState("");
    const [defect, setDefect] = useState("");
    const [note, setNote] = useState("");

    const [recomendPhoneModels, setRecomendPhoneModels] = useState([]);
    const [autocompliteIsOpen, setAutocompliteIsOpen] = useState(false);

    const [recomendDeffects, setRecomendDeffects] = useState([]);
    const [isRecomendAutocomplite, setIsRecomendAutocomplite] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

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
        var repairOrder;
        try {
            repairOrder = response.data;
            if (response.status === 200 || response.status === 201) {
                navigate("/repair_orders/" + repairOrder.id);
            }
            if (response.status === 401) {
                setError("Токен устарел, перезайдите в учётную запись.");
            } 
        } catch (TypeError) {
            setError("Ошибка сервера");
        } finally {
            setIsLoading(false);
        }
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

    function presentPhoneModels(e) {
        setPhoneModel(e.target.value)

        if (e.target.value === "") 
        {
            setRecomendPhoneModels([]);
            setAutocompliteIsOpen(false);
        }
        else {
            const phoneModels = getPhoneModels(e.target.value);
            if (phoneModels.length === 0) {
                setAutocompliteIsOpen(false);
                return;
            }
            setRecomendPhoneModels(phoneModels);
            setAutocompliteIsOpen(true);
        }
    }

    function presentPhoneModelsClick(e) {
        setPhoneModel(e.target.textContent);
        setAutocompliteIsOpen(false);
    }

    function presentDefects(e) {
        setDefect(e.target.value);

        if (e.target.value === "") 
        {
            setRecomendDeffects([]);
            setIsRecomendAutocomplite(false);
        }
        else {
            const recDeffects = getRecomendedDefects(e.target.value);
            if (recDeffects.length === 0) {
                setIsRecomendAutocomplite(false);
                return;
            }
            setRecomendDeffects(recDeffects);
            setIsRecomendAutocomplite(true);
        }
    }

    function presentDefectsClick(e) {
        setDefect(e.target.textContent)
        setIsRecomendAutocomplite(false);
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
                    onChange={presentPhoneModels}
                    value={phoneModel}
                    type="text"
                    placeholder="Модель телефона"
                    className={classes.inputForm}
                />
                {
                    (autocompliteIsOpen) && 
                    <ul
                        className={classes.autoComplite}
                    >
                        {
                            recomendPhoneModels.map( (item) => 
                                <li 
                                    key={item} 
                                    className={classes.autoComplite_item}
                                    onClick={(e) => presentPhoneModelsClick(e)}
                                >{item}</li>
                            )
                        }
                    </ul>
                }
                <input 
                    onChange={(e) => setIMEI(e.target.value)}
                    value={imei}
                    type="text"
                    placeholder="IMEI"
                    className={classes.inputForm}
                />
                <input 
                    onChange={presentDefects}
                    value={defect}
                    type="text"
                    placeholder="Заявленная неисправность"
                    className={classes.inputForm}
                />
                {
                    (isRecomendAutocomplite) && 
                    <ul
                        className={classes.autoComplite}
                    >
                        {
                            recomendDeffects.map( (item) => 
                                <li 
                                    key={item} 
                                    className={classes.autoComplite_item}
                                    onClick={(e) => presentDefectsClick(e)}
                                >{item}</li>
                            )
                        }
                    </ul>
                } 
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
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}


export default AddRepairOrder;
