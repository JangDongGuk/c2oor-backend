const Sequelize = require('sequelize');

class User extends Sequelize.Model {   
    static init(sequelize) { 
        return super.init({
            user_name:{
                type: Sequelize.STRING(20),
                allowNull : false
            },
            user_nickname: {
                type: Sequelize.STRING(20),
                allowNull : false
            },
            user_password:{
                type: Sequelize.CHAR(60),
                allowNull : false
            },
            user_email:{
                type: Sequelize.STRING(20),
                allowNull : false
            },
            user_phone:{
                type: Sequelize.STRING(20),
                allowNull : false
            }},
          
          {
            sequelize,
            timestamps: true,
            modelName : 'user',
            tableName : 'users',
            charset   : 'utf8',
            collate   : 'utf8_general_ci'
          });
    }
    static associate(db) {
        db.User.hasMany(db.Review, { 
            foreignKey: { name:'user_id', allowNull: false },
            onDelete: 'cascade', 
            onUpdate: 'cascade'
            
        });
    }
};

module.exports = User