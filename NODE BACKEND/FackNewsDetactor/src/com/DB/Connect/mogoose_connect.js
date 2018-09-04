const mongoose=require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, (err)=>{
    if(err){
        console.log(err);
    }
});

module.exports = {mongoose};