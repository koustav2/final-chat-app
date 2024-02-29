const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
// const { ApiError } = require("../utils/apiError");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized! Access Token was expired!" });
    }
    return res.sendStatus(401).send({ message: "Unauthorized!" });
}

exports.verifyToken = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }
        // const decoded = jwt.verify(token, process.env.JWT_SECRET)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return catchError(err, res);
            }
            req.user = decoded
            next();
        });
    } catch (error) {
        return catchError(error, res);
    }
});