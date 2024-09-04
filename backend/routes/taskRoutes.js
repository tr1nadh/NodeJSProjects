import express from 'express';
const router = express.Router();
import * as task from '../controllers/taskController.js';

router.post('/add', task.addTask);
router.get('/fetch', task.fetchTasks);
router.post('/fetchByDate', task.fetchTasksByDate);
router.get('/fetch/:id', task.findById);
router.delete('/delete/:id', task.deleteTask);
router.put('/update/:id', task.updateTask);
router.patch('/updateComplete/:id', task.updateCompleteStatus);



export default router;