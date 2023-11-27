const mongoose = require('mongoose')

const StoreSchema = mongoose.Schema({

    name:{
        type:String
    },
    stock:{
        type:Number
    },
    inStock:{
        type:Boolean,
        default:true
    },
    differentColours:{
        type:Boolean,
        default:true
    },
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customers'
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'shops'

    }


})


module.exports = mongoose.model('shops',StoreSchema)