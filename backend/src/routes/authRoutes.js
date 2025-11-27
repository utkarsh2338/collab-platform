const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validation');
const passport = require("../config/passport");


const { forgotPassword, resetPassword } = authController;




router.post(
    '/register',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    validate,
    authController.register
);


router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists(),
    ],
    validate,
    authController.login
);

router.get('/me', auth, authController.getMe);


router.post(
    '/forgot-password',
    [check("email", "Please include a valid email").isEmail()],
    validate,
    forgotPassword
);


router.post(
    '/reset-password/:token',
    [check("password", "Password must be at least 6 characters").isLength({ min: 6 })],
    validate,
    resetPassword
);


router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);


router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login`,
    }),
    (req, res) => {
        const token = req.user.token;
        const redirectUrl = `${process.env.CLIENT_URL}/oauth-success?token=${token}`;
        res.redirect(redirectUrl);
    }
);



router.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
    "/github/callback",
    passport.authenticate("github", {
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login`
    }),
    (req, res) => {
        const token = req.user?.token;
        if (!token) return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);

        const redirectUrl = `${process.env.CLIENT_URL}/oauth-success?token=${token}`;
        res.redirect(redirectUrl);
    }
);

module.exports = router;
