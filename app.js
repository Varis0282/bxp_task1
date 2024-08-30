import express from 'express';
import cors from 'cors';
import ticket from './app/api/ticket.js';
import station from './app/api/station.js';
import dbConfig from './dbConfig.js'
const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (req, res) => {
    res.send('Hello World');
})

ticket(app);
station(app);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})
