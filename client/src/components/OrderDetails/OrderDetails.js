import React, { useState, useContext, useEffect } from "react";

import { Link, useParams, useNavigate } from "react-router-dom";


import UserContext from "../../context/UserContext";
import AppContext from "../../context/AppContext";

import orderAPI from "../../api/orderAPI";

import timeFormatter from "../../helpers/timeFormatter";
import currencyFormatter from "../../helpers/currencyFormatter";

import "./OrderDetails.css";


function OrderDetails() {

    const {oNum} = useParams();
    
    const navigate = useNavigate();

    const { localUser, token } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const [order, setOrder ] = useState(null)



    useEffect( () => {

        if (!(token && localUser)) {
            setError({message: "Unauthorized", type:"failure"});
            navigate("/");
            return
        }

        async function getOrder(num) {
            console.log("getOrder")
            if (!order) {
                try {
                    const orderResp = await orderAPI.getOrder(num);
                    setOrder(orderResp);
                } catch (e) {
                    console.log(e);
                    return {
                        error: "Error"
                    }
                }
            }
        }
        getOrder(oNum);
    
    }, [])


    const orderDetailHTML = () => {

        const { orderNumber, orderDate, orderTime, totalPrice,
                customer, items, restaurantId, restaurantName} = order;

        console.log(order);

        function orderItemsHTML(item, key) {
            return (
                <div key={key} className="OrderDetails-OrderItem">
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
            <div className="OrderDetails container">
                <div className="OrderDetails-Header">
                    <h2 className="WhiteFont">Order Details</h2>
                    <h6>{orderNumber}</h6>
                    <h6>{orderDate} - {timeFormatter(orderTime)}</h6>
                </div>
                <div className="OrderDetails-Body row">
                    <div className="OrderDetails-Body-Restaurant col-12 col-md-5">
                        <h3 className="WhiteFont">Ordered From</h3>
                        <h6><Link className="WhiteFont" to={`/res/${restaurantId}`}>{restaurantName}</Link></h6>
                    </div>  
                    <div className="OrderDetails-Body-Customer col-12 col-md-5">
                            <h3 className="WhiteFont">Customer Details</h3>
                            <h6>{customer.customerName}</h6> 
                            <h6>{customer.email}</h6>
                            <h6>{customer.phone}</h6>
                            <h6>{customer.address}</h6>
                    </div>
                </div>
                <div className="OrderDetails-Body-Items">
                    <ul style={{listStyle: "none"}}>
                        {
                            items.map((d, i) => orderItemsHTML(d, i))
                        }
                    </ul>
                    <h3 className="OrderDetails-TotalPrice">{currencyFormatter(totalPrice)}</h3>
                </div>
            </div>
        )
    }

    return (
        order ? orderDetailHTML() : <></>
    )
}

export default OrderDetails;