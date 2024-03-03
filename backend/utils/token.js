const User = require("../models/user.model");
const { ApiError } = require("./apiError");

module.exports.generateAccessAndRefreshtokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        const accessToken = await user.generateToken();
        if (!accessToken) {
            throw new ApiError(500, "Token generation failed");
        }
        const refreshToken = await user.generateRefreshToken();
        if (!refreshToken) {
           throw new ApiError(500, "Token generation failed");
        }
        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });
        return { accessToken, refreshToken };
    } catch (err) {
        console.log(err); // log the error for debugging
        throw new ApiError(500, "Token generation failed");
    }
};
