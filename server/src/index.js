
import dotenv from 'dotenv'
import { app } from './app.mjs';
import { dbConnection } from './config/db.mjs';
import cors from 'cors'


dotenv.config({
    path: './.env'
});
app.use(cors());
const port = process.env.PORT || 5000
app.listen(port, () => {
    dbConnection().catch((error) => {

        console.log("Error in connection mongoose ", error);

    });
    console.log(`server running on port ${port}`);
})