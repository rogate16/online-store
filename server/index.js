const express = require("express");
const cors = require('cors')
const db = require("./config/db")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('./static'))
app.use('/users', require('./routes/users'));

//    For mobile production
// const port = ''
// const ip = ''
// app.listen(port, ip, () => {
//   console.log('Server Running...');
// });

app.listen('3001', () => {
  console.log('Server Running...');
});