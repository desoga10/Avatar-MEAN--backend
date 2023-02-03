const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const PORT = process.env.PORT || 5000
const images = require('./routes/uploadRoute')

//Allow access to .env file
dotenv.config()

const app = express()


// Middleware
app.use(cors())
app.use(express.json());
app.use(morgan("common"))

//configure api from api route
app.use('/api', images)

//Connect to MongoDB Atlas
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
}
).then(() => console.log("mongoDB is connected"))
.catch((err) => console.log(err));

// Port
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`)
})