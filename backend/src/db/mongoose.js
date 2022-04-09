const mongoose = require('mongoose')

/* Local mongodb://localhost:27017/webAppv3
   DB Atlas mongodb+srv://expoadmin:expoadmin123@cluster0.lqrpt.mongodb.net/expo-api?retryWrites=true */

mongoose.connect(process.env.MDB_CONNECT_URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    userFindAndModify: false
})

