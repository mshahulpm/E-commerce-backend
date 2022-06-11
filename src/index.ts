import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, NextFunction } from 'express';

// middleware
import { error500, logger, notFound404, getUserDetails } from './middlewares/common';
// routes
import { routes } from './routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// logger
app.use(logger);
// user details 
app.use(getUserDetails);

routes.forEach(route => {
    app.use(route.path, (route.middlewares || []), route.router);
})

// 404 handler
app.use('*', notFound404)

// 500 Internal Server Error
app.use(error500)


app.listen(8000, () => {
    console.log('Server listening on port 8000!');
});