exports.default = class AxiosConfig {
    static clockifyHeaders = {
        'Content-Type': 'application/json',
        'X-Api-Key': process.env.CLOCKIFY_X_API_KEY
    };

    static clockifyEndpoint = `https://api.clockify.me/api/v1/workspaces/${process.env.CLOCKIFY_WORKSPACE_ID}/`;


    static clickupHeaders = {
        'Content-Type': 'application/json',
        'Authorization': process.env.CLICK_UP_API_KEY
    };

    static clickupEndpoint = 'https://api.clickup.com/api/v2/';
}