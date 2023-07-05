const express = require('express');
const cors = require('cors');

const notFound = require('./middleware/404');
const errorHandler = require('./middleware/500');
const authRouter = require('./auth/router');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        code: 200,
        message: 'WELCOME'
    })
})

app.use(authRouter);

app.use("*",notFound);
app.use(errorHandler);
function start(port){
    app.listen(port,()=>console.log(`Up and Running on ${port}`))
}

module.exports ={
    app,
    start

} ;
