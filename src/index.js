import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
    path: './env'
})

connectDB().then(() => {
    try {
        app.listen(process.env.PORT || 8080,
            () => {
                console.log(`Server is running... ${process.env.PORT}`
                )
            })
    }
    catch (error) {
        console.log(`Server running Failed ! ${error}`)
    }
}).catch((error) => {
    console.log(`MongoDB Connect Failed ! ${error}`)
})
