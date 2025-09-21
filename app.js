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

// const allowedOrigin = process.env.FRONTEND_URL || 'https://payrollfrontend.onrender.com'||'http://localhost:5173';

// app.use(
//   cors({
//     origin: allowedOrigin,
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//     credentials: true,
//   })
// );

// // Important: Handle preflight OPTIONS properly
// app.options('*', cors({ origin: allowedOrigin, credentials: true }));
const allowedOrigins = [
  "http://localhost:5173",              // local React dev
  "https://payrollfrontend.onrender.com" // live frontend
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
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
