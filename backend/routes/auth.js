const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'secretismarvelandkohliforever';

// ROUTE 1 : create a user using: POST "/api/auth/createUser". No login required
router.post('/createUser', [
    body("name", "Enter a valid name").exists(),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) =>
{
    try {
        // If there are errors, then return Bad request and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        })
            .then(data =>
            {
                const payloadData = {
                    user: {
                        id: data._id
                    }
                }
                const authToken = jwt.sign(payloadData, JWT_SECRET);
                console.log(authToken);
                res.send(data);
            })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ROUTE 2 : Authenticate a user using: POST "/api/auth/login".
router.post('/login', [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be empty").exists(),
], async (req, res) =>
{
    // If there are errors, then return Bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please login with correct credentials" });
        }

        const payloadData = {
            user: {
                id: user._id
            }
        }
        const authToken = jwt.sign(payloadData, JWT_SECRET);
        console.log(authToken);
        res.send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// ROUTE 3 : Get Loggedin user details using: GET "/api/auth/getuser". Login required
router.get('/getuser', fetchuser, async (req, res) =>
{
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password")
            .then((data) =>
            {
                res.send(data);
            })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;