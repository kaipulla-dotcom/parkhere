const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const MongoDB_URI = "mongodb+srv://parkhereuser:p58RCkbjeX7wjnC7@cluster0.2mmae.mongodb.net/parkhere";

mongoose.connect(MongoDB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => { 
        console.log('Connected to Mongo');
        
    },
    err => {
         console.log(err);
        }
  );

module.exports = mongoose.connection;