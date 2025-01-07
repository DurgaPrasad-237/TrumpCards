import express from "express"
import { connectDB } from "./lib/db.js"
import router from "./routes/auth.route.js";
import {EventEmitter} from 'events';
import cors from "cors";

EventEmitter.defaultMaxListeners = 20; 

const app = express();

app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
})
);

app.options("*", cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use('/api/auth', router);

app.get('/',(req,res)=>{
    res.send('Hello World');
})

const startserver = async () =>{
    try {
        // Connect to the database
        await connectDB();
        console.log('Database connected successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startserver();