import React, {useState, useContext} from "react";
import { useParams } from "react-router-dom";

import {Card, CardActions, CardContent, CardMedia, Button, Typography, TextField } from "@mui/material"

import useFormData from "../../../hooks/useFormData";

import RestaurantContext from "../../../context/RestaurantContext";
import UserContext from "../../../context/UserContext";
import AppContext from "../../../context/AppContext";


import EditMenuItemButton from "../../utilComponents/EditMenuItemButton/EditMenuItemButton";

import restaurantAPI from "../../../api/restaurantAPI";


import "./EditMenuItem.css" 

function EditMenuItem(props) {

    const {id:resId} = useParams();
    const {id:itemId, name, price, description, type, image} = props;

    const initialValues = {
        name: name || "", 
        price: price || "", 
        description: description || "", 
        type: type || "", 
        image: image || ""
    }

    const {restaurant, setRestaurant} = useContext(RestaurantContext);
    const { token } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const [formData, updateForm] = useFormData(initialValues);

    const [editMode, setEditMode] = useState(false);

    const toggleEdit = () => {
        setEditMode(s => !s);
    }

    let menuItemImage = image; // Image


    // Make a request to the API to delete the menu item then pass it down as a prop to the menu item buttons
    async function deleteMenuItem() {
        restaurantAPI.token = token;
        const deletedItem = await restaurantAPI.removeMenuItem(resId, itemId);
        // Update restaurant state for the RestaurantEdit component
        const newRestState = {...restaurant, 
                            menu: 
                                [...restaurant.menu
                                        .filter(i => i.id !== deletedItem.id)]}
        setRestaurant(s => newRestState);
        setError({ message: "Menu Item Removed", type: "failure"})
    }

    async function updateMenuItem() {
        const updatedMenuItem = {
            ...formData,
            price: +formData.price

        }
        restaurantAPI.token = token;
        const {restaurant_id, ...updatedItem} = await restaurantAPI.updateMenuItem(resId, itemId, updatedMenuItem);
        
        const tempMenu = restaurant.menu.filter(i => i.id !== updatedItem.id);
        const updatedMenu = [...tempMenu, updatedItem];

        setRestaurant( st => {
            return {...st, menu: updatedMenu}
        })
        toggleEdit();
        setError({message: "Menu Item Updated!", type: "success"});
    }


    // Items to display when edit mode is OFF
    const dispItems = (
        <>
        <Typography gutterBottom variant="h5" component="div">
        {props.name} - ${props.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {props.description}
        </Typography>
        </>
    )

    // Items to display when edit mode is ON
    const editItems = (
        <>
        {/* <Typography gutterBottom variant="h5" component="div">
            ID: {props.id}
        </Typography> */}
        <TextField 
            className="EditMenuItem-Input" 
            id="name" 
            name="name"
            margin="normal"
            label="Name" 
            variant="outlined" 
            fullWidth
            value={formData.name}
            onChange={updateForm}/>
        <TextField 
            className="EditMenuItem-Input" 
            id="price" 
            name="price"
            margin="normal"
            label="Price" 
            variant="outlined" 
            fullWidth
            value={formData.price}
            onChange={updateForm}/>
        <TextField 
            className="EditMenuItem-Input" 
            id="type" 
            name="type"
            margin="normal"
            label="Type" 
            variant="outlined" 
            fullWidth
            value={formData.type}
            onChange={updateForm}/>
        <TextField 
            className="EditMenuItem-Input" 
            id="description" 
            name="description"
            margin="normal"
            label="Description" 
            variant="outlined"
            fullWidth
            value={formData.description}
            onChange={updateForm} 
            multiline={true}
            rows={3}/>
        <TextField 
            className="EditMenuItem-Input" 
            id="image" 
            name="image"
            margin="normal"
            label="Image" 
            variant="outlined"
            fullWidth
            value={formData.image}
            onChange={updateForm} 
            multiline={true}
            rows={3}/>
        </>
    )

    return (
        <>
        <div className="EditMenuItem container row">
            <div className="EditMenuItem-Image col-12 col-sm-12 col-xl-2">
                {
                    menuItemImage ?
                    <img 
                        className="EditMenuItem-Image-Img" 
                        src={menuItemImage}/>
                    : ""
                }
            </div>
            <div className="EditMenuItem-Details col-12 col-sm-12 col-xl-8">
                {
                    editMode ?
                    editItems :
                    dispItems
                }
            </div>
            <div className="EditMenuItem-Buttons col-12 col-sm-12 col-xl-2">
                <div>
                    <EditMenuItemButton 
                        toggle={toggleEdit} 
                        edit={editMode} 
                        deleteItem={deleteMenuItem} 
                        updateItem={updateMenuItem}
                    />
                </div>
            </div>
        </div>

        </>
    )
}

export default EditMenuItem;