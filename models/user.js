import { Model, STRING, CHAR } from 'sequelize';

class User extends Model {   
    static init(sequelize) { 
        return super.init({
            user_name:{
                type: STRING(20),
                allowNull : false
            },
            user_nickname: {
                type: STRING(20),
                allowNull : false
            },
            user_password:{
                type: CHAR(60),
                allowNull : false
            },
            user_email:{
                type: STRING(20),
                allowNull : false
            },
            user_phone:{
                type: STRING(20),
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

export default User