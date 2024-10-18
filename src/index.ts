import express from 'express';
import authRoutes from './routes/authRoutes';
import expenseRoutes from './routes/expenseRoutes';
import sequelize from './configs/dbConfig';
import './models/association';

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/expense', expenseRoutes);

const PORT = process.env.PORT;
sequelize
    .sync({ force: true })
    .then(() => {
        console.log('Database synced');
        app.listen(PORT, () =>
            console.log(`Server running on http://localhost:${PORT}`),
        );
    })
    .catch((error) => {
        console.error('Unable to connect to the database: ', error);
    });
