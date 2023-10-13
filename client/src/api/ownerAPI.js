import axios from "axios";
// const axios = require("axios"); ownerAPI


const BASE = "http://localhost:5000";


class ownerAPI {
    static token;


    static async registerOwner(newOwnerData) {
        try{
            const newOwner = await axios({
                method: 'POST',
                url: `${BASE}/owner/register`,
                data: newOwnerData
            })
            return newOwner.data;
        } catch(e) {
            console.log("ownerAPI - registerOwner", e)
            throw e
        }
    }


    static async loginOwner(ownerData) {
        try {
            // console.log("customerAPI - loginCustomer")
            const owner = await axios({
                method: 'POST',
                url: `${BASE}/owner/login`,
                data: ownerData
            })
            return owner.data;
        } catch(e) {
            console.log("ownerAPI - loginOwner", e);
            throw e
        }
    }



    static async getOwner(username) {
        try {
            const result = await axios({
                method: 'GET',
                url: `${BASE}/owner/${username}`,
                headers: { authtoken: ownerAPI.token } 
            })
            return result.data;
        } catch(e) {
            console.log("ownerAPI - getOwner", e);
            throw e
        }
    }

    // Update Owner
    static async updateOwner(username, data) {
        try {
            const result = await axios({
                method: 'PATCH',
                url: `${BASE}/owner/${username}`,
                headers: { authtoken: ownerAPI.token },
                data: data 
            })
            return result.data;
        } catch(e) {
            console.log("ownerAPI - getOwner", e);
            throw e
        }
    }




}


export default ownerAPI;
