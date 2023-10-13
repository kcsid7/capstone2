import React, {useContext, useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
 

import CartListItem from "./CartListItem/CartListItem.js";
import OrderForm from "../OrderForm/OrderForm.js";
import TipCalculator from "../utilComponents/TipCalculator/TipCalculator.js";
import TaxCalculator from "../utilComponents/TaxCalculator/TaxCalculator.js";

import currencyFormatter from "../../helpers/currencyFormatter.js";

import "./Cart.css"

function Cart({cart}) {

    
    const cartItems = cart.map( c => <CartListItem key={c.itemId} cartItem={c} />);

    // Calculate total price for items in cart
    let cartTotalPrice = 0;
    cart.forEach(i => cartTotalPrice += (i.quantity * i.itemPrice));
    //

    const [tip, setTip] = useState(0);
    const [tax, setTax] = useState(0);



    return (
        <div className="Cart" style={{display: `${cartTotalPrice === 0 ? "none" : ""}`}}>
            <div>
                <h2>Cart</h2>
                <ul className="Cart-List">
                    {cartItems} 
                </ul>
                <TaxCalculator total={cartTotalPrice} setTax={setTax} taxRate={6.25}/>
                <TipCalculator total={cartTotalPrice} setTip={setTip} />
                <h3 className="Cart-Total">{currencyFormatter(cartTotalPrice + tax + tip)}</h3>
                <OrderForm cart={cart} total={cartTotalPrice + tax + tip} tax={tax} tip={tip}/>
            </div>
        </div>
    )
}

export default Cart;