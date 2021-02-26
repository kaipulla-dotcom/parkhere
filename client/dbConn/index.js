const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//const MongoDB_URI = process.env.MONGODB_URI;

const MongoDB_URI = "mongodb://localhost/parkhere";

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