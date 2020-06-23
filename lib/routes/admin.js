const express = require('express');
const router = express.Router();
const {
    ImagesModel,
    ProjectModel,
    CompanyModel,
    UserModel
} = require('../models');
const multer = require('multer')
const path = require('path')


//setup multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../../assets/images"))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
})



router.get('/', async (req, res) => {
    const images = await ImagesModel.findAll({
        where: {
            category: null
        },
        attributes: ['id', 'name']
    });
    const company = await CompanyModel.findOne({
        attributes: ['name', 'tagline', 'box', 'mobile', 'email', 'history', 'vision', 'mission', 'objective']
    })
    res.render('admin', {
        "images": images.map(image => image.toJSON()),
        'company': company.toJSON()
    });
})

//update requests
router.put('/company', (req, res) => {
    CompanyModel.update(req.body, {
            where: {
                id: parseInt(req.body.id)
            }
        }).then(update => res.status(301).redirect('/admin'))
        .catch(err => console.error())
});

router.post('/company', (req, res) => {
    // new CompanyModel(company).save().then(onFulfill => console.log(company)).catch(err =>console.error(err))
});


router.put('project', (req, res) => {
    ProjetModel.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then()
        .catch(err => console.error(err))
})

//post requests
router.post('/project', upload.single('avatar'), (req, res) => {
    req.body.image = req.file.originalname
    new ProjectModel(req.body).save()
        .then(() => res.status(201).redirect('/admin'))
        .catch(err => console.error(err))
})


router.post('/images/finish', upload.single('avatar'), (req, res) => {
    req.body.name = req.file.originalname
    req.body.classification = "finishes"
    req.body.projectId = 1

    new ImagesModel(req.body)
        .save()
        .then(fulfill => res.redirect('/admin'))
        .catch(err => console.error(err))
});


router.put('/images', (req, res) => {
    ImagesModel.update(req.body, {
            where: {
                id: parseInt(req.body.id)
            }
        }).then(() => res.status(201))
        .then(() => res.redirect('/admin'))
        .catch(err => console.error(err))
})

router.delete('/image/:id', (req, res) => {
    console.log(req.params);

    ImagesModel.destroy({
        where: {
            id: parseInt(req.params.id)
        }
    }).then(() => res.status(301).json({
        'message': "deleted"
    }))
})

router.post('/images', (req, res) => {


})




module.exports = router;