const express = require('express');
const router = express.Router();
const {ImagesModel} = require('../models');


//update requests
router.put('/company', (req, res)=>{
    // CompanyModel.update(req.body, {
    //     where:{
    //         id:req.body.id
    //     }
    // }).then(update=>{
    //     if (update > 0)return true
    // })
    // .catch(err =>console.error())
});

router.post('/company', (req, res)=>{
    // new CompanyModel(company).save().then(onFulfill => console.log(company)).catch(err =>console.error(err))
});


router.put('project', (req, res)=>{
    ProjetModel.update(req.body,{
        where:{
            id:req.body.id
        }
    }).then()
    .catch(err=>console.error(err))
})

//post requests
router.post('/project', (req, res)=>{
    // ProjetModel.findOrCreate({where:{
    //     client:req.body.client
    // }}).then(([project, created])=>{
    //     console.log(created);
    //     return res.json(project);        
    // })

    // projects.forEach(project=>{
    //     new ProjectModel(project).save().then(p=> console.log(p)).catch(err =>console.error(err))
    // })
})
 


router.put('/images', (req, res)=>{
    ImagesModel.update(req.body,{
        where:{
            id:parseInt(req.body.id)
        }
    }).then(()=>res.status(201))
    .then(()=>res.redirect('/admin/images'))
    .catch(err=>console.error(err))
})

router.delete('/image/:id', (req, res)=>{
    console.log(req.params);
    
    ImagesModel.destroy({where:{
        id:parseInt(req.params.id)
    }}).then(()=>res.status(301).json({'message':"deleted"}))
})

router.post('/images', (req,res)=>{
   
   
})

router.get('/images', async (req, res)=>{
    const images = await ImagesModel.findAll({
        where:{
        category:null
    }, attributes: ['id','name']});
    
    res.render('admin', {"images": images.map(image=> image.toJSON())});
})



module.exports = router;