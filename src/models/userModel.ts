import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../configs/dbConfig';
import Expense from './expenseModel'; // Ensure that Expense is imported after its definition

export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
}

// Optional allows 'id' to be omitted when creating a new User
interface UserCreationAttributes extends Optional<IUser, 'id'> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
    public id?: number;
    public username!: string;
    public email!: string;
    public password!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
    },
);


export default User;
