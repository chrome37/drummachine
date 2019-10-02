var express = require('express');
var router = express.Router();
const client = require('../data-access/client/mongo-client');
const passport = require('../utils/verifyToken');
const cosClient = require('../data-access/client/cos-client');
const config = require('config');

router.post('/', async (req, res) => {
    const result = await client.createUser(req.body);
    res.json(result);
});

router.get('/:userId/kits', passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        const userId = req.params.userId;
        const result = await cosClient.getBuckets();
        res.json(result);
});

router.get('/:userId/kits/:kitName', passport.authenticate('jwt', {session: false}), 
    async (req, res) => {
        const userId = req.params.userId;
        const kitName = req.params.kitName;
        const result = await cosClient.getBucketContentsList(kitName).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
        const endpoint = config.cos.config.endpoint;
        const contents = result.Contents.map(item => {
            return {
                pad: "",
                path:  new URL(`http://localhost:5000/api/v1/users/${userId}/kits/${kitName}/${item.Key}`),
                name: item.Key
            }
        })
        const resData = {
            kitName: kitName,
            contents: contents
        }
        res.json(resData);
    }   
);

router.get('/:userId/kits/:kitName/:sampleName', 
    async (req, res) => {
        const userId = req.params.userId;
        const kitName = req.params.kitName;
        const sampleName = req.params.sampleName;
        const result = await cosClient.getBucketContent(kitName, sampleName).catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
        console.log(result.Body);
        res.send(result.Body);
    }
)

module.exports = router;