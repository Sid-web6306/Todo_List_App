const mongoose =require('mongoose');
//Schema For database

const todoListSchema = new mongoose.Schema({
    Description:{
        type: String,
        required: true
    },
    Category:{
        type:String,
        required: true
    },
    DueDate:{
        type:Date,
        required: true
    }
},{
    timestamps: true
});

const TodoList = mongoose.model('TodoList',todoListSchema);

module.exports = TodoList;