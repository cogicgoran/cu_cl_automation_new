const { default: axiosConfig } = require("../../utils/axiosConfig");
const axios = require('axios');
exports.default = class TaskTimeTrackedDataController {
    endPoint = axiosConfig.clickupEndpoint;
    headers = axiosConfig.clickupHeaders;
    #tags;
    #description;
    constructor(taskId, userEmail) {
        this.taskId = taskId;
        this.userEmail = userEmail;
        return this;
    }

    getData = async () => {
        const url = this.endPoint + 'task/' + this.taskId + '/time';
        const response = await axios.get(url, { headers: this.headers });
        if (!response.data.data) { return false; }
        const user = response.data.data.find(x => x.user.email === this.userEmail);
        // the first interval is the last information about the time change of the task
        const intervals = user.intervals[0];
        this.#description = intervals.description ?? '';
        this.#tags = intervals.tags ?? [];
    }

    // #Getters
    getDescription = () => {
        return this.#description;
    }

    getTags = () => {
        return this.#tags
    }
}