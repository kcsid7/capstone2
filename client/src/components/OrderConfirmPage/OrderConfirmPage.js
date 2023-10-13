import React, {useState, useContext, useEffect } from "react";

import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

import AppContext from "../../context/AppContext";

import currencyFormatter from "../../helpers/currencyFormatter";
import timeFormatter from "../../helpers/timeFormatter";

import "./OrderConfirmPage.css";
 
function OrderConfirmPage() {

    const {id} = useParams();

    const { setError } = useContext(AppContext);

    const location = useLocation();
    const navigate = useNavigate();

    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        if (!location.state) {
            setError({message: "Unauthorized", type: "failure"});
            navigate("/")
        } else {
            console.log("location.state not null")
            setOrderDetails(s => location.state.orderData)
            console.log(location.state.orderData);
        }
    }, [])

    
    const orderConfirmHTML = () => {

        function orderItemsHTML(item, key) {
            return (
                <div key={key} className="OrderConfirmPage-OrderDetails-OrderItem">
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
        <div>
            <div className="OrderConfirmPage">
                <h1>Order Confirmed</h1>
                <Link to={`/res/${id}`}>Go Back to Restaurant</Link>
                <div className="OrderConfirmPage-Body">
                    <div className="OrderConfirmPage-Body-Header">
                        <h3>{orderDetails.orderNumber}</h3>
                        <h5>{orderDetails.orderDate} | {timeFormatter(orderDetails.orderTime)}</h5>
                    </div>
                    <div className="OrderConfirmPage-Body-Customer">
                        <h3>Name: {orderDetails.customerName}</h3> 
                        <h6>Email: {orderDetails.customerEmail}</h6>
                        <h6>Phone: {orderDetails.customerPhone}</h6>
                        <h6>Address: {orderDetails.customerAddress}</h6>
                    </div>
                </div>

                <div className="OrderConfirmPage-Body-Items">
                    <ul style={{listStyle: "none"}}>
                        {
                            orderDetails.items.map((d, i) => orderItemsHTML(d, i))
                        }
                        <h5>{currencyFormatter(orderDetails.totalPrice - orderDetails.tax - orderDetails.tip)}</h5>
                    </ul>

                    <div className="d-flex OrderConfirmPage-Body-Items-PriceGroup">
                        <div>
                            <h5>Tax : {currencyFormatter(orderDetails.tax)}</h5>
                            <h5>Tip : {currencyFormatter(orderDetails.tip)}</h5>
                        </div>
                        <h3 className="OrderConfirmPage-TotalPrice">{currencyFormatter(orderDetails.totalPrice)}</h3>
                    </div>

                </div>
            </div>
        </div>
        )
    }


    return (
        orderDetails ? orderConfirmHTML(): <></>
    )
}

export default OrderConfirmPage;