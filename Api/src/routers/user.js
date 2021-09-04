const express = require('express')
const router = new express.Router()

const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')



// Add token part and add users

router.post('/users/register', async (req, res) => {
debugger;
    const userIn = new User(req.body)
        try{
           await userIn.save()
           const token = await userIn.generateToken()
           res.status(200).send({userIn,token})
        }
        catch(e){
            res.status(400).send(e)
        }
     
})

// ==================================================/users/login===============================

// Login
router.post('/users/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.send({user,token})
    }
    catch(e){
        res.send('Try again ' + e)
    }
})

// ==================================================get all===============================

// get all

router.get('/users',auth, (req, res) => {
    User.find({}).then((users) => {
        res.status(200).send(users)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// ================================================== ===============================


router.get('/profile',auth,(req,res)=>{
    res.send(req.user)
})


// ==================================================get by id ===============================

// get by id 
router.get('/users/:id',auth, (req, res) => {
    console.log(req.params.id)

    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send('Unable to find user')
        }
        res.status(200).send(user)
    }).catch((e) => {
        res.status(500).send('Unable to connect to data base' + e)
    })
})

// ================================================== Update ===============================

// Update
router.patch("/users/:id",auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const _id = req.params.id;
    try {
       
        const user = await User.findById(_id)
       
        if (!user) {
            return res.send("No user is found");
        }
        updates.forEach((update) => user[update] = req.body[update])
        await user.save();

        res.status(200).send(user);
    } catch (e) {
        res.status(400).send('Error' + e);
    }
});

// ================================================== logout ===============================

// logout

router.delete('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((el)=>{
      
            return el.token !== req.token
        })
        await req.user.save()
        res.send('Logout Successfully')
    }
    catch(e){
        res.send(e)
    }
})

// ================================================== logoutAll ===============================

//logoutAll

router.delete('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('Logout all was done succesfully')
    }
    catch(e){
        res.send(e)
    }
})

// ==================================================  ===============================


// Delete 
router.delete('/users/:id',auth, async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.send('No user is found')
        }
        res.send(user)
    }
    catch (e) {
        res.send(e)
    }
})



///////////////////////////////////////////////////////////////////////////////////


// Profile Image



const upload = multer({
    limits:{
        fileSize: 1000000   // 1 M 
    },
    fileFilter(req,file,cb){
       
       if(!file.originalname.match(/\.(jpg|jpeg|png|jfif)$/)){
          return  cb(new Error('Please upload an image'))
        } 
        cb(null, true)  
    }
})

router.post('/profile/avatar',auth,upload.single('image'),async(req,res)=>{
    try{
        req.user.avatar = req.file.buffer
        await req.user.save()
        res.send('Image uploaded')
    }
    catch(e){
        res.send(e)
    }
})




module.exports = router