const { default: axiosConfig } = require("../../utils/axiosConfig");
const axios = require('axios');
exports.default = class CreateProjectController {
    endPoint = axiosConfig.clockifyEndpoint;
    headers = axiosConfig.clockifyHeaders;
    #projectId;
    constructor(projectName) {
        this.projectName = projectName;
        return this;
    }

    // #Main Function
    run = async () => {
        const url = this.endPoint + 'projects/';
        const body = {
            "name": this.projectName,
        };
        const respone = await axios.post(url, body, { headers: this.headers });
        this.#projectId = respone.data.id;
    }

    // #Getters
    getProjectId = () => {
        return this.#projectId;
    }
}