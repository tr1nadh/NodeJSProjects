import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import cors from 'cors';
import {connectDB, disconnectDB} from './mongooser.js'

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use('/api/tasks', taskRoutes)

app.listen(port, async () => {
    await connectDB();
    console.log(`Running on http://localhost:${port}`)
})

process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit(0);
  });
  
  process.on('SIGTERM', async () => {
    await disconnectDB();
    process.exit(0);
  });