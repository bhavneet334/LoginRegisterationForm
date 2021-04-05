const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const bcrypt = require('bcrypt');


require('./db/conn');
const Register = require('./models/registers');
const { Mongoose } = require('mongoose');

const port = process.env.PORT || 9000;

const static_path = path.join(__dirname,'../public');
const template_path = path.join(__dirname,'../templates/views');
const partials_path = path.join(__dirname,'../templates/partials');

app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set('view engine','.hbs');
app.set('views',template_path);
hbs.registerPartials(partials_path);

app.get('/', (req,res) => {
    res.render('index.hbs');
 });

 app.get('/register.hbs',(req,res)=>{
  res.render('register');
});

app.get('/login.hbs',(req,res)=>{
  res.render('login');
});

 app.get('/buttons.hbs',(req,res)=>{
   res.render('buttons');
 });

 app.get('/cards.hbs',(req,res)=>{
  res.render('cards');
});

app.get('/charts.hbs',(req,res)=>{
  res.render('charts');
})

app.get('/404.hbs',(req,res)=>{
  res.render('404');
})

app.get('/utilities-color.hbs',(req,res)=>{
  res.render('utilities-color');
})

app.get('/utilities-animation.hbs',(req,res)=>{
  res.render('utilities-animation');
})

app.get('/utilities-border.hbs',(req,res)=>{
  res.render('utilities-border');
})

app.get('/utilities-other.hbs',(req,res)=>{
  res.render('utilities-other');
});


app.get('/tables.hbs',(req,res)=>{
  res.render('tables');
})

app.get('/blank.hbs',(req,res)=>{
  res.render('blank');
});

app.get('/forgot-password.hbs',(req,res)=>{
  res.render('forgot-password');
});

app.post("/register", async(req,res)=>{
   try{
    const password  = req.body.password;  
    const repeatpassword  = req.body.repeatpassword;

    if(password=== repeatpassword){
      
      const registerEmployee = new Register({
         firstname : req.body.firstname,
         lastname :req.body.lastname,
         email :req.body.email,
         password :req.body.password,
         repeatpassword : req.body.repeatpassword
      });

      //password hash - middleware
  
    const register = await registerEmployee.save();
    res.status(200).render('./');

    }else{
      res.send("Password is Incorrect");
    }

   }catch(error){
      res.status(400).send(error);
   }
})

app.post('/login', async(req,res)=>{
  try{

    const email = req.body.email;
    const password  = req.body.password;  
    
    const useremail = await Register.findOne({email: email});

    const isMatch = bcrypt.compare(password, useremail.password)
    
    if(isMatch){
        res.status(201).render('./');
    }else{
        res.send('Invalid Login Details');
    }
   
  }catch(error){
     res.status(400).send("Invalid Login Details");
  }
});

app.listen(port, (req,res)=>{
  console.log(`Listening on port ${port}`);
});

