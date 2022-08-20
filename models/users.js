// followed exercise for REST API auth Express
"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class User extends Model {}
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "First name cannot be empty"
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Last name cannot be empty"
          }
        }
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email cannot be empty"
          },
          isEmail: {
            msg: "Please provide a valid email address"
          }
        },
        unique: {
          msg: "Email you entered is already in our database"
        },
        
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password cannot be empty"
          }
        }
      },
    },
    { sequelize }
  );
//   userId (created in the model associations with the foreignKey property, and equals the id from the Courses table)
  User.associate = (models) => {
    User.hasMany(models.Course, {
        // creating alias
      as: "user",
      foreignKey: {
        fieldName: "userId",
        allowNull: false,
      },
    });
  };
  return User;
};
