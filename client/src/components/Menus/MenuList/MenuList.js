import React, { useState } from "react";

import MenuItem from "../MenuItem/MenuItem.js";
import EditMenuItem from "../EditMenuItem/EditMenuItem.js";

import "./MenuList.css" 

function MenuList({items, title, edit=false}) {


    // Menu Items
    const menuItems = items.map( i => {
            if (!edit) {
                return <MenuItem 
                            key={i.id} 
                            name={i.name}  
                            price={i.price} 
                            description={i.description} 
                            id={i.id} 
                            type={i.type}
                            image={i.image}
                            />
            } else {
                return <EditMenuItem 
                            key={i.id} 
                            name={i.name} 
                            price={i.price} 
                            description={i.description} 
                            id={i.id} 
                            type={i.type}
                            image={i.image}
                            />
            }
        });



    return (
        <div className="MenuList container">
            <h2>{title}</h2>
            <div className="MenuList-Menu">
                {menuItems.sort((a, b) => a.key - b.key)}
            </div>
        </div>
    )
}   

export default MenuList;