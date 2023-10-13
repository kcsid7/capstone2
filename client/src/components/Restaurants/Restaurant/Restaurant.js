import React, { useState, useEffect } from "react";
import {useParams, Link, useNavigate} from "react-router-dom";

import restaurantAPI from "../../../api/restaurantAPI.js";

import CartContext from "../../../context/CartContext.js";

import MenuList from "../../Menus/MenuList/MenuList.js";
import Cart from "../../Cart/Cart.js";

import "./Restaurant.css"

function Restaurant() {

    const navigate = useNavigate();

    const {id} = useParams();


    const [restaurant, setRestaurant] = useState(null);
    const [cart, updateCart] = useState([])


    //Get Restaurant Info API
    async function getRestaurantInfo(resId) {
        try {
            const result = await restaurantAPI.getRestaurant(resId);
            setRestaurant(result);
        } catch(e) {
            console.log("Restaurant.js - Can't Find Restaurant", e)
            navigate("*");
        }
    }

    useEffect( () => {
        getRestaurantInfo(id);
    }, [])


    // Add to cart takes an object {name: "Pizza", qty: 1, price: 20, id: 1}
    // If object quantity is 0, then remove item from cart
    // If object is already in the cart then update with the latest value
    // Otherwise add new object to cart
    const addToCart = (obj) => {
        if (!obj.itemNotes) obj.itemNotes = "";
        
        if (obj.quantity === 0) {
            const removedItem = cart.filter( item => item.itemName !== obj.itemName);
            updateCart( c => [...removedItem])
        } else {
            const itemInCart = cart.find( item => item.itemName === obj.itemName);
            if (itemInCart) {
                obj.itemNotes = itemInCart.itemNotes;
                const filteredCart = cart.filter( item => item.itemName !== obj.itemName);
                updateCart( c => [...filteredCart, obj])
            } else {
                updateCart(c => [...c, obj]);
            }
        }
    }

    const restaurantHTML = () => {

        const typeSet = new Set();

        restaurant.menu.forEach(i => typeSet.add(i.type));

        const typeArr = Array.from(typeSet).sort();

        const resMenuList = typeArr.map(m => <MenuList 
                                                key={m} 
                                                items={restaurant.menu.filter( i => i.type === m)} 
                                                title={`${m} Menu`}/>);


        return (
            <>
            <div className="Restaruant-Contents row">  
                <div className={`Restaurant-Menu ${cart.length > 0 ? 'col-md-12 col-xl-8' : 'col-12'}`}>
                    <h1> {restaurant.name} </h1>
                    <div className="Restaruant-Contents-Header">
                        <h5>Phone: {restaurant.phone} </h5>
                        <h5>Email: {restaurant.email} </h5>
                        <h5>Address: {restaurant.streetAddress}, {restaurant.city}, {restaurant.state}, {restaurant.zipcode}</h5>
                    </div>
                    {
                        resMenuList
                    }
                </div>
                <div className={`Restaruant-Cart col-md-9 col-xl-4`}>
                    <Cart cart={cart}/>
                </div>
            </div>
            </>
        )
    }


    return (
        <CartContext.Provider value={{cart, addToCart, updateCart}}>
        <div className="Restaurant container-fluid">
            {
                restaurant ?
                restaurantHTML():
                ""
            }
        </div>
        </CartContext.Provider>
    )

}

export default Restaurant;