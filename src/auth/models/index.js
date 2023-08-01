'use strict'

const { Sequelize, DataTypes } = require('sequelize')

const dataBase_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelize = new Sequelize(dataBase_URL, {})

const user = require('./user')
const userTable = user(sequelize,DataTypes)


module.exports = {
    DB: sequelize,
    userTable: userTable
    
}