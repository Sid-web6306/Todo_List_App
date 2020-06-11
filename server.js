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
    TodoList.find({},(err,todolists)=>{
        if(err){
            console.log('error in fetching a data from database', err);return;
        }
            return res.render('home',{
            title: 'Todo List',
            todolists: todolists
        });
    }
)});

app.post('/create-TodoList-task',(req,res)=>{
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

app.get('/delete-todolist-task',(req,res)=>{
    var id = req.query;
    console.log(id);
    // checking the number of tasks selected to delete
    var count = Object.keys(id).length;
    for(let i=0; i < count ; i++){
        
        // finding and deleting tasks from the DB one by one using id
        TodoList.findByIdAndDelete(Object.keys(id)[i], function(err){
        if(err){
            console.log('error in deleting task');
            }
        })
    }
    return res.redirect('back'); 
});



app.listen(port,(err)=>{
    if(err){
        console.log(`Something Went Wrong on ${port}`,err);
    }
    console.log(`app is running on: ${port}`);
});