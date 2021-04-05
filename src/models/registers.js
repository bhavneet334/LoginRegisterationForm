const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true
    },
    lastname : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    repeatpassword : {
        type:String,
        required:true
    }
});

employeeSchema.pre("save", async function(next){
     
    if(this.isModified("password")){
        // const passwordHash  = await bcrypt.hash(password,10);
        // console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password,10);
        // console.log(`the current password is ${this.password}`);

        this.repeatpassword = undefined;
    }
    
    next();
});

//now we need to create a collection for database

const Register = new mongoose.model('Register', employeeSchema);
module.exports = Register;