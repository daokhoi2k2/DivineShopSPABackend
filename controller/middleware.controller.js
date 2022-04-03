const jwt = require("jsonwebtoken");

const middlewareController = {
    // verifyToken
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if(token) {
            // Bearer <Token>
            const accessToken = token.split(" ")[1];
            return jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if(err) {
                    return res.status(403).json("Token is not valid");
                }

                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },
    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if(req.user) {
                const isAdmin = req.user.role === 1;
                
                if(isAdmin) {
                    return next();
                } else {
                    res.status(403).json("You don't have permission");
                }
            }
        })
    }
}

module.exports = middlewareController;