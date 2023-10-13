import React, { useState, useContext, useEffect } from "react";


//Custom Hooks
import useComponentDidUpdate from "../../../hooks/useComponentDidUpdate";

import CartContext from "../../../context/CartContext";

import CountButton from "../../utilComponents/CountButton/CountButton";

// CSS
import "./MenuItem.css"

function MenuItem(props) {

    const {cart, addToCart} = useContext(CartContext);


    const [quantity, setQuantity] = useState(0);

    const toggleCount = (val) => {
        if (val === "UP") {
            setQuantity(c => c + 1);
        } else if (val === "DOWN") {
            setQuantity(c => c - 1);
        }
    }
 

    useComponentDidUpdate(() => {
        addToCart(
            {
                itemId: props.id,
                itemName: props.name, 
                quantity: quantity, 
                itemPrice: props.price,
                itemTotal: quantity * props.price,
                itemDescription: props.description
            })
    }, [quantity]);
    
    
   let menuItemImage = props.image;

    return (
        <>
        <div className="MenuItem container row">
            <div className={`MenuItem-Image col-12 col-sm-12 col-xl-2`}>
                {
                    menuItemImage ?
                    <img 
                        className="MenuItem-Image-Img" 
                        src={menuItemImage}/>
                    : ""
                }
            </div>
            <div className={`MenuItem-Details col-12 col-sm-12 col-xl-8`}>
                <h5>{props.name} - ${props.price}</h5>
                <p>{props.description}</p>
            </div>
            <div className={`MenuItem-Buttons col-12 col-sm-12 col-xl-2`}>
                <div><CountButton count={quantity} toggleCount={toggleCount}/></div>
            </div>
        </div>
        </>

    )
}   

export default MenuItem;