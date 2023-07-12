import React, {useContext, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
 

import CartListItem from "./CartListItem/CartListItem.js";
import OrderForm from "../OrderForm/OrderForm.js";

import currencyFormatter from "../../helpers/currencyFormatter.js";

import "./Cart.css"

function Cart({cart}) {

    
    const cartItems = cart.map( c => <CartListItem key={c.itemId} cartItem={c} />);

    // Calculate total price for items in cart
    let totalPrice = 0;
    cart.forEach(i => totalPrice += (i.quantity * i.itemPrice));

    //

    return (
        <div className="Cart" style={{display: `${totalPrice === 0 ? "none" : ""}`}}>
            <div>
                <h2>Cart</h2>
                <ul className="Cart-List">
                    {cartItems} 
                </ul>
                <h3 className="Cart-Total">{currencyFormatter(totalPrice)}</h3>
                <OrderForm cart={cart} total={totalPrice}/>
            </div>
        </div>
    )
}

export default Cart;