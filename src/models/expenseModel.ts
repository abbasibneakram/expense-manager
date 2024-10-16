import { Model, DataTypes, Optional } from 'sequelize'
import sequelize from '../configs/dbCofig' // Ensure the spelling is correct
import { IExpense } from '../types/expenseInterface'
import User from './userModel'

// Define attributes for the Expense model
interface ExpenseAttributes extends IExpense {}

interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, 'id'> {}

class Expense
    extends Model<ExpenseAttributes, ExpenseCreationAttributes>
    implements ExpenseAttributes
{
    public id!: number
    public amount!: number
    public category!: string
    public date!: Date
    public notes?: string // Optional
    public userId!: number // Foreign key
}

// Initialize the Expense model
Expense.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        amount: { type: DataTypes.FLOAT, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        date: { type: DataTypes.DATE, allowNull: true },
        notes: { type: DataTypes.STRING, allowNull: true },
        userId: {
            // Explicitly define the foreign key
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User, // Reference to User model
                key: 'id', // Key in User model
            },
        },
    },
    {
        sequelize,
        modelName: 'expense',
        tableName: 'expenses', // Optional: specify table name
        timestamps: true, // Optional: auto-manage createdAt and updatedAt fields
    }
)

// Define relationships
User.hasMany(Expense, { foreignKey: 'userId', onDelete: 'CASCADE' }) // Specify foreign key
Expense.belongsTo(User, { foreignKey: 'userId' }) // Specify foreign key

export default Expense
