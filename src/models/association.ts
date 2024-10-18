import User from './userModel';
import Expense from './expenseModel';

// Define associations
User.hasMany(Expense, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'expenses',
});

Expense.belongsTo(User, { foreignKey: 'userId', as: 'user' });
module.exports = Expense;
