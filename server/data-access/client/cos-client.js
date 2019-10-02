const AWS = require('ibm-cos-sdk');
const config = require('config');

class CosClient {
    constructor() {
        this.cos = new AWS.S3(config.cos.config);
    }

    async getBuckets() {
        return new Promise((resolve, reject) => {
            this.cos.listBuckets((err, data) => {
                err ? reject(err) : resolve(data);
            });
        })
    }

    async getBucketContentsList(bucketName) {
        return new Promise((resolve, reject) => {
            this.cos.listObjectsV2({Bucket: bucketName}, (err, data) => {
                err ? reject(err) : resolve(data);
            })
        });
    }

    async getBucketContent(bucketName, itemName) {
        return new Promise((resolve, reject) => {
            this.cos.getObject({Bucket: bucketName, Key: itemName}, (err, data) => {
                err ? reject(err) : resolve(data);
            })
        })
    }
}

module.exports = new CosClient();