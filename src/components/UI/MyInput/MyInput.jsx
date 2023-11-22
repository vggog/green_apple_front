import React from "react"
import classes from "./MyInput.module.css"


const MyInput = React.forwardRef((propes, ref) => {
    return (
        <input ref={ref} className={classes.myInput} {...propes}/>
    )
})


export default MyInput;
