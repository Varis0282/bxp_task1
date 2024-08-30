import express from 'express';
import cors from 'cors';
import ticket from './app/api/ticket.js';
import station from './app/api/station.js';
import dbConfig from './dbConfig.js'
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(cors());



if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/fe/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'fe', 'build', 'index.html'));
    })
}


app.get('/ping', (req, res) => {
    res.send('Hello World');
})

ticket(app);
station(app);

app.listen(4000, () => {
    console.log('Server is running on port 4000');
})
