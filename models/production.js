const Sequelize = require('sequelize');

class Production extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            production_name: {
                type: Sequelize.STRING(20)
            },

            production_size: {
                type: Sequelize.STRING(10)
            },

            production_price: {
                type: Sequelize.INTEGER
            },
            production_img: {
                type: Sequelize.TEXT
            }, 
        }, {
            sequelize,
            timestamps: true,
            allowNull : false,
            modelName: 'production',
            tableName: 'productions',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }
    static associate(db) {
        db.Production.belongsTo(db.Review, { foreignKey: 'production', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'}); 
    }
}

module.exports = Production;