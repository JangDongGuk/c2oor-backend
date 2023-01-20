import { Model, TEXT } from 'sequelize';

class Review extends Model {
    static init(sequelize) {
        return super.init({
            review_text: {
                type: TEXT,
                allowNull : false
            }
        },

            {
                sequelize,  
                timestamps: true,
                modelName : 'review',
                tableName : 'reviews',
                charset   : 'utf8',
                collate   : 'utf8_general_ci'
            });
    }
    static associate(db) {
        db.Review.belongsTo(db.User, { 
            foreignKey: { name:'user_id', allowNull: false },
            onDelete: 'cascade', 
            onUpdate: 'cascade'
            
        }); 
        db.Review.hasMany(db.Production, { foreginKey: 'prodction' , sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});
    }
}

export default Review

