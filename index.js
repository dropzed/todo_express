import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import todoRoutes from './routes/router.js'
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())
app.use(cors())
app.use('/api', todoRoutes)
app.use(errorMiddleware)


app.listen(PORT, '0.0.0.0', () => console.log(`Listening on port ${PORT} http://localhost:${PORT}`));