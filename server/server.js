const express = require('express');
const app = express();
const dotenv = require('dotenv');
const notes_data = require("./data/notes_data")
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path')

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/notes', require('./routes/noteRoutes'))

__dirname = path.resolve()
if(process.env.NODE_ENV === 'Production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send("API is running...")        
    })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server running on ${PORT}`));
