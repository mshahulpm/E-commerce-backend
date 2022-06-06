import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, NextFunction } from 'express';

import UserRoute from './Modules/User';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Request: ', req.method, req.url);
    next();
})



app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World!' });
});


app.use('/users', UserRoute);


// 404 handler
app.use('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: 'Not Found'
    })
})

// 500 Internal Server Error
app.use((error: any, req: Request, res: Response, next: NextFunction) => {

    console.log('Error: ', error);
    res.status(500).json({
        message: error.message,
    })
})


app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});