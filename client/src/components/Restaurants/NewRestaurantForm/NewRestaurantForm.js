import React, {useContext} from "react";

import { useNavigate } from "react-router-dom";

import useFormData from "../../../hooks/useFormData";

import restaurantAPI from "../../../api/restaurantAPI";


import AppContext from "../../../context/AppContext";
import UserContext from "../../../context/UserContext";

import "./NewRestaurantForm.css";


function NewRestaurantForm({cancel}) {

    const { localUser, token } = useContext(UserContext);
    const { setError } = useContext(AppContext);

    const navigate = useNavigate();

    const initialData = {
        name: "",
        streetAddress: "",
        city: "",
        state: "",
        phone: "",
        email: "",
        zipcode: ""
    }

    const [formData, updateForm, resetForm] = useFormData(initialData);

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const resObj = {...formData, owner: localUser}
            restaurantAPI.token = token;
            const result = await restaurantAPI.createNewRestaurant(resObj);
            setError({message: "Restaurant Added", type: "success"});
            navigate(`/res/${result.newRestaurant.id}`);
            resetForm(s => initialData);
        } catch(e) {
            // resetForm(s => initialData);
            console.log(e);
            setError({message: e.response.data.message, type: "failure"});

        }
    }

    return (
        <div className="RestaurantForm">
            <form className="Restaurant-Form" onSubmit={handleSubmit}>
                <div className="Restaurant-Form-Field">
                    <label htmlFor="name">Name</label>
                    <input required type="text" name="name" id="name" value={formData.name} onChange={updateForm}/>
                </div>
                <div className="Restaurant-Form-Field">
                    <label htmlFor="phone">Phone</label>
                    <input required type="text" name="phone" id="phone" value={formData.phone} onChange={updateForm}/>
                </div>
                <div className="Restaurant-Form-Field">
                    <label htmlFor="email">Email</label>
                    <input required type="text" name="email" id="email" value={formData.email} onChange={updateForm}/>
                </div>
                <div className="Restaurant-Form-Field">
                    <label htmlFor="streetAddress">Street Address</label>
                    <input required type="text" name="streetAddress" id="streetAddress" value={formData.streetAddress} onChange={updateForm}/>
                </div>
                <div className="Restaurant-Form-Field">
                    <label htmlFor="city">City</label>
                    <input required type="text" name="city" id="city" value={formData.city} onChange={updateForm}/>
                </div>
                <div className="Restaurant-Form-Field">
                    <label htmlFor="state">State</label>
                    <input required type="text" name="state" id="state" value={formData.state} onChange={updateForm}/>
                </div>
                <div className="Restaurant-Form-Field">
                    <label htmlFor="zipcode">Zip Code</label>
                    <input required type="number" name="zipcode" id="zipcode" value={formData.zipcode} onChange={updateForm}/>
                </div>
                <button
                    type="submit" 
                    className="Restaurant-Form-Btn"
                    disabled={!Object.values(formData).every(d => d !== "")}>
                    Add
                </button>
                <button
                    type="button"
                    className="Restaurant-Form-Btn cancel"
                    onClick={cancel}
                >
                    Cancel
                </button>
            </form>
        </div>
    )


}

export default NewRestaurantForm;