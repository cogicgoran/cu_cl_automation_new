const Task = require("../models/taskModel");
const ProjectAndTasktNameController = require("./clickup/ProjectAndTasktNameController");
const { default: TaskTimeTrackedDataController } = require("./clickup/TaskTimeTrackedDataController");
const ProjectIdController = require("./clockify/ProjectIdController");
const { default: SaveTimeEntriesController } = require("./clockify/SaveTimeEntriesController");
const { default: TagIdsController} = require('./clockify/TagIdsController');

module.exports = class BridgeController {
    static #projectName;
    static #clockifyProjectId;
    static #task;
    static #taskDescription;
    static #taskTags;
    static #tagIds;
    
    // #Main Function
    static run = async (clickupData) => {
        try {
            await this.#getProjectAndTaskName(clickupData.task_id);
            await this.#getTaskData(clickupData);
            await this.#getClockifyProjectId();
            this.#convertFromPlain(clickupData);
            await this.#saveTimeEntries();
            return this;
            
        } catch (error) {
            console.log(JSON.stringify(error, null, 2));
        }
    }

    // #Get Project And Task  Name By Task Id
    static #getProjectAndTaskName = async (taskId) => {
        let projectAndTasktNameController = new ProjectAndTasktNameController(taskId);
        await projectAndTasktNameController.fetchData();
        this.#projectName = projectAndTasktNameController.getProjectName();
        this.#taskDescription  = projectAndTasktNameController.getTaskName();
    }

    // #Get Extra Data For Task (Description And Tags)
    static #getTaskData = async (clickupData) => {
        let taskId = clickupData.task_id;
        let userEmail = clickupData.history_items[0].user.email;
        let taskTimeTrackedDataController = new TaskTimeTrackedDataController(taskId, userEmail);
        await taskTimeTrackedDataController.getData();
        let taskDescription = taskTimeTrackedDataController.getDescription();
        this.#taskDescription = taskDescription === '' ? this.#taskDescription : taskDescription;
        this.#taskTags = taskTimeTrackedDataController.getTags();
        const tagIdsController = new TagIdsController(this.#taskTags);
        await tagIdsController.run();
        this.#tagIds = tagIdsController.getTagIds();
    }

    // #Get clockify project id by clickup project name
    static #getClockifyProjectId = async () => {
        let projectIdController = new ProjectIdController(this.#projectName);
        this.#clockifyProjectId = await projectIdController.getProjectId();
    }

    // #Get Only Necessary Data From Clickup
    static #convertFromPlain = (clickupData) => {
        let id = clickupData.task_id;
        let description = this.#taskDescription;
        let userEmail = clickupData.history_items[0].user.email;
        let projectId = this.#clockifyProjectId;
        let timestampStart = clickupData.history_items[0].after.start;
        let timestampEnd = clickupData.history_items[0].after.end;
        let tagIds = this.#tagIds;
        this.#task = new Task(id, description, userEmail, projectId, timestampStart, timestampEnd, tagIds);
    }

    // #Save To Clockify
    static #saveTimeEntries = async () => {
        let saveTimeEntriesController = new SaveTimeEntriesController(this.#task);
        await saveTimeEntriesController.run();
    }
}