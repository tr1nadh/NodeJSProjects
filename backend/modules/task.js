import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: String,
    complete: Boolean
})

const Task = mongoose.model('Task', taskSchema);

export default Task;