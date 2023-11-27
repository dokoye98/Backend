const jsonwebtoken = require('jsonwebtoken')


function val(req,res,next){
    const token = req.header('login-key')
    if(!token){
        console.log('no account')
        return res.stauts(400).send({message:'Please make an account'})
    }
    try{
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_KEY)
        req.user = verified
        next()
    }catch(err){
        return res.status(400).send({message:'Error signing in... Try again later'})
    }

}
function acc(req,res,next){
    const key =  req.header('admin')
    if(!key){
        return res.stauts(400).send({message:'Access denied'})
    }
    try{
        const verified = jsonwebtoken.verify(token,process.env.ADMIN_KEY)
        req.user = verified
        next()
    }catch(err){
        return res.status(400).send({message:'Error signing in... Try again later'})
    }
}
module.exports = val

