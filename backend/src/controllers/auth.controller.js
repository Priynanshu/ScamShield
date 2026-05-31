const userModel = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const jwt = require('jsonwebtoken');
const cookies = require('cookie-parser');
const bcrypt = require('bcrypt');

const register = async (req, res, next) => {
    try {
        const { username, email, location, password } = req.body;

        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            throw new ApiError(400, "User with this email already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            username,
            email,
            location,
            password: hashedPassword
        })

        const token = jwt.sign({
            userId: newUser._id
        }, process.env.JWT_SECRET, { expiresIn: '10h' });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 10 * 60 * 60 * 1000, // 10 hours
        })

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                username: newUser.username,
                email: newUser.email,
                location: newUser.location,
            },
            token
        })
    }catch(err) {
        console.log(err)
        next(err)
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log("hello one");

        const user = await userModel
            .findOne({ email })
            .select("+password");

        console.log("hello two");

        if (!user) {
            throw new ApiError(404, "Invalid Credentials");
        }

        const verifiedPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!verifiedPassword) {
            throw new ApiError(400, "Invalid Credentials");
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "10h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 10 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                username: user.username,
                email: user.email,
                location: user.location,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
};

const getMe = async (req, res, next) => {
    try {
        const userId = req.user.userId
        const user = await userModel.findById(userId)

        if(!user) {
            throw new ApiError(404, "User not found")
        }

        return res.status(200).json({
            message: "User details fetched successfully",
            user: {
                username: user.username,
                email: user.email,
                location: user.location,
            }
        })
    }catch (err) {
        next(err)
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        })
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }catch (err) {
        next(err)
    }
}

const googleCallback = (req, res) => {
  try {
    const user = req.user;

    // 1. Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // 2. ❌ DON'T DO THIS: res.json(...) 
    // Isse browser mein sirf text dikhega, app load nahi hogi.

    // 3. ✅ DO THIS: Redirect to Frontend AuthSuccess page
    // Hum token ko URL mein bhejenge taaki humara React component usey read kar sake
    const frontendURL = `http://localhost:5173/auth-success?token=${token}`;
    
    res.redirect(frontendURL);

  } catch (error) {
    console.error("Google Auth Error:", error);
    res.redirect(`http://localhost:5173/login?error=auth_failed`);
  }
};

module.exports = {
    register,
    login,
    getMe,
    logout,
    googleCallback
}
