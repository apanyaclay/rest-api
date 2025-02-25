require('dotenv').config()
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

sequelize.authenticate()
    .then(()=>{
        console.log('Connected to database')
    })
    .catch((err)=>{
        console.log('Error connecting to database', err)
    })

module.exports = sequelize