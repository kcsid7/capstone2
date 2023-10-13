import axios from "axios";
// const axios = require("axios"); customerAPI

const BASE = "http://localhost:5000";


class customerAPI {

    static token;

    static async getAllCustomers() {
        try {
            const result = await axios.get(`${BASE}/customer/all`);
            return result.data;
        } catch (e) {

        }
    }

    static async getCustomer(username) {
        // const result = await axios.get(`${BASE}/customer/${username}`);
        try {

            const result = await axios({
                method: 'GET',
                url: `${BASE}/customer/${username}`,
                headers: { authtoken: customerAPI.token } 
            })
            return result.data;
        } catch (e) {
            throw e
        }
    }

    static async registerCustomer(newCustomerData) {
        try{
            const newCustomer = await axios({
                method: 'POST',
                url: `${BASE}/customer/register`,
                data: newCustomerData
            })
            return newCustomer.data;
        } catch(e) {
            console.log("customerAPI - registerCustomer", e)
            throw e
        }
    }

    static async loginCustomer(customerData) {
        try {
            // console.log("customerAPI - loginCustomer")
            const customer = await axios({
                method: 'POST',
                url: `${BASE}/customer/login`,
                data: customerData
            })
            return customer.data;
        } catch(e) {
            console.log("customerAPI - loginCustomer", e);
            throw e
        }
    }


    static async getCustomerOrders(username) {
        try {
            const result = await axios({
                method: 'GET',
                url: `${BASE}/customer/${username}/orders`,
                headers: { authtoken: customerAPI.token } 
            })
            return result.data;
        } catch (e) {
            console.log("customerAPI - getCustomerOrders", e);
            throw e
        }
    }


    // Update Customer
    static async updateCustomer(username, data) {
        try {
            const result = await axios({
                method: 'PATCH',
                url: `${BASE}/customer/${username}`,
                headers: { authtoken: customerAPI.token },
                data: data 
            })
            return result.data;
        } catch(e) {
            console.log("customerAPI - updateCustomer", e);
            throw e
        }
    }



}


export default customerAPI;
