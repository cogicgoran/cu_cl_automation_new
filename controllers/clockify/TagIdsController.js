const axios = require("axios");
const { default: axiosConfig } = require("../../utils/axiosConfig");

exports.default = class TagIdsController {
  endpoint = axiosConfig.clockifyEndpoint;
  headers = axiosConfig.clockifyHeaders;

  constructor(clickupTags) {
    this.clickupTags = clickupTags;
    this.tagIds = [];
    this.missingTags = [];
    this.url = this.endpoint + "tags";
  }

  run = async () => {
      await this.#fetchTagIds();
  };

  #fetchTagIds = async () => {
      const response = await axios.get(this.url, { headers: this.headers });
      const tags = response.data;
      this.#filterTags(tags);
      await this.#fetchMissingTags();
      return this.tagIds;
  };

  #filterTags = (tags) => {
    this.clickupTags.forEach((clickupTag) => {
      const tagFound = tags.find((tag) => tag.name === clickupTag.name);
      if (tagFound) {
        this.tagIds.push(tagFound.id);
      } else {
        this.missingTags.push(clickupTag);
      }
    });
  };

  #fetchMissingTags = async () => {
      for (const missingTag of this.missingTags) {
        const response = await axios.post(
          this.url,
          { name: missingTag.name },
          { headers: this.headers }
        );
        this.tagIds.push(response.data.id);
      }
  };

  getTagIds() {
    return this.tagIds;
  }
};
