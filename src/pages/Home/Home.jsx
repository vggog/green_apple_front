import React, { useState } from "react";
import classes from "./Home.module.css"
import StatusOfOrderForCustomer from "../../components/statusOfOrderForCustomer/statusOfOrderForCustomer";

import telegram_logo from "../../img/telegram_logo.png"
import whatsapp_logo from "../../img/whatsapp_logo.png"


function Home() {
    const [trackNumber, setTrackNumber] = useState("");
    const [isRendedingComponent, setIsRenderingComponent] = useState(false)

    return (
        <div className={classes.homePage}>
            <h1 className={classes.head_of_title}>СТАТУС РЕМОНТА</h1>
            <p>Для проверки статуса ремонта Вашего устройства укажите Ваш номер заказа:</p>
            <input 
                className={classes.trackInputForm}
                onChange={(e) => {
                    e.preventDefault()

                    setIsRenderingComponent(false)
                    setTrackNumber(e.target.value.replace(/\D/g, ""))
                }
            }
                value={trackNumber}
                placeholder="Номер заказа"
                type="text"
            />  
            <button 
                disabled={trackNumber === ""} 
                className={classes.trackBtn}
                onClick={() => setIsRenderingComponent(true)}
            >
                Проверить статус
            </button>
            {
                isRendedingComponent &&
                <StatusOfOrderForCustomer repairOrderId={Number(trackNumber)} />
            }
            <hr className={classes.divider}/>
            <div className={classes.contactsForCommunication}>
                <p><strong>Мы ремонтируем:</strong></p>
                <p>Apple</p>
                <p>Samsung</p>
                <p>Xiaomi</p>
                <p>Huawei</p>
                <p>Honor</p>
                <p>Realme</p>
                <p>Google</p>
                <p>OPPO</p>
                <p>Tecno</p>
                <p>infinix</p>
            </div>
            <hr className={classes.divider}/>
            <div className={classes.contactsForCommunication}>
                <img className={classes.iconStyle} src={whatsapp_logo} />
                <img className={classes.iconStyle} src={telegram_logo} />
                <p><strong>+7 987 107-43-49</strong></p>
                <p><strong>+7 917 434-52-48</strong></p>
                <p><strong>+7 905 359-74-98</strong></p>
                <p>с.Раевский ул.Коммунистическая 94 ТЦ Купецъ 3 этаж</p>
            </div>
            <hr className={classes.divider}/>
            <div className={classes.contactsForCommunication}>
                <p>ИП Кагарманов Тимур Радифович</p>
                <p>ИНН: 020205351676</p>
            </div>
            <hr className={classes.divider}/>
            <div className={classes.footnote}>
                <p>
                    2024 Сервисный центр Green Apple официальное обслуживание, качественный ремонт.
                    Информация на сайте не является публичной офертой и носит исключительно информационный характер.
                </p>
            </div>
        </div>
    )
}

export default Home;
