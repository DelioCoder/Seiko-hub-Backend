import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import './database';


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server working on ${PORT}`);
});