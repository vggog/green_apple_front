import React, {useEffect, useState} from "react";
import classes from "./MasterInfo.module.css"
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import MasterService from "../../services/MasterService";
import { isValidPassword } from "../../utils/utils";
import PhoneNumberInput from "../../components/UI/PhoneNumberForm/PhoneNumberForm";
import { getPhoneNumber, deleteChapters } from "../../utils/phoneNumber";
import { useNavigate } from "react-router-dom";


function MasterInfo() {
    const params = useParams();
    const navigate = useNavigate();

    const [master, setMaster] = useState({});
    const [phone, setPhone] = useState("");
    const [isUpdatingLoading, setIsUpdatingLoading] = useState(false)

    const [newPassword, setNewPassword] = useState("");
    const [repeatNewPassword, setRepeatNewpassword] = useState("");

    const [fetchMaster, isLoading, masterError] = useFetching(async () => {
        const response = await MasterService.getMasterInfo(params.id);
        setMaster(response.data);
        setPhone(response.data.phone);
    });

    useEffect(() => {
        fetchMaster()
    }, []);

    if (isLoading) {
        return (
            <div>Загрузка</div>
        );
    };

    function chancgedPasswordIsCorrect() {
        return (newPassword && repeatNewPassword) && (newPassword === repeatNewPassword) && isValidPassword(newPassword)
    }

    function isChangedPhone() {
        return !(phone && master.phone && (getPhoneNumber(phone) === getPhoneNumber(master.phone)))
    }

    function hasChanges() {
        return (
            chancgedPasswordIsCorrect() && !isChangedPhone()
            ||
            isChangedPhone() && (!newPassword && !repeatNewPassword)
            ||
            isChangedPhone() && chancgedPasswordIsCorrect()
        )   
    }

    async function sendUpdatedInfo(e) {
        e.preventDefault();

        const updatedInfo = {};
        if (chancgedPasswordIsCorrect()) {
            updatedInfo.password = newPassword;
        }

        if (isChangedPhone()) {
            updatedInfo.phone = deleteChapters(phone);
        }

        if (updatedInfo){
            try {
                setIsUpdatingLoading(true);
                const response = await MasterService.updateMasterInfo(updatedInfo, params.id);
                const updatedMaster = {
                    ...response.data, 
                    id: params.id
                }
                setMaster(updatedMaster);
                setPhone(updatedMaster.phone);
            } catch (e) {
                console.log(e);
            } finally {
                setIsUpdatingLoading(false);
                setNewPassword("");
                setRepeatNewpassword("");
            }
        }
    }

    return (
        <div className={classes.masterInfo}>
            <h3>Информация о мастере</h3>
            <p><b>id:</b> {master.id}</p>
            <p><b>Фамилие имя:</b> {master.surname} {master.name}</p>
            <div>
                <div>Номер телефона:</div>
                <PhoneNumberInput 
                    phoneNumber={phone} 
                    setPhoneNumber={setPhone}
                    className={classes.phoneNumberInput}
                />
            </div>
            <div>
                <pre>
                    <input
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        type="password"
                        placeholder="Новый пароль"
                        className={classes.phoneNumberInput}
                    />
                    <br></br>
                    {newPassword && !isValidPassword(newPassword) && <label style={{'color': 'red'}}>Пароль слишком короткий</label>}
                </pre>
                <pre>
                    <input
                        onChange={(e) => setRepeatNewpassword(e.target.value)}
                        value={repeatNewPassword}
                        type="password"
                        placeholder="Повторить пароль"
                        className={classes.phoneNumberInput}
                    />
                    <br></br>
                    {(newPassword || repeatNewPassword) && (newPassword !== repeatNewPassword) && <label style={{'color': 'red'}}>Пароли должны совпадать</label>}
                </pre>
            </div>
            {isUpdatingLoading
                ? <div>Загрузка...</div>
                : <button className={classes.updateBtn} disabled={!hasChanges()} onClick={sendUpdatedInfo}>Обновить</button> 
            }
        </div>
    )
}


export default MasterInfo;
