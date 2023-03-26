const express = require('express');
const app = express();
const helmet = require('helmet');
const dotenv = require('dotenv').config();
const path = require('path');

app.use(helmet())
app.use(express.json());

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({ message: err.message });
    return;
})

app.use(express.urlencoded({ extended: true }));


const customerRouter = require('./routers/customer_router');
const productRouter = require('./routers/product_router');
const publicRouter = require('./routers/public_router');
const storeRouter = require('./routers/store_router');
const tradeRouter = require('./routers/trade_router');

app.use('/',customerRouter);
app.use('/',productRouter);
app.use('/',publicRouter);
app.use('/',storeRouter);
app.use('/',tradeRouter);

app.listen(process.env.PORT, () => {
    
    console.log("Running!!! in",process.env.PORT);
});