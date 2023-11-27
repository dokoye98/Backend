const joi = require('joi')


const signUpValidation = (data)=>{

    const SchemaValidation = joi.object({
        firstname:joi.string().required().min(1).max(256),
        lastname:joi.string().required().min(1).max(256),
        username:joi.string().required().min(6).max(256),
        email:joi.string().required().min(6).max(256).email(),
        password:joi.string().required().min(6).max(1056),
        phone:joi.string().required().length(11)
        
    })
    return SchemaValidation.validate(data)

}

const loginValidation = (data)=>{
    const SchemaValidation = joi.object({
        username:joi.string().required().min(6).max(256),
        password:joi.string().required().min(6).max(1056)
    })
    return SchemaValidation.validate(data)
}


module.exports.loginValidation = loginValidation
module.exports.signUpValidation = signUpValidation