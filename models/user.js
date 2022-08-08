const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
        {
          user_name:{
              type: Sequelize.STRING(20)
          },
          user_nickname: {
              type: Sequelize.STRING(20)
          },
          user_password:{
              type: Sequelize.CHAR(60)
          },
          user_email:{
              type: Sequelize.STRING(20)
          },
          user_phone:{
              type: Sequelize.STRING(20)
          },
        },
         { sequelize,
           modelName:"user",
           timestamps: true,
           allowNull : false,
         }
      );
    }
    static associate(db){
      
    };
};

module.exports = User;