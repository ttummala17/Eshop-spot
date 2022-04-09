const jwt = require('jsonwebtoken')
const Vendor = require('../models/vendor')

const vendorAuth = async(req,res,next) =>{
    try{
        console.log('Before barrer')
        var token = ""
        if(req.header('Authorization') != null){
            token = req.header('Authorization').replace('Bearer ','')
        }
        else if(token == "" && req.body.headers.Authorization!= null) {
            const Auth = req.body.headers.Authorization
            token = Auth.replace('Bearer ','')
        }

        console.log('token verify',token)
        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)

        // console.log(decoded)
        const vendor = await Vendor.findOne({_id:decoded._id,'tokens.token':token})
        console.log('after vendor')
        if(!vendor){
            
            throw new Error()
        }
        req.token = token
        req.vendor = vendor
        next()
        console.log(token)
   

    }catch(e){
        console.log(e)
        res.status(401).send({error: "Please authenticate"})
    }

}

module.exports = vendorAuth