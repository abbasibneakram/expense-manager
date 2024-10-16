import express from 'express'
import authRoutes from './routes/authRoutes'
import sequelize from './configs/dbCofig'

const app = express()
app.use(express.json())
app.use('/auth', authRoutes)

sequelize.sync({ force: true }).then(() => {
    console.log('Database synced')
    app.listen(3000, () =>
        console.log('Server running on http://localhost:3000')
    )
})
