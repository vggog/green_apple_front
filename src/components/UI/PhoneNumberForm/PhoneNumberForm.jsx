import React from "react";

import { getPhoneNumber, changePhoneNumber } from "../../../utils/phoneNumber";


function PhoneNumberInput({phoneNumber, setPhoneNumber, ...props}) {
    return (
        <div>
            <input 
                onChange={(e) => setPhoneNumber(getPhoneNumber(e.target.value, e))}
                value={getPhoneNumber(phoneNumber)}
                type="tel"
                placeholder="номер телефона"
                maxLength={18}
                {...props}
            />
        </div>
    )
}


export default PhoneNumberInput;
