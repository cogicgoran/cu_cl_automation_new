const { default: axiosConfig } = require("../../utils/axiosConfig");
const { default: UserIdController } = require("./UserIdController");
const axios = require('axios');
exports.default = class SaveTimeEntriesController {
    userId = '';
    endPoint = axiosConfig.clockifyEndpoint;
    headers = axiosConfig.clockifyHeaders;
    constructor(task) {
        this.task = task;
        return this;
    }

    // #Main Function
    run = async () => {
        await this.#setUserId();
        await this.#save();
    }
    // #Search clockify id based on clickup email
    #setUserId = async () => {
        let userIdController = new UserIdController(this.task.userEmail);
        this.userId = await userIdController.getUserId()
    }

    // #Save data to clockify
    #save = async () => {
        if (!this.userId) { return; }
        const url = this.endPoint + 'user/' + this.userId + '/time-entries';
        const body = {
            "start": this.task.timestampStart,
            "end": this.task.timestampEnd,
            "description": this.task.description,
            "projectId": this.task.projectId,
            "tagIds": this.task.tagIds
        };

        await axios.post(url, body, { headers: this.headers });


    }
}