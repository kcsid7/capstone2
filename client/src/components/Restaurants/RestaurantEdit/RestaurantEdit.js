import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";

// API
import restaurantAPI from "../../../api/restaurantAPI.js";

// Context
import RestaurantContext from "../../../context/RestaurantContext.js";
import UserContext from "../../../context/UserContext.js";
import AppContext from "../../../context/AppContext.js";

// Other Components
import MenuList from "../../Menus/MenuList/MenuList.js";
import NewMenuItem from "../../Menus/NewMenuItem/NewMenuItem.js";


// Util Files


// CSS File
import "./RestaurantEdit.css"
import RestaurantEditForm from "../RestaurantEditForm/RestaurantEditForm.js";

function RestaurantEdit() {

    const {id} = useParams();

    const navigate = useNavigate();



    const { localUser } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const [restaurant, setRestaurant] = useState(null);
    // Edit Nav State
    const [editNav, setEditNav] = useState("default");
    

    // Get Restaurant Info API
    async function getRestaurantInfo(resId) {
        const result = await restaurantAPI.getRestaurant(resId, true);
        setRestaurant(s => result);
    }


    // Delete Restaurant From API
    async function deleteRestaurant(resId) {
        const result = await restaurantAPI.deleteRestaurant(resId);
        setError({message: "Restaurant Removed", type: "success"});
        navigate(`/owner/${localUser}`);
    }


    useEffect( () => {
        getRestaurantInfo(id);
    }, [])

    function setNavDefault() {
        setEditNav(s => 'default')
    }


    const resNavHTML = () => {
        switch(editNav) {
            case 'add-menu-item':
                return (
                    <>
                        <h5>Add Menu Item </h5>
                    </>
                )
            case 'delete-restaurant':
                return (
                    <>
                        <h5>Are you sure?</h5>
                        <button className="greenBtn" onClick={() => setNavDefault()}>No</button>
                        <button className="deleteBtn" onClick={() => deleteRestaurant(id)}>Delete Restaurant</button>
                    </>
                )
            case 'edit-restaurant':
                return (
                    <>
                        <h5>Edit Restaurant </h5>
                        <button className="greenBtn" onClick={() => setNavDefault()}>Back</button>
                    </>
                )
            
            default:
                return (
                    <>
                        <button className="defaultBtn" onClick={() => setEditNav(s => 'add-menu-item')}>Add Menu Item</button>
                        <button className="editBtn" onClick={() => setEditNav(s => 'edit-restaurant')}>Edit Restaurant</button>
                        <button className="deleteBtn" onClick={() => setEditNav(s => 'delete-restaurant')}>Delete Restaurant</button>
                    </>
                )
        }
    }


    const restaurantHTML = () => {

        console.log("Restaurant", restaurant);
        // Check for correct user
        if (restaurant.owners.includes(localUser)) {
            console.log("Correct Restaurant")
            const typeSet = new Set();
            restaurant.menu.forEach(i => typeSet.add(i.type));
            const typeArr = Array.from(typeSet).sort();

            const resMenuList = typeArr.map(m => <MenuList 
                                                    key={m} 
                                                    items={restaurant.menu.filter( i => i.type === m)} 
                                                    title={`${m}`}
                                                    edit={true}
                                                    />);
            return (
                <>
                <div className="RestaruantEdit-Contents">
                    {/* Edit Nav */}
                    <div className="RestaruantEdit-Admin-Nav-Header container">
                        <h1> Edit {restaurant.name} </h1>
                        <div className="RestaruantEdit-Header-Details">
                            <h5>{restaurant.email}</h5>
                            <h5>{restaurant.phone}</h5>
                            <h5>{restaurant.streetAddress}, {restaurant.city}, {restaurant.state}, {restaurant.zipcode}</h5>
                        </div>
                        <nav className={`RestaruantEdit-Admin-Nav ${editNav === "delete-restaurant" ? "Delete-Bg": ""}`}>
                            {
                                resNavHTML()
                            }
                        </nav>
                    </div>
                    {/* New Menu Item */}
                    {
                    editNav === 'add-menu-item' ?
                    <div className="RestaruantEdit-NewItem col-md-9 col-xl-8">
                        <NewMenuItem setNavDefault={setNavDefault}/>
                    </div>
                    : <></>
                    }
                    {/* Edit Restaurant */}
                    {
                    editNav === 'edit-restaurant' ?
                    <div className="RestaruantEdit-NewItem col-md-9 col-xl-8">
                    <RestaurantEditForm cancel={setNavDefault}/>
                    </div>
                    : <></>
                    }
                    {/* Restaurant Menu List */}
                    <div className="RestaruantEdit-Menu col-md-12 col-xl-8">
                        {
                            resMenuList
                        }
                    </div>
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