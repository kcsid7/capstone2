import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";

import useFormData from "../../../hooks/useFormData";

// Context
import RestaurantContext from "../../../context/RestaurantContext";

import restaurantAPI from "../../../api/restaurantAPI";

import "./NewMenuItem.css"


function NewMenuItem({setNavDefault}) {

    const {id:resId} = useParams();

    const {restaurant, setRestaurant} = useContext(RestaurantContext);

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
    }

    // const generateOptionsHTML = () => {
    //     const typeSet = new Set();
    //     restaurant.menu.forEach(i => typeSet.add(i.type));
    //     const typeArr = Array.from(typeSet).sort();
    //     const optionsHTML = typeArr.map(i => <option key={i} value={i}>{i}</option>)
    //     return (
    //         <>
    //             <option default value="">*-Select-*</option>
    //             {optionsHTML}
    //             <option value="generate-New-Type-">*-New-*</option>
    //         </>
    //     )
    // }

    // function checkForType() {
    //     if (formData.type === "generate-New-Type-") {
    //         // toggleNewType(s => !s);
    //     }
    // }

    // checkForType();

    return (
        <div className="NewMenuItemForm">
            <h2>New Menu Item Form</h2>
            <form className="NewMenuItemForm-Form" onSubmit={handleSubmit}>
                <div className="NewMenuItemForm-Input">
                    <label htmlFor="name">Name</label>
                    <input required type="text" id="name" name="name" value={formData.name} onChange={updateForm}/>
                </div>
                <div className="NewMenuItemForm-Input">
                    <label htmlFor="price">Price</label>
                    <input required type="text" id="price" name="price" value={formData.price} onChange={updateForm}/>
                </div>
                {/* {
                    newType 
                    ?
                    <div className="NewMenuItemForm-Input">
                        <label htmlFor="type">Type</label>
                        <input required type="text" id="type" name="type" value={formData.type} onChange={updateForm}/>
                    </div>
                    :
                    <div className="NewMenuItemForm-Input">
                    <label htmlFor="type">Type</label>
                    <select type="text" id="type" name="type" value={formData.type} onChange={updateForm}>
                        {generateOptionsHTML()}
                    </select>
                    </div>
                } */}

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