import configViewEngine from "./configs/viewEngines";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import initWebRoute from './router/web';
import initAPIRoute from './router/api';
import checkConnectDB from "./configs/connectDB";
require('dotenv').config()
const app = express()

app.use(cookieParser());
app.use(cors({
  origin: true
}));
// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({extended: true}));
// Parse JSON bodies (as sent by API clients)
// app.use(express.json());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//set ejs engine
configViewEngine(app);
//init web route
initWebRoute(app);
//init api route
initAPIRoute(app);

checkConnectDB();

const port = process.env.PORT || 8081

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})