import React, { useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

import useFormData from "../../hooks/useFormData";

import generateOrderNumber from "../../helpers/generateOrderNumber"; 
import getCurrentDateAndTime from "../../helpers/getCurrentDateAndTime";

import restaurantAPI from "../../api/restaurantAPI";

// Context
import UserContext from "../../context/UserContext";
import AppContext from "../../context/AppContext";

import { secretGuestCustomer } from "../../config";

import "./OrderForm.css"

function OrderForm({cart, total}) {

    const {id} = useParams();
    const navigate = useNavigate();

    const { currentUser, localUser, token } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const initialData = {
        name: currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "",
        phone: currentUser ? currentUser.phone : "",
        email: currentUser ? currentUser.email : "",
        streetAddress: currentUser ? currentUser.address.streetAddress : "",
        city: currentUser ? currentUser.address.city : "",
        state: currentUser ? currentUser.address.state : "",
        zipcode: currentUser ? currentUser.address.zipcode : "",
    };


    const [formData, updateForm, resetForm] = useFormData(initialData)
    /*
    OrderFormData
    const orderData = {
        ...formData,
        order: cart,
        totalPrice: total
    }
    */
   
    const placeOrder = async (resId, data) => await restaurantAPI.placeOrder(resId, data); 

    function handleSubmit(e) {
        e.preventDefault();
        
        // In instances when we don't have a logged in user, we will use this secret user //
        const guestCustomer = secretGuestCustomer();
        //*************//

        const oNum = generateOrderNumber();
        const [curDate, curTime] = getCurrentDateAndTime();

        const orderData = {
            orderNumber: oNum,
            orderDate: curDate,
            orderTime: curTime,
            totalPrice: total,
            customerName: formData.name,
            customerId: localUser ? localUser : guestCustomer,
            customerEmail: formData.email,
            customerPhone: formData.phone,
            customerAddress: `${formData.streetAddress}, ${formData.city}, ${formData.state}, ${formData.zipcode}`,
            items: cart
        }

        const order = placeOrder(id, orderData);

        resetForm(s => initialData);
        
        setError({message: "Order Placed", type: "success"});
        navigate(`/res/${id}/order/confirm`, {state: {orderData}}); // Navigate to the order confirmed page
    }

    return (
        <div className="OrderForm">
            <form className="Order-Form" onSubmit={handleSubmit}>
                <div className="Order-Form-Field">
                    <label htmlFor="name">Name</label>
                    <input required type="text" name="name" id="name" value={formData.name} onChange={updateForm}/>
                </div>
                <div className="Order-Form-Field">
                    <label htmlFor="phone">Phone</label>
                    <input required type="text" name="phone" id="phone" value={formData.phone} onChange={updateForm}/>
                </div>
                <div className="Order-Form-Field">
                    <label htmlFor="email">Email</label>
                    <input required type="text" name="email" id="email" value={formData.email} onChange={updateForm}/>
                </div>
                <div className="Order-Form-Field">
                    <label htmlFor="streetAddress">Street Address</label>
                    <input required type="text" name="streetAddress" id="streetAddress" value={formData.streetAddress} onChange={updateForm}/>
                </div>
                <div className="Order-Form-Field">
                    <label htmlFor="city">City</label>
                    <input required type="text" name="city" id="city" value={formData.city} onChange={updateForm}/>
                </div>
                <div className="Order-Form-Field">
                    <label htmlFor="state">State</label>
                    <input required type="text" name="state" id="state" value={formData.state} onChange={updateForm}/>
                </div>
                <div className="Order-Form-Field">
                    <label htmlFor="zipcode">Zip Code</label>
                    <input required type="text" name="zipcode" id="zipcode" value={formData.zipcode} onChange={updateForm}/>
                </div>
                <button 
                    className="Order-Form-Btn">
                    Order
                </button>
            </form>
        </div>
    )
}

export default OrderForm;