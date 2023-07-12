import React, { useState } from "react";

import { Link } from "react-router-dom";

import "./RestaurantCard.css"

function RestaurantCard({restaurant, urlLink}) {

    const {name, streetAddress, city, state, phone, email, id} = restaurant;

    return (
        <>
        <div className="RestaurantCard">
            <h2><Link to={`/res/${urlLink}`}>{name}</Link></h2>
            <h4>{streetAddress}</h4>
            <h4>{city}, {state}</h4>
            <h6>{phone}</h6>
            <h6>{email}</h6>
        </div>
        </>
    )
}

export default RestaurantCard;