const express = require('express');
const router = express.Router();

const Review = require('../models/review');
const User = require('../models/user');

router.post('/review', async(req, res) => {
    try{
        const data = req.body
    
        const user_check  = await User.findOne({where: { id : data.user_id}})
   
        if(!user_check) {
            return res.status(404).json({ message: 'not a mamber'});
        }

        if(user_check.id == data.user_id) {
            await Review.create({  review_text: data.text, user_id : data.user_id })
            const user_review = await Review.findAll({
                attributes: ['createdAt'],
                order: [["createdAt", "DESC"]],
                where: { user_id : data.user_id }
            })
            const review_id = await Review.findOne({
                order: [["id", "DESC"]],
                where: { review_text : data.text}
            })
            const user_nickname = user_check.user_nickname
            const createdat = user_review[0].createdAt
            
            return res.status(201).json({
                message:'success',
                nickname: user_nickname, 
                createdat: createdat,
                review_id: review_id.id
            })
        };
    }catch(err) {
        console.log(err);
    }
});

router.patch('/review-patch', async(req, res) => {
    try{
        const data = req.body

        const user_check  = await User.findOne({where: { id : data.user_id}})

        if (!user_check) {
            return res.status(404).json({ massage: 'not a member'});
        }
        
        if (user_check) {
            Review.update({review_text: data.text}, { where: { id : data.review_id }})
            const updated = await Review.findOne({
                attributes: ['updatedAt'],
                order: [["updatedAt", "DESC"]],
                where: { review_text : data.text}})

            const updatedat = updated.updatedAt
            console.log(updatedat)
            return res.status(201).json({meassge: 'success', updaedat: updatedat});
        };
    }catch(err) {
        console.log(err);
    }
});

router.delete('/review-delete', async(req,res) => {
    try{

        const data = req.body
        const user_check  = await User.findOne({where: { id : data.user_id}})

        if(user_check) {
            Review.destroy({ where: {review_text : data.text}})
            return res.status(204);
        }
        return res.status(404).json({ massage: "not a mamber"});
    }catch(err) {
        console.log(err);
    }
});

module.exports = router