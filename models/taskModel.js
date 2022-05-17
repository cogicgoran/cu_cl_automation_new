module.exports = class Task {
    constructor(id, description, userEmail, projectId, timestampStart, timestampEnd, tagIds) {
        this.id = id;
        this.description = description;
        this.userEmail = userEmail;
        this.projectId = projectId;
        this.tagIds = tagIds;
        this.timestampStart = this.#timestampConvert(timestampStart);
        this.timestampEnd = this.#timestampConvert(timestampEnd);
        return this;
    }

    // # Timestamp To ISO-8601 
    #timestampConvert = (timestamp) => {
        return new Date(parseInt(timestamp)).toISOString();
    }
}