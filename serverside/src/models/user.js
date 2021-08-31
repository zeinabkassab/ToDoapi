const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true      
    },
  
    email:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String, 
        required:true,
        trim:true,
        minLength:6
    },

    
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],

    avatar:{
        type:Buffer
    }
})

// === === === === === === === === === Relation === === === === === === === ===

// Relation
userSchema.virtual('tasks',{
    ref:'todo',    // Name of model which i am making relation with
    localField:'_id',
    foreignField:'owner'
})



// === === === === === === === === === Hash password === === === === === === === ===

// Hash password before saving

userSchema.pre('save',async function(next){
    // this document 
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})


userSchema.statics.findByCredentials = async(email,password) =>{
    const user = await User.findOne({email})
    console.log(user)

    if(!user){
        throw new Error('Unable to login. Please check email or password')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login. Please check email or password')
    }

    return user
}

// === === === === === === === === ===  Create token === === === === === === === ===


// Create token

userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()},'ToDo-api',{expiresIn:'7 days'})

    user.tokens = user.tokens.concat({token:token})
    await user.save()

    return token
}




const User = mongoose.model('User',userSchema)
module.exports = User