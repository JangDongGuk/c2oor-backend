const express = require('express');
const router = express.Router();

const redis = require('redis')
const redisInit = require('./index');
const redisClient = redis.createClient('./index');
redisClient.connect();


const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get ('/token', async (req, res, next) => {         
    
    const token = req.headers.authorization 
    console.log(token)

    if (!token) {
        return res.status(401).json({ message: "토큰을찾을수없다." });
    }

    const result = jwt.decode(token,process.env.SECRET_KEY)
   
    const checkdb = await redisClient.exists(result)
    
    if (checkdb) {   
        return res.json({message: "유효하지 않은 아이디 입니다."})
    } 

    try {
        const verfiy = jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                console.log('Error => \n',err);
                return null;
            }else{
                console.log('decoded => ', decoded);
                return res.status(201).json({message:"success"})
            }
        });
    } catch(err) {
        return res.status(401).json({message:"유효하지 않은 토큰입니다."})
    }
});

module.exports = router;












  
