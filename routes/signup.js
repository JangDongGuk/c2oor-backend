const express = require('express');
const router = express.Router();
const redis = require('redis');
const redisClient = redis.createClient();
redisClient.connect();

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

router.post ('/sing', async(req, res) => {
    try {  
        const data = req.body  
        console.log(data)
        const regexp_name = /^[가-힣a-zA-Z]+$/;  
        const regexp_nickname = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/;
        const regexp_password = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,15}/;
        const regexp_phone = /^(010|011|016|017|018|019)\d{3,4}\d{4}$/;
        const regexp_email = /^(\w{1,20})+@(\w{1,20})+\.([a-zA-Z]{2,4}$)+$/;
        
        if (!regexp_name.test(data["name"]) ||   
        !regexp_nickname.test(data["nickname"]) || 
        !regexp_password.test(data["password"]) ||
        !regexp_phone.test(data["phone"]) ||
        !regexp_email.test(data["email"])) {
            
            return res.status(401).json({ message : "INVALID_INPUT"})
             
        }
    
        const check1 = await User.findAll({where :{ user_nickname: data.nickname}})
        const check2 = await User.findAll({where :{ user_email: data.email}})
        const check3 = await User.findAll({where :{ user_phone: data.phone}})
  
        if (!(check1.length === 0 && check2.length === 0 && check3.length === 0)) {
            return res.status(401).json({ message:"already exist"});
        } 
        
        const salt = await bcrypt.genSalt(10)
          
        await User.create({
            user_name     : data.name,   
            user_nickname : data.nickname,
            user_password : await bcrypt.hash(data.password, salt),  
            user_email    : data.email,
            user_phone    : data.phone,
            user_salt     : salt
        })
            return res.status(201).json({ message:"success"});
         
    }  
    catch (err) {
        console.log(err.message)  
    }
});

router.post ('/login', async(req,res) => {
    try {
        const data = req.body
        const check1 = await User.findOne({where :{ user_nickname: data.nickname}})
    
        if (!check1) {
            return res.status(401).json({ message:"not a member"});
        } 
    
        const check2 = bcrypt.compareSync(data.password, check1.get("user_password")); 
        
        if (!check2) {
            return res.status(401).json({ message:"Password is incorrect"});
        }
        
        const token = jwt.sign({user_nickname: data.nickname}, process.env.SECRET_KEY, { expiresIn: process.env.JWT_ACCESS_TIME}) 
        await redisClient.set(data.nickname, token)
            
        const salt = await bcrypt.genSalt(10);
        
        User.update({ user_password : await bcrypt.hash(data.password, salt)}, {where :{ user_nickname: data.nickname}});
        return res.status(201).json({ message:"success", token: token  })
        }
    catch(err){
        console.log(err);
    }
});

router.post('/mail', async(req, res) => {
    try{
      
        const data = JSON.stringify(req.body.email)
        const authNum = Math.floor((Math.random() * 1000000) + 1 );
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host:'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });

        const emailNum = String(authNum)
            transporter.sendMail({
            from: process.env.NODEMAILER_USER,
            to: data,
            subject: "이메일 인증번호",
            text: emailNum,   
        }).then(function(result){console.log('result', result)})
          .catch(function(reason){console.log('reason', reason)});

        res.status(201).json({
            emailNum : String(emailNum),
            message : "success"
        });
    }
    catch(err) {
        console.log(err);
    }
});

module.exports = router;