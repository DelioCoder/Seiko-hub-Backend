import app from './app';
import './database';

app.listen(app.get('port'), () => {
    console.log(`Server working on http://localhost:4000`);
});