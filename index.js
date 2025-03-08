import express from 'express';
// import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config'
import todoRoutes from './routes/router.js'

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())
app.use('/api', todoRoutes)


app.listen(PORT, () => console.log(`Listening on port ${PORT} http://localhost:${PORT}`));