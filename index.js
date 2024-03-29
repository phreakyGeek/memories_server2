import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello to Memories API')
})

const connection_url = 'mongodb+srv://mridulinlko:mridul123@cluster0.2uuug.mongodb.net/?retryWrites=true&w=majority' || process.env.CONNECTION_URL
const PORT  = process.env.PORT || 5000

mongoose.connect(connection_url)
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(error => console.log(error.message))