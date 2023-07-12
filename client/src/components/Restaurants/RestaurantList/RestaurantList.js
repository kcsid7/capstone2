import React, { useState, useEffect } from "react";


import { Link } from "react-router-dom";

import "./RestaurantList.css"

import restaurantAPI from "../../../api/restaurantAPI.js";

import RestaurantCard from "../RestaurantCard/RestaurantCard.js";

function RestaurantList() {


    const [restaurants, setRestaurants] = useState(null);

    //Uses the restaurantAPI to GET all restaurants
    async function getRestaurants() {
        const result = await restaurantAPI.getAllRestaurants();
        setRestaurants(result);
    }

    useEffect(() => { getRestaurants() }, []);

    const restaurantCards = () => {
            return restaurants.map( r => <RestaurantCard key={r.id} restaurant={r} urlLink={r.id}/>)    
    }

    return (
        <div className="RestaurantList">
                {
                    restaurants ?
                    restaurantCards() :
                    ""
                }
        </div>
    )

}

export default RestaurantList;