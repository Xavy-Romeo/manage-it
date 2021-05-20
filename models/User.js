const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // set up method to run on instance datat (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
User.init(
    {
        // Table Column Defnitions go here
        id: {
            // use the special Sequelize DataTypes object provide what wtype of data it is
            type: DataTypes.INTEGER,
            // this is the equivalent of SQL's `NOT NULL` option
            allowNull: false,
            // instruct that this is the primary key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // define an email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // there cannot be any duplicate email values in this table
            unique: true,
            // if allowNull is set to falze, we can run our data through validators before creating a data table
            validate: {
                isEmail:true
            }

        },
        // define a psssword column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be atleast four characters long
                len: [4]
            }
        },
        phone_number: {
            type: DataTypes.BIGINT,
            allowNull: false,
            validate: {
                // this means the password must be 10 characters long
                min: 999999999,
                isNumeric: true
            }
        }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            }
          },
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // pass in our imported sequielize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // dont pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
        underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user'
    }
);

module.exports = User;