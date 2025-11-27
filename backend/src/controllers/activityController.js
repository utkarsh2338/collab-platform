const { Activity, User } = require('../models');

exports.getActivities = async (req, res) => {
    try {
        const { projectId } = req.params;
        const activities = await Activity.findAll({
            where: { project_id: projectId },
            include: [
                { model: User, as: 'user', attributes: ['id', 'username', 'avatar_url'] }
            ],
            order: [['created_at', 'DESC']],
            limit: 50, // Limit to last 50 activities
        });
        res.json(activities);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
