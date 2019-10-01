var express = require('express');
var router = express.Router();
const client = require('../data-access/client/mongo-client');
const passport = require('../utils/verifyToken');
const cosClient = require('../data-access/client/cos-client');

router.post('/', async (req, res) => {
    const result = await client.createUser(req.body);
    res.json(result);
});

router.get('/kit', async (req, res) => {
    const result = await cosClient.getBuckets();
    console.log(result);
    res.json(result);
});

module.exports = router;