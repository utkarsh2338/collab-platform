const { sequelize } = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Activity = require('./Activity');
const ProjectMember = require('./ProjectMember');

// User - Project (Ownership)
User.hasMany(Project, { foreignKey: 'owner_id', as: 'ownedProjects' });
Project.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });

// User - Project (Membership)
User.belongsToMany(Project, { through: ProjectMember, foreignKey: 'user_id', as: 'projects' });
Project.belongsToMany(User, { through: ProjectMember, foreignKey: 'project_id', as: 'members' });

// Project - Task
Project.hasMany(Task, { foreignKey: 'project_id', as: 'tasks' });
Task.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

// User - Task (Assignee)
User.hasMany(Task, { foreignKey: 'assignee_id', as: 'assignedTasks' });
Task.belongsTo(User, { foreignKey: 'assignee_id', as: 'assignee' });

// User - Task (Creator)
User.hasMany(Task, { foreignKey: 'created_by', as: 'createdTasks' });
Task.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

// Project - Activity
Project.hasMany(Activity, { foreignKey: 'project_id', as: 'activities' });
Activity.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

// User - Activity
User.hasMany(Activity, { foreignKey: 'user_id', as: 'activities' });
Activity.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
    sequelize,
    User,
    Project,
    Task,
    Activity,
    ProjectMember,
};
