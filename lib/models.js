const {
    DataTypes,
    Model
} = require('sequelize');
const sequelize = require('./database');
const {
    company,
    projects,
    users
} = require('./data')
const bcrypt = require('bcryptjs');

class CompanyModel extends Model {}
class ProjectModel extends Model {}
class UserModel extends Model {}
class ImagesModel extends Model {}

CompanyModel.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    tagline: {
        type: DataTypes.STRING
    },
    box: {
        type: DataTypes.STRING
    },
    mobile: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    history: {
        type: DataTypes.TEXT('long')
    },
    vision: {
        type: DataTypes.TEXT('long')
    },
    mission: {
        type: DataTypes.TEXT('long')
    },
    objective: {
        type: DataTypes.TEXT('long')
    },
    values: {
        type: DataTypes.STRING
    },
    logo: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'company',
    freezeTableName: true
});

ProjectModel.init({
    location: {
        type: DataTypes.STRING
    },
    client: {
        type: DataTypes.STRING,
        unique: true
    },
    cost: {
        type: DataTypes.INTEGER
    },
    duration: DataTypes.STRING,
    year: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'project',
    timestamps: false,
    freezeTableName: true
});

UserModel.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'user'
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'auth',
    freezeTableName: true
});
ImagesModel.init({
    name: {
        type: DataTypes.STRING,
        unique: true
    },
    category: DataTypes.STRING,
    classification: DataTypes.STRING,
    caption:DataTypes.STRING
}, {
    sequelize,
    modelName: 'images',
    freezeTableName: true

});

ProjectModel.hasMany(ImagesModel);

// emit handling:
// sequelize.drop({
//     force: true
// }).then(() => {
//     sequelize.sync().then(() => loadData())
// }).catch(err => console.error(err))


const loadData = () => {
    CompanyModel.create(company);
    projects.forEach(project => ProjectModel.create(project));
    users.forEach(user => {
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            console.log(user);
            UserModel.create(user);

        })

    });

    for (let index = 1; index < 88; index++) {
        ImagesModel.create({
            name: `${index}.jpg`,
            classification: "finishes",
            projectId: 1
        })
    }
    ImagesModel.update({category:'kitchen'}, {where:{
        id:1
    }})

}

const models = {
    CompanyModel,
    UserModel,
    ProjectModel,
    ImagesModel
}

module.exports = models