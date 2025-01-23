const express = require('express');
const userRouter = require('./router/userRouter')

const app = express();
app.use(userRouter);
app.use(express.static("./public"))

app.listen(5000, () => {
    console.log('server is running on port 5000');
}); 