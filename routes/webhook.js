const { response } = require('express');
const express = require('express');
const BridgeController = require('../controllers/BridgeController');
const router = new express.Router()

router.post('/webhook', async(request, response)=>{
    BridgeController.run(request.body);
    response.status(200).send(request.body);
});

module.exports = router;