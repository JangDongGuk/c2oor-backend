const Sequelize = require('sequelize');

class Cart extends Sequelize.Model{
    static init(sequelize) {
        return super.init({
            user_id:{
                type: Sequelize.INTEGER
            },
            product_id:{
                type: Sequelize.INTEGER
            },
            coupon_id:{
                type: Sequelize.INTEGER
            },
            reserve_id:{
                type: Sequelize.INTEGER
            },
            cart_price:{
                type: Sequelize.INTEGER
            },
            cart_count:{
                type: Sequelize.INTEGER
            }, 
        }, { sequelize, modelName:"cart", timestamps:false }    
        );
    }
    static associate(db){
  
    };
};

module.exports = Cart