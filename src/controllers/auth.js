// import model
const {user} = require ('../../models')

//import joi for validation
const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async(req,res) => {
        const data = ({
            name : req.body.name,
            email : req.body.email,
            password: req.body.password,
            jumlahBuku : 0,            
        })

        const schema = Joi.object({
            name: Joi.string().min(5).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            jumlahBuku : Joi.number()
        })

        const {error} = schema.validate(data);

        if (error){
            return res.status(400).send({
                error:{
                    message : error.details[0].message, 
                }
            })
        }
        try {
        //jika sudah ada email
        const isAlready = await user.findOne({
            where:{
                email: data.email,
            }
        })

        if (isAlready){
            return res.send({
                error:{
                    message:`Account ${data.email} is Already`,
                }
            });
        }
        const hashedPassword = await bcrypt.hash(data.password, 10)

        // //tambah ke dataabase
        const newUser = await user.create({
            name: data.name,
            email:data.email,
            password: hashedPassword,
            jumlahBuku:data.jumlahBuku,
        })

        res.status(200).send({
            message:'register success',
            data : {
                name : newUser.name,
                email : newUser.email,
            }         
        })


    } catch (error) {
        console.log(error);
        res.send({
            status : "Failed",
            message : "Server error"
        })
    }

}


exports.login = async(req,res) => {
        try {
            const data = req.body
    
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
            })
    
            const {error} = schema.validate(data);
    
            if (error){
                return res.send({
                    error:{
                        message : error.details[0].message, 
                    }
                })
            }
    
            //jika sudah ada email
            const userExist = await user.findOne({
                where:{
                    email: data.email,
                }
            })

            if (!userExist){
                return res.send({
                    error:{
                        message:`Email or Password not match`,
                    }
                });
            }

            const isValid = await bcrypt.compare(req.body.password, userExist.password)

            if(!isValid){
                return res.send({
                    error: {
                        message: `Email or Password not match!`
                    }
                })
            }

            const payload = {
                id: userExist.id,
                name : userExist.name,
                email : userExist.email,
            }


            const token = jwt.sign(payload,process.env.TOKEN_KEY)
            res.status(200).send({
                status:'Login success',
                data : {
                    name : userExist.name,
                    email : userExist.email,
                    token,
                }         
            })
    
    
        } catch (error) {
            console.log(error);
            res.send({
                status : "Failed",
                message : "Server error"
            })
        }
    
}
    
