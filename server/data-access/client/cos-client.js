const AWS = require('ibm-cos-sdk');
const config = require('config');

class CosClient {
    constructor() {
        this.cos = new AWS.S3(config.cos.config);
    }

    async getBuckets() {
        return new Promise((resolve, reject) => {
            this.cos.listBuckets((err, data) => {
                err ? reject(data) : resolve(data);
            });
        })
    }
}

module.exports = new CosClient();