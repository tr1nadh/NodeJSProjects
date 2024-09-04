import Task from '../modules/task.js';

export const addTask = async (req, res) => {
    try {
        let data = req.body;
        const task = new Task(data);
        let dbRes = await task.save();
        console.log('Task added:', task);
        res.status(200).send(dbRes);
    } catch (error) {
        console.log('Error adding task:', error.message);
        res.status(201).send({error: error.message});
    }
};

export const fetchTasks = async (req, res) => {
    try {
        let isComplete = req.query.complete;
        const tasks = await Task.find({complete: isComplete});
        console.log("Tasks retrieved by status");
        res.status(200).send(tasks);
    } catch (error) {
        console.log('Error fetching tasks by status:', error.message);
        res.status(201).send({error: error.message});
    }
}

export const fetchTasksByDate = async (req, res) => {
    try {
        let isComplete = req.body.complete;
        let dueDate = req.body.date;
        const tasks = await Task.find({
            date: dueDate,
            complete: isComplete
        });
        console.log("Tasks retrieved by date");
        res.status(200).send(tasks);
    }  catch (error) {
        console.log('Error fetching tasks by date:', error.message);
        res.status(201).send({error: error.message});
    }
}

export const findById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        console.log("Task found:", task);
        res.status(200).send(task);
    } catch (error) {
        console.log(`Error finding task by id (${id}):`, error.message);
        res.status(201).send({error: error.message});
    }
}

export const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        let data = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            id, data, {new: true}
        );
        console.log('Task updated:', updatedTask);
        res.status(200).send(updatedTask);
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(201).send({error: error.message});
      }
}

export const updateCompleteStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id, {complete: req.body.complete}, {new: true}
        );
        console.log('Task status updated:', updatedTask);
        res.status(200).send(updatedTask);
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(201).send({error: error.message});
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        let deletedTask = await Task.findByIdAndDelete(id).exec();
        console.log('Task deleted:', deletedTask);
        res.status(200).send();
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(201).send({error: error.message});
      }
}
