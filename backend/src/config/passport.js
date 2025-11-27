const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiration } = require("../config/jwt");

function signJwtForUser(user) {
    const payload = { id: user.id, role: user.role };
    return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration });
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.API_URL || "http://localhost:5000"}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                const avatar = profile.photos?.[0]?.value;
                const googleId = profile.id;

                let user = await User.findOne({
                    where: { provider: "google", provider_id: googleId },
                });

                if (!user && email) {
                    // Try to link local account by email
                    user = await User.findOne({ where: { email } });
                }

                if (!user) {
                    user = await User.create({
                        username: profile.displayName || email,
                        email,
                        provider: "google",
                        provider_id: googleId,
                        avatar_url: avatar,
                    });
                } else {
                    user.provider = "google";
                    user.provider_id = googleId;
                    user.avatar_url = avatar || user.avatar_url;
                    await user.save();
                }

                const token = signJwtForUser(user);
                done(null, { user, token });

            } catch (err) {
                console.error("GOOGLE STRATEGY ERROR:", err);
                done(err, null);
            }
        }
    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: `${process.env.API_URL || "http://localhost:5000"}/api/auth/github/callback`,
            scope: ["user:email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const githubId = profile.id;

                let email = null;
                if (Array.isArray(profile.emails) && profile.emails.length > 0) {
                    email = profile.emails[0].value;
                }

                const avatar = profile.photos?.[0]?.value;
                const username = profile.username;

                let user = await User.findOne({
                    where: { provider: "github", provider_id: githubId },
                });

                if (!user && email) {
                    user = await User.findOne({ where: { email } });
                }

                if (!user) {
                    user = await User.create({
                        username: username || email,
                        email,
                        provider: "github",
                        provider_id: githubId,
                        avatar_url: avatar,
                    });
                } else {
                    user.provider = "github";
                    user.provider_id = githubId;
                    user.avatar_url = avatar || user.avatar_url;
                    await user.save();
                }

                const token = signJwtForUser(user);
                done(null, { user, token });

            } catch (err) {
                console.error("GITHUB STRATEGY ERROR:", err);
                done(err, null);
            }
        }
    )
);

module.exports = passport;
