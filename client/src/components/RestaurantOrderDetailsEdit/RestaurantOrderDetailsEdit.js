import React, { useState, useContext, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";


import UserContext from "../../context/UserContext";
import AppContext from "../../context/AppContext";

import orderAPI from "../../api/orderAPI";
import getCurrentDateAndTime from "../../helpers/getCurrentDateAndTime";

import useFormData from "../../hooks/useFormData";

import timeFormatter from "../../helpers/timeFormatter";
import currencyFormatter from "../../helpers/currencyFormatter";


import "./RestaurantOrderDetailsEdit.css"


function RestaurantOrderDetailsEdit({order}) {


    const { localUser, token } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const navigate = useNavigate();

    
    const { orderNumber, orderDate, orderTime, totalPrice,
        customer, items, restaurantId, restaurantName, tax, tip} = order;

    const initialData = {
        customerName: customer.customerName,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        tip: tip
    }



    // Form Data Hook
    const [formData, updateForm, resetForm] = useFormData(initialData);


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const [curDate, curTime] = getCurrentDateAndTime();

            const updateFormData = {
                orderNumber: orderNumber,
                orderDate: curDate,
                orderTime: curTime,
                customerId: customer.customerId,
                customerName: formData.customerName,
                customerPhone: formData.phone,
                customerEmail: formData.email,
                customerAddress: formData.address,
                tip: formData.tip,
                tax: tax,
                totalPrice: totalPrice,
                items: items
            }
            orderAPI.token = token;
            const data = await orderAPI.updateOrder(orderNumber, updateFormData)
            navigate("/");
            setError({message: "Order Updated!", type: "success"})
            
        } catch(e) {
            console.log(e);
        }
    }


    const handleDelete = async (e) => {
        try {
            orderAPI.token = token;
            const data = await orderAPI.deleteOrder(orderNumber)
            navigate("/");
            setError({message: "Order Deleted!", type: "failure"})
        } catch(e) {
            console.log(e);
        }
    }
    

    const orderDetailHTML = () => {

        function orderItemsHTML(item, key) {
            return (
                <div key={key} className="Restaurant-OrderDetailsEdit-OrderItem">
                    <h5>{item.quantity} - {item.itemName} - {currencyFormatter(item.itemPrice)}</h5>
                    {
                        item.itemNotes ?
                        <h6>{item.itemNotes}</h6> : 
                        <></>
                    }
                </div>
            )
        }

        return (
            <div className="Restaurant-OrderDetailsEdit container">
                <form onSubmit={handleSubmit}>
                <div className="Restaurant-OrderDetailsEdit-Body">
                    <div className="Restaurant-OrderDetailsEdit-Header">
                        <h3>{orderNumber}</h3>
                        <h6>{orderDate} - {timeFormatter(orderTime)}</h6>
                    </div>
                    <div className="Restaurant-OrderDetailsEdit-Body-Customer">
                            {/* <h3>{customer.customerName}</h3>  */}
                            <input type="text" name="customerName" value={formData.customerName} onChange={updateForm}/>
                            {/* <h6>{customer.email}</h6> */}
                            <input type="text" name="email" value={formData.email} onChange={updateForm}/>
                            {/* <h6>{customer.phone}</h6> */}
                            <input type="text" name="phone" value={formData.phone} onChange={updateForm}/>
                            {/* <h6>{customer.address}</h6> */}
                            <input type="text" name="address" value={formData.address} onChange={updateForm}/>

                    </div>
                </div>
                <div className="Restaurant-OrderDetailsEdit-Body-Items">
                    <ul style={{listStyle: "none"}}>
                        {
                            items.map((d, i) => orderItemsHTML(d, i))
                        }
                        <h5>{currencyFormatter(totalPrice - tax - tip)}</h5>
                    </ul>

                    <div className="d-flex Restaurant-OrderDetailsEdit-PriceGroup">
                        <div className="Restaurant-OrderDetailsEdit-TaxTip">
                            <h5>Tax : {currencyFormatter(tax)}</h5>
                            <h5>Tip : {currencyFormatter(tip)}</h5>
                            {/* <h5>Tip : <input name="tip" id="Restaurant-OrderDetailsEdit-Tip" value={formData.tip} onChange={updateForm}/></h5> */}
                        </div>
                        <h3 className="Restaurant-OrderDetailsEdit-TotalPrice">{currencyFormatter(totalPrice + +formData.tip)}</h3>
                    </div> 
                    <div className="Restaurant-OrderDetailsEdit-ButtonGroup">
                        <button type="submit" className="Restaurant-OrderDetailsEdit-Update-Order">Update Order</button>
                        <button type="button" onClick={handleDelete} className="Restaurant-OrderDetailsEdit-Delete-Order">Delete Order</button>
                    </div>
                </div>
                </form>
            </div>
        )
    }


    return (
        <>
            { order ? orderDetailHTML() : <></> }
        </>
    )
}

export default RestaurantOrderDetailsEdit;