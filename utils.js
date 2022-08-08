const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
require('dotenv').config();


exports.emailer =  async (req, res) => {
    try {
        
        const authNum = Math.floor((Math.random() * 1000000) + 1 );
        const transporter = nodemailer.createTransport({ //내가 주체가되어서 유저한테 메일보내는 계정 설정 구간
            service: 'gmail',
            host:'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });
        
        transporter.sendMail({ // 유저한테 보내는 메일 내용   
            from: process.env.NODEMAILER_USER,
            to: req.body,
            subject: "이메일 인증번호",
            text: String( authNum ),   
        })
        .then(function(result){console.log('result', result)})
        .catch(function(reason){console.log('reason', reason)}); 
    }
    catch(err) {
        console.log(err);
    }
}