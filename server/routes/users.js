var express = require('express');
var router = express.Router();
const client = require('../data-access/client/mongo-client');
const passport = require('../utils/verifyToken');

router.post('/', async (req, res) => {
    const result = await client.createUser(req.body);
    res.json(result);
});

module.exports = router;