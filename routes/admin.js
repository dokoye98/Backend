const express = require('express')
const router =  express()
const {loginValidation, signUpValidation} = require('../validations/validation')
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const Admin = require('../model/Admin')
const Customer = require('../model/Customer')


router.post('/signup',async(req,res)=>{


    const {error} = signUpValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }

    const emailCheck =  await Admin.findOne({email:req.body.email})
    const emailCheck1 = await Customer.findOne({email:req.body.email})
    
    if(emailCheck || emailCheck1){
        return res.status(400).send({message:'Account already assigned to this email'})
    }
    const userCheck = await Admin.findOne({username:req.body.username})
    const userCheck1 = await Customer.findOne({username:req.body.username})
    if(userCheck || userCheck1){
        return res.status(400).send({message:'Account already assigned to this username'})
    }
const salt = await bcryptjs.genSalt(5)

const hashfirstname = await bcryptjs.hash(req.body.firstname,salt)
const hashlastname = await bcryptjs.hash(req.body.lastname,salt)
const hashpassword = await bcryptjs.hash(req.body.password,salt)

const hashPhone = await bcryptjs.hash(req.body.phone, salt)

const dataFormat = new Admin({
    firstname:hashfirstname,
    lastname:hashlastname,
    username:req.body.username,
    email:req.body.email,
    password:hashpassword,
    phone:hashPhone

})
console.log('save')
try{
    const newUser = await dataFormat.save()
    console.log('sign up complete')
    return res.status(200).send({message:'please log in',newUser})

}catch(err){
    return res.status(400).send({message:'error signing up apologies'})
}
})

router.post('/login',async(req,res)=>{
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send({message:error['details'][0]['message']})
    }
    const userCheck = await Admin.findOne({username:req.body.username})
    if(!userCheck){
        console.log('no user')
        return res.status(400).send({message:'please sign in'})
    }

    const passwordCheck = await bcryptjs.compare(req.body.password,userCheck.password)
    if(!passwordCheck){
        console.log('wrong password')
        return res.status(400).send({message:'Invalid password'})
    }
    const token = jsonwebtoken.sign({_id:userCheck._id},process.env.TOKEN_KEY)
    res.header('admin',token).send({'admin':token})
})

module.exports = router