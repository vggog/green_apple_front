import React from "react";
import classes from "./MyButton.module.css"


const MyButton = React.forwardRef((props, ref) => {
    return (
        <button ref={ref} className={classes.myButton} {...props} />
    );
})


export default MyButton;
