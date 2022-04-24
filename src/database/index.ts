import mongoose from 'mongoose';
import config from '../config';

(async () => {

    try {
        
        const db = await mongoose.connect(`${ config.MONGODB_URL }`);

        console.log(`Database ${ db.connection.name } is connected `);

    } catch ( ex ) {
        console.log( ex );
    }

})();