const express = require('express')
const Vendor = require('../models/vendor')
const auth = require('../middleware/vendorAuth')
const custauth = require('../middleware/customerAuth')
const Product = require('../models/product')
const Order = require('../models/order')
const multer = require('multer')

const router = new express.Router()


// "email":"jwt@gmail.com",
// "password":"ABCacb@1234"

router.get('/test',(req,res) =>{
    res.send("From a new file")

})
//get all vendors just for backend purpose


// vendor singup
router.post('/vendor/signup', async (req,res) =>{
    
    const vendor  = new Vendor(req.body)
    try{
        await vendor.save()
      
        const token = await vendor.generateAuthToken()
        res.status(200).cookie("token", token,"vendor",vendor, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          }).send({vendor,token})
    } catch(e){
        res.status(400).send(e)
    }
    // await vendor.save().then(() =>{
    //     res.send(vendor)
    // }).catch((error)=>{
    //     res.status(400).send(error)
    // })
})

router.post('/vendor/login',async(req,res)=>{
    try{
        const vendor = await Vendor.findByCredentials(req.body.email,req.body.password)
        const token = await vendor.generateAuthToken()
        res.status(200).cookie("token", token,"vendor",vendor, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
          }).send({vendor,token})
    }catch(e){
        res.status(400).send()
    }
})


router.post('/vendor/logout',auth,async(req,res)=>{
    try{
        req.vendor.tokens = req.vendor.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.vendor.save()
       
        res.clearCookie("token").send()

    }catch(e){
        res.status(500).send()
    }
})

router.post('/vendor/logoutAll',auth,async(req,res)=>{
    try{
        req.vendor.tokens = []
        await req.vendor.save()

        res.clearCookie("token").send()

    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    dest: 'avatars',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload only images'))

        }
        cb(undefined,true)
    }
})

router.post('/vendor/me/avatar',upload.single('avatar'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})


//get all vendors 
router.get('/vendors/all' ,async (req,res)=>{
    
    try{
        const vendors = await Vendor.find({})
        res.send(vendors)

    }catch(e){
        res.status(500).send(e)
    }
 
})


router.get('/vendors/dashboard', auth ,async (req,res)=>{
    var myProds = [];
    var ords = [];
    var allProds=[];
    var myAllProds=[];
    try{
         myprods = await req.vendor.populate('products').execPopulate()
         
        //  console.log(req.vendor.products)

         req.vendor.products.forEach( ord=>{
           
                myAllProds.push(ord)
         

        })
        // res.send(req.vendor.products)

    }catch(e){
        res.status(500).send(e)
    }

    try{
        ords = await Order.find({})
        // res.send(orders)
        // order.productlist.forEach(pro => {
        //     console.log(pro.product)
        //     if(pro.product == prod){
        //         pro.status = req.body.status
        //     }

        // }
        ords.forEach( ord=>{
            console.log
           
            ord.productlist.forEach( p=>{
                // p["ord_id"] =ord._id
               var temp={
                   "order_id":ord._id,
                   "status":p.status,
                   "product":p.product,
                   "quantity":p.quantity,
                   "returnReason":p.returnReason

               }
                allProds.push(temp)
            })

        })
    //   console.log(allProds,"from construction")

    }catch(e){
        res.status(500).send(e)
    }

    

    // console.log(ords,"orders")
    // console.log(myProds,"myProds")
    var  popProd=[];
    var total = 0;
    var prodsol=0;
    var resList=[]
    var temp={}
    // console.log("all rpods in order",allProds)
    // console.log("all my prods",myAllProds)
    for(var i=0;i<allProds.length;i++){
        for(var j=0;j<myAllProds.length;j++){
            // console.log(allProds[i].product+"-------"+myAllProds[j]._id)
            // console.log(allProds[0].priduct)
            if(allProds[i].product != null && allProds[i].product.equals( myAllProds[j]._id)){
                // console.log("In if")
                total = total + (myAllProds[j].price * allProds[i].quantity)
                    prodsol = prodsol + allProds[i].quantity
                    popProd.push(myAllProds[j])
                    // console.log("In if condition")
                    // console.log(allProds[i], '***',allProds[j]);
                    // console.log(allProds[i].order_id, '-----',allProds[j].quantity);

                temp ={
                                            "order_id":allProds[i].order_id,
                                            "productName":myAllProds[j].name,
                                            "quantity":allProds[i].quantity,
                                            "price":myAllProds[j].price,
                                            "product_id":myAllProds[j]._id,
                                            "OrderStatus":allProds[i].status,
                                            "returnReason":allProds[i].returnReason,
                    
                                        }
                                        resList.push(temp)
            }
        }
    }
    // console.log(total)

   const chaos = Math.floor(Math.random() * popProd.length);
   const pop =  popProd[chaos];
   var resJson = {
       "tabData":resList,
       "totalSales":total,
       "ProductsSold":prodsol,
       "populatProd":pop
   }
//    console.log(resJson)
   res.send(resJson)




 
        
 
})
router.get('/vendors/me', auth ,async (req,res)=>{
    
 res.send(req.vendor)
 
})
router.get('/vendor/:id',custauth,async (req,res)=>{
    const _id = req.params.id
    
    try{
        const vendor = await Vendor.findById({_id})
        res.send(vendor)

    }catch(e){
        res.status(500).send(e)
    }
 
})

router.patch('/vendors/me', auth ,async (req,res)=>{
    
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName','lastName','contact','address','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){

        return res.status(400).send({error:'Invalid updates'})

    }
    try{
        updates.forEach((update) =>
        req.vendor[update] = req.body[update])
    await req.vendor.save()
    res.send(req.vendor)

    }catch(e){
        res.status(400).send(e)
    }
    
   })


//update vendor

router.patch('/vendor/:id', auth,async (req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','password','age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})

    }
    
    try{
        const vendor = await Vendor.findById(_id)

        updates.forEach((update) =>
            vendor[update] = req.body[update]

        )
        await vendor.save();

        // const vendor = await Vendor.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators: true})
        
        if(!vendor){
            console.log("inside not found")
            return res.status(404).send()
        }
        res.status(200).send(vendor)
    }catch(e){
        
            res.status(500).send(e)
            console.log(e)
    }
 
})

router.delete('/vendor/me',auth,async(req,res)=>{
    try{
        await req.vendor.remove()
        res.send(req.vendor)
    }catch(e){
        res.status(400).send()
    }
})





//delete vendor later should change to me


router.delete('/vendor/:id', auth,async (req,res)=>{
    const _id = req.params.id
    
    try{
        const vendor = await Vendor.findByIdAndDelete(req.params.id)
        if(!vendor){
            res.status(404).send()
        }
        res.send(vendor)

    }catch(e){
        res.status(500).send(e)
    }
 
})




module.exports = router