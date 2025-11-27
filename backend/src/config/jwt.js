module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'supersecretkey123',
    jwtExpiration: '1h',
};
