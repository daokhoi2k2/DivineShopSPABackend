const User = require("../schema/user.schema");

module.exports = {
    getAllUsers: () => {
        return User.find();
    },
    createUser: (newUser) => {
        return User.create(newUser)
    },
    findUserByEmailOrUsername: (info) => {
        return User.findOne({$or: [{username: info}, {email: info}]})
    },
    deleteUserById: (id) => {
        return User.findByIdAndDelete(id);
    }
}