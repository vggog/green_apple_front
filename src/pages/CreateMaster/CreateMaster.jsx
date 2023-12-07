import React, { useState } from "react";
import cl from './CreateMaster.module.css'
import PhoneNumberInput from "../../components/UI/PhoneNumberForm/PhoneNumberForm";
import { isValidPassword } from "../../utils/utils";
import MasterService from "../../services/MasterService";
import { useNavigate } from "react-router-dom";


function CreateMaster() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    function allInfoEntered() {
        return name && surname && phone && (isValidPassword(password) && password == repeatPassword)
    }

    async function AddNewMaster(e) {
        e.preventDefault();

        const newMaster = {
            "name": name,
            "surname": surname,
            "phone": phone,
            "password": password,
        }

        setIsLoading(true);
        const response = await MasterService.addNewMaster(newMaster);
        const updatedMaster = response.data;
        console.log(updatedMaster);
        setIsLoading(false);
        navigate("/admin/master/all");
    }
    
    return (
        <div className={cl.createMaster}>
            <form className={cl.masterForm}>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    placeholder="Имя"
                    className={cl.inputForm} 
                />
                <input
                    onChange={(e) => setSurname(e.target.value)}
                    value={surname}
                    type="text"
                    placeholder="Фамилия"
                    className={cl.inputForm} 
                />
                <PhoneNumberInput
                    phoneNumber={phone} 
                    setPhoneNumber={setPhone}
                    className={cl.inputForm}
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Пароль"
                    className={cl.inputForm} 
                />
                {password && !isValidPassword(password) && <label style={{'color': 'red', 'fontSize': '12px'}}>Пароль должен быть больше 8 символов</label>}
                <input
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    value={repeatPassword}
                    type="password"
                    placeholder="Повторить пароль"
                    className={cl.inputForm} 
                />
                {(password) && (password !== repeatPassword) && <label style={{'color': 'red', 'fontSize': '12px'}}>Пароли должны совпадать</label>}
                {isLoading
                    ? <div>Загрузка...</div>
                    : <button className={cl.addMasterButton} disabled={!allInfoEntered()} onClick={AddNewMaster}>
                        Добавить
                    </button>
                }
            </form>
        </div>
    )
}


export default CreateMaster;
