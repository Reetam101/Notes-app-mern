const express = require('express');
const app = express();
const dotenv = require('dotenv');
const notes_data = require("./data/notes_data")
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');


dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'))
app.use("/api/notes", require('./routes/noteRoutes'))
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server running on ${PORT}`));
