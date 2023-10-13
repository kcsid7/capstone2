import axios from "axios";
// const axios = require("axios"); orderAPI


const BASE = "http://localhost:5000";

class orderAPI {

    static token; 

    static async getOrder(orderNumber) {
        try {
            // console.log("orderAPI - Token", orderAPI.token);
            const result = await axios({
                method: 'GET',
                url: `${BASE}/order/${orderNumber}`,
                headers: { authtoken: orderAPI.token } 
            })
            return result.data;
        } catch(e) {
            console.log(e);
            return {
                error: "Error"
            }
        }
    }


    static async updateOrder(orderNumber, orderData) {
        try {
            const result = await axios({
                method: 'PATCH',
                url: `${BASE}/order/${orderNumber}`,
                headers: { authtoken: orderAPI.token},
                data: orderData
            });
            return result.data;
        } catch(e) {
            console.log("orderAPI - updateOwner", e);
            throw e
        }
    }


    static async deleteOrder(orderNumber) {
        try {
            const result = await axios({
                method: 'DELETE',
                url: `${BASE}/order/${orderNumber}`,
                headers: { authtoken: orderAPI.token}
            });
            return result;
        } catch(e) {
            console.log("orderAPI - deleteOrder", e)
        }
    }

}

export default orderAPI;
 