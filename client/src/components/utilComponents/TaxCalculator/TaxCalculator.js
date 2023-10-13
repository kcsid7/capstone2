import React, { useState, useEffect } from "react";

import currencyFormatter from "../../../helpers/currencyFormatter";

import "./TaxCalculator.css"


function TaxCalculator({total, setTax, taxRate}) {

    useEffect(() => {
        setTax(x => (total * (1/100)* taxRate))
    })

    return(
        <>
            <div className="TaxCalculator">
                <h6>Tax ({taxRate}%)</h6>
                <h6>{currencyFormatter(total * (1/100)* taxRate)}</h6>
            </div>
        </>
    )
}

export default TaxCalculator