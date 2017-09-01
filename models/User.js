const mongoose = require('mongoose');
const{ Schema } = mongoose;


const userSchema = new Schema({
    authId: String
});

// users: a collection of user instances
// every time the index.js runs, the following will be executed,
// but mongo WON'T overwrite users, it just matches and creates a new users if users does not exist

mongoose.model('users', userSchema);

