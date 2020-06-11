const mongoose = require('mongoose');
// Connecting mongodb with the help of mongoose library

mongoose.connect('mongodb://localhost/Todo_List_App',{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error: '));
db.once('open',()=>{
    console.log('connected with database successfully');
});
