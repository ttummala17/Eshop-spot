const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const Product = require('../models/product')
const jwt = require('jsonwebtoken')

//might requrie is vendor to restrict data

const vendorSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid email address')
            }
        }
    },
    password:{
        type:String,
        trim:true,
        minlength:7,
        require:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type:Number,
        default:18,
        validate(value){
            if(value < 0){
                throw new Error('Age must be postive')
            }
        }
    },
    avatarString:{
        type: String

    },
    contact:{
        //can validate using validator
        type: String,
        //required: true
    },
    address:{
        type: Object,
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
       
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps:true
})

vendorSchema.virtual('products',{
    ref:'Product',
    localField:'_id',
    foreignField:'owner'
})

vendorSchema.methods.toJSON =  function(){

    const vendor = this
    const vendorObject =  vendor.toObject()

    delete vendorObject.password
    delete vendorObject.tokens



    return vendorObject


}



vendorSchema.methods.generateAuthToken = async function(){

        const vendor = this
        const token = jwt.sign({ _id:vendor._id.toString() },'thisismynewcourse')
        vendor.tokens = vendor.tokens.concat({token})
        const new_vendor = await vendor.save()
        return token




}

vendorSchema.statics.findByCredentials = async (email,password)=>{
    const vendor = await Vendor.findOne({email})
    // console.log(vendor)

    if(!vendor){
        console.log("inside not found vendor")
        throw new Error('Unable to find user')
    }
    const isMatch = await bcrypt.compare(password,vendor.password)
    console.log("password match", isMatch)
    if(!isMatch){
        throw new Error('invalid username/password')
    }
    return vendor
}

vendorSchema.pre('save', async function (next){
    const vendor = this
    console.log("before saving")
    if(vendor.isModified('password')){
        vendor.password = await bcrypt.hash(vendor.password,8)
    }
    next()
    
})

vendorSchema.pre('remove',async function(next){
    const vendor = this
    await Product.deleteMany({owner :vendor._id})
    next()

})

const Vendor = mongoose.model('Vendor',vendorSchema)

module.exports = Vendor