import { Router } from 'express';
const router = Router();

import { findOne } from '../models/production';

router.get('/production/:id', async(req,res) => {
    try{
        
        const num = req.params.id
        const data = Number(num)

        const id = await findOne({where:{ id : data }});
       
        if (id.id === data) {
        const result = {"name":id.production_name, 
                        "price":id.production_price,
                        "img_url":id.production_img,
                        "production_id": id.production_id
                    }
                            
        return res.status(200).json({ message: 'success', result: result})
        }
        return res.status(404).json({ message: 'false'})
    }
    catch(err) {
        console.log(err);
    }
});

export default router;