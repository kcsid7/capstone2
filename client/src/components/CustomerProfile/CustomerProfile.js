import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import customerAPI from "../../api/customerAPI";

import UserContext from "../../context/UserContext";
import AppContext from "../../context/AppContext";

import OrderHistoryTable from "../OrderHistoryTable/OrderHistoryTable";

import "./CustomerProfile.css";

function CustomerProfile() {

    const { username } = useParams();

    const navigate = useNavigate();

    const { currentUser, token, localUser, setCurrentUser } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const [customer, setCustomer] = useState(null);
    
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


    const customerProfileHTML = (cus) => {
        return (
        <div className="CustomerProfile">
            <h1>{cus.firstName} {cus.lastName}'s Profile</h1>
            {
                cus.orders.length > 0 ?
                <>
                    <h3>Order History</h3>  
                    <OrderHistoryTable orders={cus.orders}/>
                </>
                : 
                <>
                    <h3>No Orders Yet</h3>  
                </>
            }
        </div>
        )
    }


    return (customer ? customerProfileHTML(customer) : <></>)
}

export default CustomerProfile;