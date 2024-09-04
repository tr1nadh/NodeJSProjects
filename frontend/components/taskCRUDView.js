import * as taskCRUDAPI from '../services/api.js';
import * as taskView from '../components/taskView.js';
import * as toast from '../components/toast.js';

let isEditingOn = false;
let editingTaskId = 0;

export async function showEditModal(event) {
    $('#taskModal').modal('show');
    isEditingOn = true;

    try {
        editingTaskId = $(event.target).attr('data-task-id');
        let task = await taskCRUDAPI.fetchById(editingTaskId);

        $('#taskForm input[name="title"]').val(task.title);
        $('#taskForm textarea[name="description"]').val(task.description);
        $('#taskForm input[name="date"]').val(task.date);
    } catch (error) {
        console.error(error);
        toast.showError(error.message);
    }

}

$('#taskForm').on('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        complete: false
    };

    if (isEmptyOrBlank(data.title)) {
        $('#titleInput').addClass('is-invalid');
        toast.showError("Title cannot be empty");
        return;
    }
    $('#titleInput').removeClass('is-invalid');
    if (isEmptyOrBlank(data.date)) {
        $('#dateInput').addClass('is-invalid');
        toast.showError("Due date cannot be none");
        return;
    }
    $('#dateInput').removeClass('is-invalid');

    $('#taskModal').modal('hide');

    if (isEditingOn) {
        updateTask(data);
        isEditingOn = false;
    } else saveTask(data);

    $('#taskForm')[0].reset();
}
);

function isEmptyOrBlank(str) {
    return str.trim() === '';
  }

async function updateTask(data) {
    try {
        let updatedTask = await taskCRUDAPI.updateTask(editingTaskId, data);
        taskView.updateTaskInTaskView(updatedTask);
        toast.showSuccess("Task has been updated");
    } catch (error) {
        console.error(error);
        toast.showError(error.message);
    }
}

async function saveTask(data) {
    try {
        let task = await taskCRUDAPI.addTask(data);
        taskView.addTaskToTaskView(task);
        toast.showSuccess("Task has been added");
    } catch (error) {
        console.error(error);
        toast.showError(error.message);
    }
}

export async function deleteTask(event) {
    if (confirm('Are your sure you want to delete?')) {
        try {
            const id = event.target.getAttribute('data-task-id');
            $(`#task-${id}`).remove();
            await taskCRUDAPI.deleteTask(id);
            toast.showSuccess("Task has been deleted");
        } catch (error) {
            console.error(error);
            toast.showError(error.message);
        }
    }
}

$('#taskModal').on('hidden.bs.modal', function() {
    $('#taskForm')[0].reset();
    $('#dateInput').removeClass('is-invalid');
    $('#titleInput').removeClass('is-invalid');
    if (isEditingOn) isEditingOn = false;
});