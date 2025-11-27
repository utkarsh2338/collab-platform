const { Sequelize } = require('sequelize');

// Update with your actual database credentials
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/collab_db', {
    dialect: 'postgres',
    logging: false,
});

module.exports = { sequelize };
