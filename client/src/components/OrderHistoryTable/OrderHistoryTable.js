import React, {useState} from "react";

import { Link } from "react-router-dom";


import "./OrderHistoryTable.css"

import dateFormatter from "../../helpers/dateFormatter";
import currencyFormatter from "../../helpers/currencyFormatter";


function OrderHistoryTable({orders, orderClicked}) {

    return(
        <table className="OrderHistoryTable">
            <thead className="OrderHistoryTable-Head">
                <tr>
                    <th>Order Number</th>
                    <th>Order Date</th>
                    <th>Vendor Name</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody className="OrderHistoryTable-Body">
                {
                    orders.map(o => {
                        return (
                            <tr key={o.order_number} className="OrderHistoryTable-ItemRows">
                                <td><span className="OrderHistoryTable-OrderNumber" onClick={orderClicked}>{o.order_number}</span></td>
                                <td>{dateFormatter(o.order_date)}</td>
                                <td>{o.name}</td>
                                <td>{currencyFormatter(o.total_price)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default OrderHistoryTable;