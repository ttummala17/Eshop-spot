const mongoose = require('mongoose')
const validator = require('validator')

const currencySchmea =  new mongoose.Schema({
    country:{
        type: String,
        required: true
    },

    code:{
        type: String,
        required: true
    },

    symbol:{
        type: String,
        required: true
    }
})

const Currency = mongoose.model('Currency',currencySchmea)
module.exports =  Currency
