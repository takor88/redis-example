module.exports = (sequelize, DataTypes) =>{
    return sequelize.define('test',{
        name:{
            type:DataTypes.STRING(20)
        },
        address:{
            type:DataTypes.STRING(50)
        },
        company:{
            type:DataTypes.STRING(20)
        },
        jobtitle:{
            type:DataTypes.STRING(20)
        }
    })
}