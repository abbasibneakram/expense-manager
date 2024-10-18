import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../configs/dbConfig';
import { IExpense } from '../interfaces/expenseInterface';
import User from './userModel'; // Ensure that User is imported after its definition

// Optional allows 'id' to be omitted when creating a new Expense
interface ExpenseCreationAttributes extends Optional<IExpense, 'id'> {}

class Expense
    extends Model<IExpense, ExpenseCreationAttributes>
    implements IExpense
{
    public id!: number;
    public userId!: number;
    public category!: string;
    public amount!: number;
    public date!: Date;
    public notes?: string;
    public receipt?: string;
}

Expense.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: User, // Reference the User model
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        receipt: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'expenses',
    },
);

// Define associations
export default Expense;
