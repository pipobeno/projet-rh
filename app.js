const express = require('express');
const userRouter = require('./prisma/router/userRouter');

const app = express();

app.use(express.static("./public"))
app.use(express.urlencoded({ extended: true }))

// toujours ici
app.use(userRouter);

app.listen(5000, () => {
    console.log('server is running on port 5000');
}); 