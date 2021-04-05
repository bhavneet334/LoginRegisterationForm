const mongoose  = require('mongoose');

//returning a promise 
mongoose.connect("mongodb://localhost:27017/Registeration" , {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log(`Connection Successful`);
}).catch((err)=>{
    console.log(err);
});



