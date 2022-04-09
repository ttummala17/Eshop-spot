const mongoose = require('mongoose')
const validator = require('validator')

const categorySchmea =  new mongoose.Schema({
    categoryname:{ type: String, required: true }

})

const Category = mongoose.model('Category',categorySchmea)

module.exports =  Category
