import app from './app';
import './database';

app.listen(4000, () => {
    console.log(`Server working on http://localhost:4000`);
});