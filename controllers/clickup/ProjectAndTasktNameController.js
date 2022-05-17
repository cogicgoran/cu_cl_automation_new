const axios = require('axios');
const { default: axiosConfig } = require('../../utils/axiosConfig');
module.exports = class ProjectAndTasktNameController {
    endPoint = axiosConfig.clickupEndpoint;
    headers = axiosConfig.clickupHeaders;
    #projectName = '';
    #taskName = '';
    constructor(taskId) {
        this.taskId = taskId;
        return this;
    }

    // #Fetch Single Task Data From Clickup API
    fetchData = async () => {
        const url = this.endPoint + 'task/' + this.taskId;
        const response = await axios.get(url, { headers: this.headers });
        if (!response.data) { throw 'Bad data' }
        this.#projectName = response.data.project.name;
        this.#taskName = response.data.name;
    }

    // #Getters
    getProjectName = () => {
        return this.#projectName;
    }

    getTaskName = () => {
        return this.#taskName;
    }
}