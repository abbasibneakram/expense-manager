import { Model, DataTypes } from 'sequelize'
import sequelize from '../configs/dbCofig'
import { IExpense } from '../interfaces/expenseInterface'
import User from './userModel'

class Expense extends Model<IExpense> implements IExpense {
    public id!: number
    public userId!: number
    public amount!: number
    public category!: string
    public date!: Date
    public notes?: string
}

Expense.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: false },
        notes: { type: DataTypes.STRING, allowNull: true },
    },
    { sequelize, modelName: 'expense' }
)

User.hasMany(Expense, { onDelete: 'CASCADE' })
Expense.belongsTo(User)

export default Expense
