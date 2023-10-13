import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";

import * as jose from "jose";

// API
import restaurantAPI from "../../../api/restaurantAPI.js";
import orderAPI from "../../../api/orderAPI.js";

// Context
import RestaurantContext from "../../../context/RestaurantContext.js";
import UserContext from "../../../context/UserContext.js";
import AppContext from "../../../context/AppContext.js";

// Other Components
import MenuList from "../../Menus/MenuList/MenuList.js";
import NewMenuItem from "../../Menus/NewMenuItem/NewMenuItem.js";
import RestaurantOrderTable from "../../RestaurantOrderTable/RestaurantOrderTable.js"
import RestaurantOrderDetails from "../../RestaurantOrderDetails/RestaurantOrderDetails.js";
import RestaurantOrderDetailsEdit from "../../RestaurantOrderDetailsEdit/RestaurantOrderDetailsEdit.js";


// Util Files


// CSS File
import "./RestaurantEdit.css"
import RestaurantEditForm from "../RestaurantEditForm/RestaurantEditForm.js";

function RestaurantEdit() {

    const {id} = useParams();

    const navigate = useNavigate();


    const { localUser, token } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const [restaurant, setRestaurant] = useState(null);
    const [restaurantOrders, setRestaurantOrders] = useState(null);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [editOrder, setEditOrder] = useState(false);
    
    // Edit Nav State
    const [editNav, setEditNav] = useState("default");
    

    useEffect( () => {
        getRestaurantInfo(id);
        getRestaurantOrders(id);
    }, [])


    // Set Nav to the Default State
    function setNavDefault() {
        setEditNav(s => 'default')
    }


    // Set Nav to the specified type
    const setNavType = (type) => setEditNav(s => type);

    // Get Restaurant Info API
    async function getRestaurantInfo(resId) {
        const result = await restaurantAPI.getRestaurant(resId, true);
        setRestaurant(s => result);
    }

    // Get Restaurant Order Info
    async function getRestaurantOrders(resId) {
        restaurantAPI.token = token;
        const result = await restaurantAPI.getRestaurantOrders(resId);
        setRestaurantOrders(result);
    }


    // Delete Restaurant From API
    async function deleteRestaurant(resId) {

        restaurantAPI.token = token;
        const result = await restaurantAPI.deleteRestaurant(resId);
        setError({message: "Restaurant Removed", type: "success"});
        navigate(`/owner/${localUser}`);
    }

    // Restaurant Navigation Bar HTML Function
    const resNavHTML = () => {
        switch(editNav) {
            case 'add-menu-item':
                return (
                    <>
                        <h3>Add Menu Item Form</h3>
                    </>
                )
            case 'delete-restaurant':
                return (
                    <>
                        <h5>Are you sure?</h5>
                        <button className="RestaurantEdit-NavButton deleteBtn" onClick={() => deleteRestaurant(id)}>Delete Restaurant</button>
                        <button className="RestaurantEdit-NavButton greenBtn" onClick={() => setNavDefault()}>No</button>
                    </>
                )
            case 'edit-restaurant':
                return (
                    <>
                        <h5>Edit Restaurant </h5>
                        <button className="RestaurantEdit-NavButton greenBtn" onClick={() => setNavDefault()}>Back</button>
                        <button className="RestaurantEdit-NavButton deleteBtn" onClick={() => setEditNav(s => 'delete-restaurant')}>Delete Restaurant</button>
                    </>
                )

            case 'show-order-details':
                return (
                    <>
                        <button className="RestaurantEdit-NavButton defaultBtn" onClick={() => setEditNav(s => 'show-restaurant-orders')}>Back to Orders</button>
                        <button className="RestaurantEdit-NavButton greenBtn" onClick={() => setEditNav(s => 'edit-order-details')}>Edit Order</button>
                    </>
                )
            
            case 'edit-order-details':
                return (
                    <>
                        <h3>Edit Order Details</h3>
                        <button className="RestaurantEdit-NavButton defaultBtn" onClick={() => setEditNav(s => 'show-order-details')}>Cancel</button>
                    </>
                )
            
            default:
                return (
                    <>
                        <button className="RestaurantEdit-NavButton defaultBtn" onClick={() => {
                                editNav === 'show-restaurant-orders' ?
                                setEditNav(s => 'default')
                                : setEditNav(s => 'show-restaurant-orders')
                        }}>{`${editNav === 'show-restaurant-orders' ? "Hide Orders": "Show Orders"}`}</button>
                        <button className="RestaurantEdit-NavButton defaultBtn" onClick={() => setEditNav(s => 'add-menu-item')}>Add Menu Item</button>
                        <button className="RestaurantEdit-NavButton editBtn" onClick={() => setEditNav(s => 'edit-restaurant')}>Edit Restaurant</button>
                    </>
                )
        }
    }


    // Display Order Details From the RestaurantOrderTable component
    async function displayOrderDetails(e) {
        const oNum = e.target.innerText;
        const res = await orderAPI.getOrder(oNum);
        console.log(res);
        setCurrentOrder(res);
        setEditNav("show-order-details")
        
    }


    // Restaurant HTML Function
    const restaurantHTML = () => {
        // Check for correct user
        if (restaurant.owners.includes(localUser)) {
            const typeSet = new Set();
            restaurant.menu.forEach(i => typeSet.add(i.type));
            const typeArr = Array.from(typeSet).sort();

            const resMenuList = typeArr.map(m => <MenuList 
                                                    key={m} 
                                                    items={restaurant.menu.filter( i => i.type === m)} 
                                                    title={`${m}`}
                                                    edit={true}
                                                    />);

            const switchResHTML = () => {
                switch(editNav) {
                    case "show-order-details":
                        return (
                            <>
                                <RestaurantOrderDetails order={currentOrder} />
                            </>
                        )
                    case "edit-order-details": 
                        return (
                            <>
                                <RestaurantOrderDetailsEdit order={currentOrder} />
                            </>
                        )
                    case "show-restaurant-orders": 
                        return (
                            <>
                            {
                                restaurantOrders.length > 0 ?
                                <div className="RestaruantEdit-Orders col-md-9 col-xl-8">
                                    <RestaurantOrderTable orders={restaurantOrders} orderClicked={displayOrderDetails}/>
                                </div>
                                : <><h4 className="mt-4">No Orders Found</h4></>
                            }
                            </>
                        )
                    case "add-menu-item":
                        return (
                            <>
                            {
                                <div className="RestaruantEdit-NewItem col-md-9 col-xl-8">
                                    <NewMenuItem setNavDefault={setNavDefault} setNavType={setNavType} />
                                </div>
                            }
                            </>
                        )
                    case "edit-restaurant":
                        return (
                            <>
                            {
                                <div className="RestaruantEdit-NewItem col-md-9 col-xl-8">
                                    <RestaurantEditForm cancel={setNavDefault}/>
                                </div>
                            }
                            </>
                        )
                    default: 
                        return (
                            <>
                                <div className="RestaruantEdit-Menu col-md-12 col-xl-8">
                                    {
                                        resMenuList
                                    }
                                </div>
                            </>
                        )
                }
            }
            return (
                <>
                <div className="RestaruantEdit-Contents">
                    {/* Restaurant Header */}
                    <div className="RestaruantEdit-Admin-Nav-Header container">
                        <div className="RestaruantEdit-Header-Details">
                            <h1> {restaurant.name} </h1>
                            <h5>{restaurant.email}</h5>
                            <h5>{restaurant.phone}</h5>
                            <h5>{restaurant.streetAddress}, {restaurant.city}, {restaurant.state}, {restaurant.zipcode}</h5>
                        </div>
                    {/* Edit Nav */}
                    <nav className={`RestaruantEdit-Admin-Nav ${editNav === "delete-restaurant" ? "Delete-Bg": ""}`}>
                        {
                            resNavHTML()
                        }
                    </nav>
                    </div>

                    { switchResHTML() }
                    
                </div>
                </>
            )
            } else {
                console.log("Not an owner")
                setError({message: "Unauthorized", type: "failure"});
                navigate(`/owner/${localUser}`);
            }
    }


    return (
        <RestaurantContext.Provider value={{restaurant, setRestaurant}}>
            <div className="Restaruant">
                {
                    restaurant ?
                    restaurantHTML():
                    ""
                }
            </div>
        </RestaurantContext.Provider>
    )

} // end RestaurantEdit

export default RestaurantEdit;