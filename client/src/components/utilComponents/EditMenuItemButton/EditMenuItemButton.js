import React, {useState} from "react";

//MUI

import "./EditMenuItemButton.css"

function EditMenuItemButton({toggle, edit, deleteItem, updateItem}) {

    const editOffHTML = (
        <button 
            className="EditMenuItemButton" 
            onClick={toggle}>
                Edit Item
        </button>
    )
    
    const editOnHTML = (
        <div>
            <button 
                className="EditMenuItemButton Save-Button" 
                onClick={updateItem}>
                    Save
            </button>

            <button 
                className="EditMenuItemButton" 
                onClick={toggle}>
                    Cancel
            </button>

            <button 
                className="EditMenuItemButton Delete-Button" 
                onClick={deleteItem}>
                    Delete
            </button>
        </div>
    )

    return(
            edit ? 
            editOnHTML:
            editOffHTML
    )
}

export default EditMenuItemButton;