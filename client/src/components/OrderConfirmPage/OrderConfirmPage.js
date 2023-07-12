import React, {useState, useContext, useEffect } from "react";

import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import AppContext from "../../context/AppContext";

import currencyFormatter from "../../helpers/currencyFormatter";

import "./OrderConfirmPage.css";
 
function OrderConfirmPage() {

    const {id} = useParams();

    const { setError } = useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [orderDetails, setOrderDetails] = useState(null);

    console.log(location);

    useEffect(() => {
        if (!location.state) {
            setError({message: "Unauthorized", type: "failure"});
            navigate("/")
        } else {
            console.log("location.state not null")
            setOrderDetails(s => location.state.orderData)
        }
    }, [])

    
    const orderConfirmHTML = () => {
        return (
        <div>
            <Link to={`/res/${id}`}>Go Back to Restaurant</Link>
            <div>
                <h2>Order Details</h2>
                <h3>Order Number: {orderDetails.orderNumber}</h3>
                <h5>Order Date: {orderDetails.orderDate}</h5>
                <h5>Order Time: {orderDetails.orderTime}</h5>
                <ul style={{listStyle: "none"}}>
                    <h3>Customer Details</h3>
                    <li>Name: {orderDetails.customerName}</li> 
                    <li>Email: {orderDetails.customerEmail}</li>
                    <li>Phone: {orderDetails.customerPhone}</li>
                    <li>Address: {orderDetails.customerAddress}</li>
                </ul>
                <ul style={{listStyle: "none"}}>
                    {
                        orderDetails.items.map((d, i) => <li key={i}>{d.quantity} - {d.itemName} - {d.itemPrice} | {d.itemNotes} </li>)
                    }
                </ul>
                <h3>Total: {currencyFormatter(orderDetails.totalPrice)}</h3>
            </div>
        </div>
        )
    }


    return (
        orderDetails ? orderConfirmHTML(): <></>
    )
}

export default OrderConfirmPage;