const express= require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectDb=require('./db/connectDb')
connectDb()

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const fileUpload = require("express-fileupload");

//temp file uploader
app.use(fileUpload({useTempFiles: true}));


const cors= require('cors')
// app.use(cors())

app.use(cors({
  origin: process.env.FRONTEND_URL||'https://payrollfrontend.onrender.com', // e.g. https://payrollfrontend.onrender.com
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // <-- allow these HTTP methods
  credentials: true, // allow cookies
}));

app.options('*', cors({
  origin: process.env.FRONTEND_URL || 'https://payrollfrontend.onrender.com',
  credentials: true
}));




//for dataget in api
app.use(express.json())


//load route
app.use('/api',web)
//localhost:7777/api





//create server

app.listen(process.env.PORT, '0.0.0.0',()=>{
    console.log(`server running on localhost: ${process.env.PORT}`)
})
