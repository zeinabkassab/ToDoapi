const express = require('express')
const ToDo = require('../models/todo')
const router = new express.Router()
const auth = require('../middleware/auth')


   // post
router.post('/todo',auth,async(req,res)=>{
   
    const todo = new ToDo({...req.body,owner:req.user._id})
    try{
        await todo.save()
        res.status(200).send(todo)
    }
    catch(e){
        res.status(400).send(e)
    }
})

// get all

router.get('/todo',auth,async(req,res)=>{
    try{
       await req.user.populate('todo').execPopulate()
       res.send(req.user.tasks)
    }
    catch(e){
        res.status(500).send(e)
    }
})

// get by id

router.get('/todo/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
       
        const todo = await ToDo.findOne({_id,owner:req.user._id})
        if(!todo){
            return res.status(404).send('ToDO not found')
        }
        res.status(200).send(todo)
    }
    catch(e){
        res.status(500).send(e)
    }
})

// patch
router.patch('/todo/:id',auth,async(req,res)=>{
    const _id = req.params.id
    const updates = Object.keys(req.body)
    try{
       
        const todo = await Task.findOne({_id,owner:req.user._id})
        if(!todo){
            return res.status(404).send('ToDO is not found')
        }
        updates.forEach((update)=> todo[update] = req.body[update])
        await todo.save()
        res.send(todo)
    }
    catch(e){
        res.status(400).send(e)
    }

})

// Delete
router.delete('/todo/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try{
        const todo = await ToDO.findOneAndDelete({_id,owner:req.user._id})
        if(!todo){
            return res.status(404).send('ToDO is not found')
        }
        res.send(todo)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router