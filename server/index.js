import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './lib/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'

dotenv.config()
const PORT = process.env.PORT || 8080;
const app = express()
app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/post', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)

app.get('/', async (req, res) => {
    res.send('Hello from DALL-E!')
})

const startServer = async () => {
    try {
        connectDB(process.env.MONGO_URL)
        app.listen(PORT, () => {
            console.log(`Server started on port http://localhost:8080`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer()