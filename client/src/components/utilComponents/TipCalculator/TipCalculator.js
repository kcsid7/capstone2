import React, { useState, useEffect } from "react";

import currencyFormatter from "../../../helpers/currencyFormatter";

import "./TipCalculator.css"


function TipCalculator({total, setTip}) {

    const [customTip, setCustomTip] = useState(0);

    useEffect(() => {
        if (total === 0) {
            setCustomTip(s => 0);
            setTip(s => 0);
        }
    })


    function calculateTip(tipTotal, percentage) {
        const tip = +(tipTotal * (1/100) * percentage).toFixed(2);
        setTip(s => tip);
        setCustomTip(s => tip);
    }

    function handleInputChange(e) {
        const tipNum = + e.target.value;
        setCustomTip(s => tipNum);
        setTip(s => tipNum);
    }

    return(
        <>
            <div className="TipCalculator">
                <div className="TipCalculator-Info">
                    <h6>Tip</h6>
                    <h6 className="TipCalculator-Info-Amount">{currencyFormatter(customTip)}</h6>
                </div>
                <div className="TipCalculator-ButtonGroup">
                    <button onClick={() => calculateTip(total, 12)}>12%</button>
                    <button onClick={() => calculateTip(total, 15)}>15%</button>
                    <button onClick={() => calculateTip(total, 18)}>18%</button>
                    <input className="TipCalculator-CustomTip" onChange={handleInputChange} name="custom-tip" value={customTip}></input>
                </div>
            </div>
        </>
    )
}

export default TipCalculator