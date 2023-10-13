import React, {useEffect, useState, useContext} from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import UserContext from "../../context/UserContext";
import AppContext from "../../context/AppContext";


import RestaurantCard from "../Restaurants/RestaurantCard/RestaurantCard";


import NewRestaurantForm from "../Restaurants/NewRestaurantForm/NewRestaurantForm";
import EditOwnerProfile from "./EditOwnerProfile/EditOwnerProfile";


import ownerAPI from "../../api/ownerAPI";


import "./OwnerProfile.css"

function OwnerProfile() {

    //Params
    const { username } = useParams();

    const navigate = useNavigate();

    // Context used for API Call
    const { isOwner, token, localUser, setCurrentUser } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    
    const [owner, setOwner] = useState(null); // Owner Data that will populate the page
    const [nav, setNav] = useState("default"); // Nav State


    // useEffect to get owner info
    useEffect(function checkForOwner() {

        if (!localUser || !(localUser === username)) {
            setError({message: "Unauthorized", type: "failure"})
            navigate("/");
            return
        }

        const getOwnerInfo = async () => {
            try {
                ownerAPI.token = token;
                const data = await ownerAPI.getOwner(username)
                setOwner(data);
            } catch(e) {
                setError({message: e.response.data.message, type: "failure"})
                navigate("/");
            }
        }

        getOwnerInfo();
    }, [localUser])


    // Update Owner
    async function updateOwner(usrname, data) {
        const res = await ownerAPI.updateOwner(usrname, data);
        const addressObj = {
            streetAddress: res.address,
            city: res.city,
            state: res.state,
            zipcode: res.zipcode
        }
        setOwner(s => (
            {
                ...s, 
                firstName: res.first_name,
                lastName: res.last_name,
                phone: res.phone,
                email: res.email,
                address: addressObj
            }
            ))
    }



    // Owner Profile HTML
    const ownerProfileNavHTML = () => {
        switch(nav) {
            case 'add-new-restaurant': 
                return (
                    <>
                        <h3>New Restaurant Form</h3>
                    </>
                )
            
            case 'show-restaurant-list':
                return (
                    <>
                        <button className="OwnerProfile-NavButton" onClick={() => setNav(s => 'add-new-restaurant')}>Add New Restaurant</button>
                        <button className="OwnerProfile-NavButton" onClick={() => setNav(s => 'default')}>Back</button>
                    </>
                )

            case 'edit-profile':
                return (
                    <>
                        <h3>Edit Profile Form</h3>
                    </>
                )
            
            default:
                return (
                    <>
                        <button className="OwnerProfile-NavButton" onClick={() => setNav(s => 'add-new-restaurant')}>Add New Restaurant</button>
                        <button className="OwnerProfile-NavButton" onClick={() => setNav(s => 'show-restaurant-list')}>Show Restaurants</button>
                        <button className="OwnerProfile-NavButton" onClick={() => setNav(s => 'edit-profile')}>Edit Profile</button>
                    </>
                )
        }
    }


    const ownerProfileBody = (own) => {

        switch(nav) {
            case 'add-new-restaurant':
                return (
                    <NewRestaurantForm cancel={() => setNav('default')}/>
                )
            
            case 'show-restaurant-list':
                const resCards = () => {
                    return own.restaurants.map( r => <RestaurantCard key={r.restaurantid} restaurant={r} urlLink={r.restaurantid}/>)
                }
                return (
                    <>
                    {
                        own.restaurants.length > 0 ?
                        <div className="OwnerProfile-Restaurants">
                            <h2>Restaurant List</h2>  
                            {resCards()}
                        </div>
                        : 
                        <>
                            <h3>No Restaurants Yet</h3>
                            <button onClick={(() => setNav('add-new-restaurant'))}>New Restaurant Form</button>
                        </>
                    }
                    </>
                )

            case 'edit-profile':
                return (
                    <>
                        <EditOwnerProfile 
                            owner={own} 
                            updateOwner={updateOwner}
                            cancel={() => setNav('default')}/>
                    </>
                )

            
            
            default:
                return (
                    <>
                        <h2>Welcome {own.firstName}</h2>
                        <h5>{own.email}</h5>
                        <h5>{own.phone}</h5>
                        <h5>{own.address.streetAddress}</h5>
                        <h5>{own.address.city}, {own.address.state}, {own.address.zipcode}</h5>
                    </>
                )
        }
    }




    const ownerProfileHTML = (own) => {


        return (
            <div className="OwnerProfile">
                
                <div className="OwnerProfile-Header">
                    <nav className="OwnerProfile-Nav">
                        {
                            ownerProfileNavHTML()
                        }
                    </nav>
                </div>

                <div className="OwnerProfile-Body">
                    {
                        ownerProfileBody(own)
                    }
                </div>
            </div>
        )
    }


    return (owner ? ownerProfileHTML(owner) : <></>)
}

export default OwnerProfile;