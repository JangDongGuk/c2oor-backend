import { Router } from 'express';
const router = Router();

import { createClient } from 'redis';
import redisInit from './index';
const redisClient = createClient('./index');
redisClient.connect();

import { decode, verify } from 'jsonwebtoken';
require('dotenv').config();

router.get ('/token', async (req, res, next) => {         
    
    const token = req.headers.authorization 

    if (!token) {
        return res.status(401).json({ message: "토큰을찾을수없다." });
    }

    const result = decode(token,process.env.SECRET_KEY)
   
    const checkdb = await redisClient.exists(result)
    
    if (checkdb) {   
        return res.json({message: "유효하지 않은 아이디 입니다."})
    } 

    try {
        const verfiy = verify(token, process.env.SECRET_KEY, (err, decoded) => {
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

export default router;