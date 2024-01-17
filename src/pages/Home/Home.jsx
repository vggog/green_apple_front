import React, { useState } from "react";
import classes from "./Home.module.css"
import StatusOfOrderForCustomer from "../../components/statusOfOrderForCustomer/statusOfOrderForCustomer";


function Home() {
    const [trackNumber, setTrackNumber] = useState("");
    const [isRendedingComponent, setIsRenderingComponent] = useState(false)

    return (
        <div className={classes.homePage}>
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
                Отследить
            </button>
            {
                isRendedingComponent &&
                <StatusOfOrderForCustomer repairOrderId={Number(trackNumber)} />
            }
        </div>
    )
}

export default Home;
