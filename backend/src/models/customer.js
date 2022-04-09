const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Cart = require('./cart')

const customerSchema = new mongoose.Schema({
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
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be postive')
            }
        }
    },
    contact:{
        //can validate using validator
        type: String,
        //required: true
    },
    /* countryCode:{
        //can validate using validator
         type: String,
         required: true
    },*/
    address:{
        type: [mongoose.Schema.Types.ObjectId],
        ref:'Address'
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    }, tokens:[{
        token:{
            type:String,
            required:true
        }
       
    }],
    avatar:{
        type: Buffer
    },
    currency:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Currency',
        default:'624f77be6467c03dbf0e66eb'
    },

},{
    timestamps:true
})
customerSchema.virtual('carts',{
    ref:'Cart',
    localField:'_id',
    foreignField:'owner'
})

customerSchema.virtual('orders',{
    ref:'Order',
    localField:'_id',
    foreignField:'owner'
})

customerSchema.virtual('addresses',{
    ref:'Address',
    localField:'_id',
    foreignField:'owner'
})

customerSchema.methods.toJSON =  function(){

    const customer = this
    const customerObject =  customer.toObject()

    delete customerObject.password
    delete customerObject.tokens
    
    return customerObject


}

customerSchema.methods.generateAuthToken = async function(){

    const customer = this
    const token = jwt.sign({ _id:customer._id.toString() },'thisismynewcourse')
    customer.tokens = customer.tokens.concat({token})
    await customer.save()
    return token

}

customerSchema.statics.findByCredentials = async (email,password)=>{
    const customer = await Customer.findOne({email})
   

    if(!customer){
        console.log("inside not found customer")
        throw new Error('Unable to find user')
    }
    const isMatch = await bcrypt.compare(password,customer.password)
    console.log("password match", isMatch)
    if(!isMatch){
        throw new Error('invalid username/password')
    }
    return customer

}

customerSchema.pre('save', async function (next){
    const customer = this
    console.log("before saving")
    if(customer.isModified('password')){
        customer.password = await bcrypt.hash(customer.password,8)
    }
    next()
    
})

customerSchema.pre('remove',async function(next){
    const customer = this
    await Cart.deleteMany({owner :customer._id})
    await Order.deleteMany({owner :customer._id})
    await Address.deleteMany({owner:customer._id})
    next()

})
const Customer  = mongoose.model('Customer',customerSchema)

module.exports =  Customer
