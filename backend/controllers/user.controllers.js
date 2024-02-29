const User = require("../models/user.model.js");
const ApiError = require("../utils/apiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");
const { deleteCloudinaryImage, uploadImageToCloudinary } = require("../utils/cloudinary/cloudinary.js");

export const generateAccessAndRefreshtokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = await user.generateToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({
            validateBeforeSave: false
        })
        return { accessToken, refreshToken }
    } catch (err) {
        throw new ApiError(500, "Token generation failed")
    }
}

export const register = asyncHandler(async (req, res, next) => {
    const {  email, username, password } = req.body
    if (
        [email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    if (email?.trim() === "" || !email?.includes("@")) {
        throw new ApiError(400, "Invalid email")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadImageToCloudinary(avatarLocalPath)
    if (!avatar) {
        throw new ApiError(500, "Avatar upload failed")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        email: email.toLowerCase(),
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken") // the fields we don't want to return
    if (!createdUser) {
        throw new ApiError(500, "User creation failed")
    }


    res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )

});

export const login = asyncHandler(async (req, res, next) => {

    const { email, username, password } = req.body
    console.log(email);

    if (!(username || email)) {
        throw new ApiError(400, "Either username or email is required");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(400, "user does not exist");
    }
    const matchPassword = await user.comparePassword(password);

    if (!matchPassword) {
        throw new ApiError(401, "password is incorrect");
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshtokens(user._id)


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res
        .status(200)
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        })
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
        })
        .json(
            new ApiResponse(200, { accessToken, loggedInUser, refreshToken }, "User logged in successfully")
        )
});

export const logout = asyncHandler(async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $set: {
                refreshToken: undefined
            }
        },
            {
                new: true
            }
        )
        const option = {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now()),
        }
        req.user = null
        res.clearCookie("accessToken", option)
        res.clearCookie("refreshToken", option)
        res.status(200).json(
            new ApiResponse(200, {}, "User logged out successfully")
        )
    } catch (err) {
        throw new ApiError(500, "Logout failed", err)
    }
});
