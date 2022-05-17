const { default: axiosConfig } = require("../../utils/axiosConfig");
const axios = require('axios');
exports.default = class UserIdController {
    endPoint = axiosConfig.clockifyEndpoint;
    headers = axiosConfig.clockifyHeaders;
    
    constructor(userEmail) {
        this.userEmail = userEmail;
        return this;
    }
    // #Get Clockify User Id From Email
    getUserId = async () => {
        const url = this.endPoint + 'users';
        const response = await axios.get(url, { headers: this.headers });
        if (!response.data) { return false };
        const user = response.data.find(x => x.email == this.userEmail) ?? {};
        if (this.#isEmpty(user)) { return false };
        return user.id;
    }

    // #Check if object is empty
    #isEmpty = (obj) => {
        return Object.keys(obj).length === 0;
    }
}