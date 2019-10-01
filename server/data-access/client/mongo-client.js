const mongoose = require('mongoose');
const config = require('config');
const userSchema = require('../schema/userSchema');

class MongoClient {
    constructor() {
        this.connection = mongoose.createConnection(config.mongo.url, config.mongo.options);
        this.user = this.connection.model('users', userSchema);
    }

    async disconnect() {
        await this.connection.close();
        MongoClient.instance = null;
    }
    

    async createUser(user) {
        const result = await this.user.create(user).catch(err => {
            throw err;
        }) 
        return result;
    }

    async getUserByEmail(email) {
        const result = await this.user.findOne({email: email});
        return result;
    }
}

module.exports = new MongoClient();