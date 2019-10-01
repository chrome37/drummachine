const mongoose = require('mongoose');
require('mongoose-type-email');

userSchema = new mongoose.Schema({
    email: {type: mongoose.SchemaTypes.Email, required: true, unique: true},
    password: { type: String, required: true},
});

userSchema.plugin(require('mongoose-bcrypt'), {fields: ['password']});

module.exports = userSchema;

