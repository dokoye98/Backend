const express = require('express')
const router = express()
const bcryptjs = require('bcryptjs')
const Shop = require('../model/Store')



router.get('/Inventory',async(req,res)=>{
    try{
        const allInventory = await Shop.find()
        res.status(200).send(allInventory)
    }catch(err){
        res.status(400).send({message:'HomePage unavaliable'})
    }
})





module.exports = router