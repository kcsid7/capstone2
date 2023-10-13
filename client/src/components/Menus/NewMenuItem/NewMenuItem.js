import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import useFormData from "../../../hooks/useFormData";

// Context
import RestaurantContext from "../../../context/RestaurantContext";
import UserContext from "../../../context/UserContext";
import AppContext from "../../../context/AppContext";

import restaurantAPI from "../../../api/restaurantAPI";

import "./NewMenuItem.css"


function NewMenuItem({setNavDefault, setNavType}) {

    const {id:resId} = useParams();

    const {restaurant, setRestaurant} = useContext(RestaurantContext);
    const { token } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    // const [newType, toggleNewType] = useState(false);

    const initialFormData = {
        name: "",
        price: "",
        type: "",
        description: "",
        image: ""
    }

    const [formData, updateForm, setFormData] = useFormData(initialFormData)


    async function addItemToRestaurant(rId, item) {
        restaurantAPI.token = token;
        const {restaurant_id, ...newItem} = await restaurantAPI.addMenuItem(rId, item);
        return newItem;
    }


    async function handleSubmit(e) {
        e.preventDefault();
        const newMenuItem = {
            ...formData
        }
        const newItem = await addItemToRestaurant(resId, newMenuItem);
        setRestaurant( resT => ({
            ...resT,
            menu: [...resT.menu, newItem]
        }));
        setFormData(initialFormData);
        setError({message: `New Item Added!`, type: "success"});
        setNavType("show-restaurant-menu");
    }

    return (
        <div className="NewMenuItemForm">
            <form className="NewMenuItemForm-Form" onSubmit={handleSubmit}>
                <div className="NewMenuItemForm-Input">
                    <label htmlFor="name">Name</label>
                    <input required type="text" id="name" name="name" value={formData.name} onChange={updateForm}/>
                </div>
                <div className="NewMenuItemForm-Input">
                    <label htmlFor="price">Price</label>
                    <input required type="text" id="price" name="price" value={formData.price} onChange={updateForm}/>
                </div>


                <div className="NewMenuItemForm-Input">
                    <label htmlFor="type">Type</label>
                    <input required type="text" id="type" name="type" value={formData.type} onChange={updateForm}/>
                </div>
                <div className="NewMenuItemForm-Input">
                    <label htmlFor="description">Description</label>
                    <textarea required type="text" id="description" name="description" value={formData.description} onChange={updateForm}/>
                </div>
                <div className="NewMenuItemForm-Input">
                    <label htmlFor="image">Image</label>
                    <input required type="text" id="image" name="image" value={formData.image} onChange={updateForm}/>
                </div>
                <button 
                    className="NewMenuItemForm-AddBtn" 
                    type="submit"
                    disabled={!Object.values(formData).every(d => d !== "")}
                    >
                    Add
                </button>
                <button 
                    type="button" 
                    className="NewMenuItemForm-AddBtn"
                    onClick={(e) => setNavDefault()}
                    >
                    Cancel
                </button>
            </form>
        </div>
    )
}

export default NewMenuItem;