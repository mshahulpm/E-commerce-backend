import dotenv from 'dotenv';
dotenv.config();
import express, { Express } from 'express';
import path from 'path';
import { swaggerConfig } from './docs';
// middleware
import { error500, logger, notFound404, getUserDetails, cors } from './middlewares/common';
// routes
import { routes } from './routes';


const app: Express = express();

app.use(cors);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static files
app.use(express.static('public'));

// logger
app.use(logger);
// user details 
app.use(getUserDetails);

// API documentation using swagger 

app.get('/api-docs', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../html/doc.html'))
})

app.get('/swagger-config', (req, res) => {
  res.json(swaggerConfig)
})

app.get('/docs-swagger', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../html/swagger.html'))
})

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