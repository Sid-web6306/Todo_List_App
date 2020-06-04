const express = require('express');
const path = require('path');
const db  = require('./config/mongoose');
const TodoList = require('./models/todo_List');
const port = 300;
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.urlencoded());// Using MiddleWare
app.use(express.static('assets'));





app.get('/',(req,res)=>{
    
    return res.render('home',{
        title: 'Todo List'
    })
});
app.get('/',(req,res)=>{
    TodoList.find({},(err,TodoList)=>{
        if(err){
            console.log('error in fetching the data from database')
        }
    })
})





app.post('/create-TodoList',(req,res)=>{
    TodoList.create({
        Description:req.body.description,
        Category: req.body.category,
        DueDate:req.body.duedate
    },(err,newTodoList)=>{
        if(err){
            console.log('Error in Creating a TodoList', err);return;
        }
        console.log('*********', newTodoList);
        return res.redirect('back');
    });
});





app.listen(port,(err)=>{
    if(err){
        console.log(`Something Went Wrong on ${port}`,err);
    }
    console.log(`app is running on: ${port}`);
});