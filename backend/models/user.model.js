
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        return next()
    } catch (err) {
        return next(err)
    }
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function () {
    // console.log('Generating token for user', this._id); // Add logging
    try {
        const token = jwt.sign({
            _id: this._id,
            username: this.username,
            email: this.email,
        },
            process.env.JWT_SECRET,

            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            });

        // console.log('Generated access token: ', token); // Add logging
        return token;
    } catch (error) {
        console.error('Failed to generate token: ', error); // Add error logging
        throw error;
    }
}

userSchema.methods.generateRefreshToken = function () {
    // console.log('Generating refresh token for user', this._id); // Add logging
    try {
        const refreshToken = jwt.sign({
            _id: this._id,
        },
            process.env.JWT_REFRESH_SECRET,

            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            });

        // console.log('Generated refresh token: ', refreshToken); // Add logging
        return refreshToken;
    } catch (error) {
        console.error('Failed to generate refresh token: ', error); // Add error logging
        throw error;
    }
}


const User = mongoose.model("User", userSchema)

module.exports = User