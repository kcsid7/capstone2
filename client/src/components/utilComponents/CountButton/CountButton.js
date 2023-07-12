import React, {useState} from "react";

//MUI

import "./CountButton.css"

function CountButton({count, toggleCount}) {

    return(
        <div className="CountButton">
            <button 
                className="CountButton-Increase CountButton-Button" 
                onClick={() => toggleCount("UP")}>+</button>
            <input 
                type="text" 
                readOnly
                value={count} 
                style={{backgroundColor: `${(count > 0) ? "lightgreen" : "white"}`}}
                className="CountButton-Count CountButton-Button"/>
            <button 
                className="CountButton-Decrease CountButton-Button" 
                disabled={count <= 0}
                onClick={() => toggleCount("DOWN")}>-</button>
        </div>
    )
}

export default CountButton;