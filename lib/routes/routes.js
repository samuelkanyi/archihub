const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Op= sequelize.Op;
const {
    CompanyModel,
    ProjectModel,
    ImagesModel,
    UserModel
} = require('../models')


//get routes
router.get('/', async (req, res) => {
    const images =await ImagesModel.findAll({
        where: {
            category: {
                [Op.ne]: null
            }
        }
    })
    const company= await CompanyModel.findOne();

    const categories = await ImagesModel.findAll({
        where:{
            category:{
                [Op.ne]: null
            }
        },
        attributes:[[sequelize.fn('DISTINCT', sequelize.col('category')), 'category']]
    
    })
    console.log(categories.map(category=>category.category))

    // const categories = ImagesModel.aggregate('category', 'DISTINCT', {plain:false})
    return res.render('home', {
        'images': images.map(image=>image.toJSON()),
        'company': company.toJSON(),
        'categories':categories.map(category=>category.category)
    })

})

router.get('/about', (req, res) => {
    return res.render("about");
})


router.get('/contact', (req, res) => {
    return res.render("contact");
})

router.get('/gallery', (req, res) => {
    return res.render("gallery");
})


//getters for dev purposes

router.get('/get/company', (req, res) => {
    CompanyModel.findAll().then(companies => res.json(companies))
});

router.get('/get/projects', (req, res) => {
    ProjectModel.findAll().then(companies => res.json(companies))
});

router.get('/get/images/:id', (req, res) => {
    ImagesModel.findByPk(parseInt(req.params.id)).then(image => res.json(image)).catch(err => console.error(err))
});

router.get('/get/users', (req, res) => {
    UserModel.findAll().then(companies => res.json(companies))
});

module.exports = router