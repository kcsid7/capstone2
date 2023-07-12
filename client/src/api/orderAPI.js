import axios from "axios";

const BASE = "http://localhost:5000";

class orderAPI {

    static token; 

    static async getOrder(orderNumber) {
        try {
            console.log("orderAPI - Token",orderAPI.token);
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
}

export default orderAPI;
 