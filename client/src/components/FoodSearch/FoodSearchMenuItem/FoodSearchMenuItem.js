import React, { useState, useContext, useEffect } from "react";

import { Link } from "react-router-dom";

// CSS
import "./FoodSearchMenuItem.css"

function FoodSearchMenuItem(props) {

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
                <h5><Link to={`/res/${props.resId}`}>{props.resName}</Link></h5>
                <h5>{props.name} - ${props.price}</h5>
                <p>{props.description}</p>
            </div>
            <div className={`MenuItem-Buttons col-12 col-sm-12 col-xl-2`}>
            </div>
        </div>
        </>

    )
}   

export default FoodSearchMenuItem;