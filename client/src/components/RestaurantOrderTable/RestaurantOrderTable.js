import React, {useState} from "react";

import { Link } from "react-router-dom";


import "./RestaurantOrderTable.css"

import dateFormatter from "../../helpers/dateFormatter";
import currencyFormatter from "../../helpers/currencyFormatter";


function RestaurantOrderTable({orders, orderClicked}) {


    

    return(
        <div className="RestaurantOrderTable">
        <table className="RestaurantOrderTable-Table">
            <thead className="RestaurantOrderTable-Head">
                <tr>
                    <th>Order Number</th>
                    <th>Order Date</th>
                    <th>Customer Name</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody className="RestaurantOrderTable-Table-Body">
                {
                    orders.map(o => {
                        return (
                            <tr key={o.order_number} className="OrderHistoryTable-ItemRows">
                                <td><span className="OrderHistoryTable-OrderNumber" onClick={orderClicked}>{o.order_number}</span></td>
                                <td>{dateFormatter(o.order_date)}</td>
                                <td>{o.customer_name}</td>
                                <td>{currencyFormatter(o.total_price)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>

    )
}

export default RestaurantOrderTable;