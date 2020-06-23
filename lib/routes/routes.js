const express = require('express');
const router = express.Router();
const sequelize = require('sequelize');
const Op = sequelize.Op;
const {
    CompanyModel,
    ProjectModel,
    ImagesModel,
    UserModel
} = require('../models')


//get routes
router.get('/', async (req, res) => {
    const images = await ImagesModel.findAll({
        where: {
            category: {
                [Op.ne]: null
            }
        }
    })
    const company = await CompanyModel.findOne();

    const categories = await ImagesModel.findAll({
        where: {
            category: {
                [Op.ne]: null
            }
        },
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('category')), 'category']
        ]

    })


    const projects = await ProjectModel.findAll({
        where: {
            image: {
                [Op.ne]: ''
            }
        },
        limit: 4
    })

    // const categories = ImagesModel.aggregate('category', 'DISTINCT', {plain:false})
    return res.render('home', {
        'images': images.map(image => image.toJSON()),
        'company': company.toJSON(),
        'categories': categories.map(category => category.category),
        'projects': projects.map(project => project.toJSON())
    })

})

router.get('/projects', async (req, res) => {
    const projects = await ProjectModel.findAll({
        where: {
            image: {
                [Op.ne]: ''
            }
        }
    });

    const finishes = await ImagesModel.findAll({
        where: {
            category: {
                [Op.ne]: null
            }
        }
    })

    const company = await CompanyModel.findOne()
    const obj = {

    };
    const categories = finishes.map(finish => finish.category)
    new Set(categories).forEach(item => obj[item] = [])

    finishes.forEach(finish => {
        obj[finish.category].push({
            name: finish.name,
            caption: finish.caption
        })
    })

    return res.render("project", {
        'projects': projects.map(project => project.toJSON()),
        'finishes':obj,
        'company':company.toJSON()
    });
})


router.get('/contact', async (req, res) => {
    const company = await CompanyModel.findOne();
    return res.render("contact", {
        'company': company.toJSON({
            attributes: ['name', 'tagline', 'box', 'mobile', 'email']
        })
    });
})

router.get('/gallery', async(req, res) => {
    const images= await ImagesModel.findAll({
        attributes:['id','name', 'caption']
    })
    return res.render("gallery", {
        'images': images.map(image => image.toJSON())    
    });
})


//getters for dev purposes

router.get('/get/company', (req, res) => {
    CompanyModel.findAll().then(companies => res.json(companies))
});

router.get('/get/projects/:id', (req, res) => {
    ProjectModel.findByPk(parseInt(req.params.id)).then(project => res.json(project))
});

router.get('/get/images/:id', (req, res) => {
    ImagesModel.findByPk(parseInt(req.params.id)).then(image => res.json(image)).catch(err => console.error(err))
});

router.get('/get/users', (req, res) => {
    UserModel.findAll().then(companies => res.json(companies))
});

module.exports = router