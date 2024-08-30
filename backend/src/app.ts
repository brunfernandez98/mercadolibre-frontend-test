import express from 'express';

const app = express();

app.use(express.json());
app.use('/api/products');

/* app.use(errorHanlder) */


export default app;
