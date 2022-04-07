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
    findUserById: (id) => {
        return User.findOne({_id: id})
    },
    deleteUserById: (id) => {
        return User.findByIdAndDelete(id);
    },
    findAndupdateById: (id, data) => {
        return User.findByIdAndUpdate(id, data);
    }
}