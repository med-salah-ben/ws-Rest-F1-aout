const express = require("express");
const router = express.Router();

const controllers = require("../Controllers/contactControllers");
const Contact = require("../model/Contact");

//test Routing
router.get("/hello",(req,res)=>{
    res.send("hello routing")
})

// post Contact 
router.post("/addContact",controllers.postContact)

router.get('/',async(req,res)=>{
    try {
        const result = await Contact.find();
        res.status(200).send({response:result, message:"getting contacts successfully "})
    } catch (error) {
        res.status(500).send({message:"can not get contacts..."})
    }
})

//get One Contact With ID
//Get Method 
// url : http://localhost:4000/api/contact/:id
// params id

router.get('/:id',async (req, res)=>{
    try {
        const result = await Contact.findOne({_id:req.params.id})
        res.send({response:result , message : "getting contact with id successfully"})
    } catch (error) {
        res.status(400).send({message:"there is no contact with this id"})
    }
})

//Delete Contact with ID
//delete Method 
// url : http://localhost:4000/api/contact/:id
// params id

router.delete("/:id", async (req,res)=>{
    try {
        const result = await Contact.deleteOne({_id:req.params.id})
        result ? res.status(200).send({message:"Contact deleted ..."})
        : res.status(400).send({message:"there is no contact with this id..."})
    } catch (error) {
        res.status(500).send({message:"server error ...."})
    }
})

//Update Contact with ID
//put Method 
// url : http://localhost:4000/api/contact/:id
// params id

router.put('/:id', async (req,res)=>{
    try {
        const id = req.params.id
        const result = await Contact.updateOne({_id:id},{$set:{...req.body}})
        // const getContact =await Contact.findOne({_id:id})
        result ? res.status(200).send({message:"Contact Updated ..."})
        : res.status(400).send({message:"there is no contact with this id..."})

    } catch (error) {
        res.status(500).send({message:"server error ...."})
    }
})

module.exports = router