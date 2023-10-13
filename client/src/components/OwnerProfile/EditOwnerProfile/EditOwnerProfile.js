import React, {useContext} from "react";

import { useNavigate, redirect, Link } from "react-router-dom";

import useFormData from "../../../hooks/useFormData";
import useErrorState from "../../../hooks/useErrorState";

import AlertBanner from "../../utilComponents/AlertBanner/AlertBanner";

import UserContext from "../../../context/UserContext";
import AppContext from "../../../context/AppContext";


import "./EditOwnerProfile.css";

function EditOwnerProfile({owner, updateOwner, cancel}) {

    const {localUser} = useContext(UserContext);
    const {setError:appSetError} = useContext(AppContext)

    const initialData = {
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        phone: owner.phone,
        address: owner.address.streetAddress,
        city: owner.address.city,
        state: owner.address.state,
        zipcode: owner.address.zipcode
    }

    // Form Data Hook
    const [formData, updateForm, resetForm] = useFormData(initialData);

    /* 
    custom error hook state that resets the error to null after a given time
    this time also determines for how long this error will be displayed
    */
    const [error, setError] = useErrorState(7000); 

    const errorMessage = (error) => {
        return error ?
        <>
            <AlertBanner width={70} message={error.response.data.message} type="failure"/>
        </>
        : <></>
    }


    async function handleSubmit(e) {
        try {
            e.preventDefault();
            console.log(formData);
            updateOwner(localUser, formData);
            appSetError({message: "Owner Profile Updated!", type: "success"});
            cancel();
        } catch(e) {
            // resetForm(s => initialData);
            setError(e)
        }
    }

    return (
        <div className="EditOwnerProfile">
            <h1>Update Profile</h1>
            {
                errorMessage(error)
            }
            <form className="EditOwnerProfile-Form" onSubmit={handleSubmit}>
                <div className="EditOwnerProfile-Form-Field">
                    <label htmlFor="firstName">First Name</label>
                    <input required type="text" name="firstName" id="firstName" value={formData.firstName} onChange={updateForm}/>
                </div>
                <div className="EditOwnerProfile-Form-Field">
                    <label htmlFor="lastName">Last Name</label>
                    <input required type="text" name="lastName" id="lastName" value={formData.lastName} onChange={updateForm}/>
                </div>
                <div className="EditOwnerProfile-Form-Field">
                    <label htmlFor="email">Email</label>
                    <input required type="email" name="email" id="email" value={formData.email} onChange={updateForm}/>
                </div>
                <div className="EditOwnerProfile-Form-Field">
                    <label htmlFor="phone">Phone</label>
                    <input required type="text" name="phone" id="phone" value={formData.phone} onChange={updateForm}/>
                </div>
                <div className="EditOwnerProfile-Form-Field">
                    <label htmlFor="address">Address</label>
                    <input required type="text" name="address" id="address" value={formData.address} onChange={updateForm}/>
                </div>
                <div className="EditOwnerProfile-Form-Field">
                    <label htmlFor="city">City</label>
                    <input required type="text" name="city" id="city" value={formData.city} onChange={updateForm}/>
                </div>
                <div className="EditOwnerProfile-Form-Field">
                    <label htmlFor="state">State</label>
                    <input required type="text" name="state" id="state" value={formData.state} onChange={updateForm}/>
                </div>
                <div className="EditOwnerProfile-Form-Field">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input required type="text" name="zipcode" id="zipcode" value={formData.zipcode} onChange={updateForm}/>
                </div>
                <button disabled={!Object.values(formData).every(d => d !== "")}>Update</button>
                <button onClick={cancel}>Cancel</button>
            </form>
        </div>
    )
}

export default EditOwnerProfile;