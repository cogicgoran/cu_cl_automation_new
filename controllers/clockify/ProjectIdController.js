const axios = require('axios');
const { default: axiosConfig } = require('../../utils/axiosConfig');
const { default: CreateProjectController } = require('./CreateProjectController');
module.exports = class ProjectIdController {
    endPoint = axiosConfig.clockifyEndpoint;
    headers = axiosConfig.clockifyHeaders;

    constructor(projectName) {
        this.projectName = projectName;
        return this;
    }

    // #Get Clockify Task Id From Clickup Project Name
    getProjectId = async () => {
        const url = this.endPoint + 'projects';
        const response = await axios.get(url, { headers: this.headers });
        const project = response.data.find(x => this.#sanitizeString(x.name) === this.#sanitizeString(this.projectName));
        if (!project) {
            let createProjectController = new CreateProjectController(this.projectName);
            await createProjectController.run();
            return createProjectController.getProjectId()
        };
        return project.id;

    }

    // #Sanitize String For Best Match
    #sanitizeString = (string) => {
        return string.replace(/\s+/g, '').toLowerCase()
    }
}