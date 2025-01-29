const express = require('express');
const userRouter = require('./prisma/router/userRouter');
const session = require('express-session');
const ordinateurRouter = require('./prisma/router/ordinateurRouter');
const employeRouter = require('./prisma/router/employeRouter');


const app = express();

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))
app.use(session({ 
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))

// toujours ici
app.use(userRouter);

app.use(ordinateurRouter);

app.use(employeRouter);

app.listen(5000, () => {
    console.log('server is running on port 5000');
}); 