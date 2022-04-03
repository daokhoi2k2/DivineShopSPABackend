const userModel = require("../model/user.model");
module.exports = {
    getAllUser: async (req, res) => {
        try {
            console.log("[USER]", req.user);
            const users = await userModel.getAllUsers();
            res.status(200).json(users);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    getUserById: (req, res) => {
        const id = req.params.id;

        res.status(200).json(id);
    },
    deleteUserById: async (req, res) => {
        try {
            const id = req.params.id;
            await userModel.deleteUserById(id);
            
            res.status(200).json(id);
        } catch(err) {
            res.status(500).json(err);
        }
    }
}