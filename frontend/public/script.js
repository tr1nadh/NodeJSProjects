import * as taskView from '../components/taskView.js';
import * as taskCRUD from '../components/taskCRUDView.js';
import * as toast from '../components/toast.js';

$(document).ready(async function() {
    activeLoadTasks();
});

async function activeLoadTasks() {
    if ($('#pendingTasks').hasClass('active')) taskView.loadTasks(false);
    else taskView.loadTasks(true);
}

$('#dueDate').change(function() {
    let selectedDate = $(this).val();
    if (selectedDate === '') {
        activeLoadTasks();
        return;
    }
    if ($('#pendingTasks').hasClass('active')) taskView.loadTasksByDate(false, selectedDate);
    else taskView.loadTasksByDate(true, selectedDate);
    
});

$('body').on('change', async (event) => {
    if (event.target.matches('.task-complete-check')) taskView.updateCheckBox(event);
});

$('body').on('click', async (event) => {
    if (event.target.matches('.delete-task-btn')) {
        taskCRUD.deleteTask(event);
    }    

    if (event.target.matches('.edit-task-btn')) {
        taskCRUD.showEditModal(event);
    }

    if (event.target.matches('#pendingTasks')) {
        $('#pendingTasks').addClass('active');
        $('#completedTasks').removeClass('active');
        taskView.loadTasks(false);
    }
    
    if (event.target.matches('#completedTasks')) {
        $('#completedTasks').addClass('active');
        $('#pendingTasks').removeClass('active');
        taskView.loadTasks(true);
    }
});

