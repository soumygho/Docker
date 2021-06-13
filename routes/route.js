const express = require('express');
const router = express.Router();
const Contact = require('../models/contacts');
//retreiving contacts
router.get('/contacts',function(req,res,next){
    Contact.find(function(err,contacts){
        res.json(contacts);
    });
});

//add contact
router.post('/contact',function(req,res,next){
    //console.log(req);
    let newContact = new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone:req.body.phone
    });
    if(req.body._id === undefined)
    {
        newContact.save(function(err,contact){
            if(err)
            {
                res.json({msg:'Failed to add contact'+err});
            }
            else{
                res.json({msg:'Contact added successfully'});
            }
        });
    }
    else
    {
        var query = {'_id': req.body._id};
        newContact._id = req.body._id;
        Contact.findOneAndUpdate(query,newContact,{upsert: false}, function(err, contact) {
            if(err)
            {
                res.json({msg:'Failed to add contact'+err});
            }
            else{
                res.json({msg:'Contact added successfully'});
            }
        });
    }
    
});


//delete contacts
router.delete('/contact/:id',function(req,res,next){
    Contact.remove({_id:req.params.id},function(err,result){
        if(err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
});


module.exports = router;
