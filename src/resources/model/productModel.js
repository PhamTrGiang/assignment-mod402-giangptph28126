const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name:{
        type:'String',
        require: true,
    },
    price:{
        type:'String',
        require: true,
    },
    image:{
        type:'String',
        require: true,
    },
    color:{
        type:'String',
        require: true,
    },
    type:{
        type:'String',
        require: true,
    },
    userId:{
        type:'String',
        require: true,
    },
    userName:{
        type:'String',
        require: true,
    },
});

const productModel = mongoose.model('product',productSchema);
module.exports = productModel;