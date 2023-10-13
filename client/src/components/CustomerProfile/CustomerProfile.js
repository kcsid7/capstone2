import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";


import UserContext from "../../context/UserContext";
import AppContext from "../../context/AppContext";

import OrderHistoryTable from "../OrderHistoryTable/OrderHistoryTable";
import CustomerOrderDetails from "../CustomerOrderDetails/CustomerOrderDetails";
import EditCustomerProfile from "./EditCustomerProfile/EditCustomerProfile";

import "./CustomerProfile.css";
import orderAPI from "../../api/orderAPI";
import customerAPI from "../../api/customerAPI";


function CustomerProfile() {

    const { username } = useParams();

    const navigate = useNavigate();

    const { currentUser, token, localUser, setCurrentUser } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const [customer, setCustomer] = useState(null);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [display, setDisplay] = useState("order-history-table");

    
    useEffect( function checkForUser() {
        const navigateToHome = () => navigate("/");

        if (!(localUser || !(localUser === username))) {
            setError({message: "Unauthorized", type: "failure"})
            navigateToHome();
            return
        }

        const getCustomerInfo = async () => {
            try {
                customerAPI.token = token;
                let res = await customerAPI.getCustomer(username);
                setCustomer(res);
                setCurrentUser(res);
            } catch(e) {
                console.log("CustomerProfile.js - getCustomerOrders", e);
                setError({message: e.response.data.message, type: "failure"})
                navigateToHome();
            }
        }
        getCustomerInfo();
        }, [localUser])

    
    async function getCustomerOrderDetails(e) {
        // console.log(oNum);
        const oNum = e.target.innerText;
        orderAPI.token = token;
        const order = await orderAPI.getOrder(oNum);
        setCurrentOrder(order);
        setDisplay(s => "order-details")
    }

    function backToTable() {
        setDisplay(s => "order-history-table");
        setCurrentOrder(null);
    }


    async function updateCustomer(username, data) {
        customerAPI.token = token;
        const res = await customerAPI.updateCustomer(username, data)
        const addressObj = {
            streetAddress: res.address,
            city: res.city,
            state: res.state,
            zipcode: res.zipcode
        }
        setCustomer(s => (
            {
                ...s, 
                firstName: res.first_name,
                lastName: res.last_name,
                phone: res.phone,
                email: res.email,
                address: addressObj
            }
            ))
    }

    const customerProfileHTML = (cus) => {

        const displayHTML = () => {
            switch(display) {
                case "order-details":
                    return (
                        <>
                            <CustomerOrderDetails 
                                order={currentOrder}
                                backToTable={backToTable}
                            />
                        </>
                    )
                case "order-history-table":
                    return (
                        <div className="CustomerProfile">
                            {
                                cus.orders.length > 0 ?
                                <>
                                    <h3>Order History</h3>  
                                    <OrderHistoryTable 
                                        orders={cus.orders} 
                                        orderClicked={getCustomerOrderDetails} 
                                    />
                                </>
                                : 
                                <>
                                    <h3>No Orders Yet</h3>  
                                </>
                            }
                        </div>
                    )
                case "update-customer-profile":
                    return (
                        <>
                            <EditCustomerProfile customer={customer} cancel={backToTable} updateCustomer={updateCustomer}/>
                        </>
                    )
                default:
                    return (
                        <>
                        
                        </>
                    )

            }
        }


        return (
            <>
                <div className="Customer-Profile-Header">                    
                    <h1>{cus.firstName} {cus.lastName}'s Profile</h1>
                    <button onClick={() => setDisplay(s => "update-customer-profile")}>Edit</button>
                </div>
                { displayHTML() }
            </>
        )
    }


    return (customer ? customerProfileHTML(customer) : <></>)
}

export default CustomerProfile;