import React, { useState } from "react";
import cl from './CreateMaster.module.css'
import PhoneNumberInput from "../../components/UI/PhoneNumberForm/PhoneNumberForm";
import { isValidPassword } from "../../utils/utils";
import MasterService from "../../services/MasterService";
import { useNavigate } from "react-router-dom";
import { deleteChapters } from "../../utils/phoneNumber";


function CreateMaster() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState()

    function allInfoEntered() {
        return name && surname && phone && (isValidPassword(password) && password == repeatPassword)
    }

    async function AddNewMaster(e) {
        e.preventDefault();

        const phoneWithoutChapters = deleteChapters(phone)

        const newMaster = {
            "name": name,
            "surname": surname,
            "phone": phoneWithoutChapters,
            "password": password,
        }

        setIsLoading(true);
        const response = await MasterService.addNewMaster(newMaster);
        try {
            const updatedMaster = response.data;
            if (response.status === 401) {
                setError("Токен устарел, перезайдите в учётную запись.");
            }
            navigate("/admin/master/all");
        } catch (TypeError) {
            setError("Ошибка сервера.");
        } finally {
            setIsLoading(false);
        }
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
                {error && <div>{error}</div>}
            </form>
        </div>
    )
}


export default CreateMaster;
