import * as taskCRUDAPI from '../services/api.js';
import * as toast from '../components/toast.js';

export async function addTaskToTaskView(task) {
    const id = task._id;

    let decoration = "none";
    let isChecked = "";
    if (task.complete) {
        decoration = "line-through";
        isChecked = "checked";
    }

    let HTMLData = `
        <div id='task-${id}' class="container d-flex mb-3" >
            <input class="form-check-input mx-2 task-complete-check" data-task-id='${id}' type="checkbox" ${isChecked}>
            <div class="border rounded me-2 p-3 w-100 d-flex justify-content-between" style="background-color: aliceblue;">
                <div>
                <span class="fw-bold" id='task-${id}-title' style="text-decoration: ${decoration};"> ${task.title} </span> <br>
                <span id='task-${id}-desc' > ${task.description} </span>
                </div>
                <div>
                    <p id="task-${id}-date" class="border border-danger-subtle p-1 px-2 rounded" data-task-id='${id}'>${task.date}</p>
                    <a class="alert-link edit-task-btn" data-task-id='${id}'>Edit</a>
                    <a class="alert-link delete-task-btn" data-task-id='${id}'>Delete</a>
                </div>
            </div>
        </div>
        `;

    $('#task-container').prepend(HTMLData);
}

export async function updateTaskInTaskView(data) {
    $(`#task-${data._id}-title`).html(data.title);
    $(`#task-${data._id}-desc`).html(data.description);
    $(`#task-${data._id}-date`).html(data.date);
}

export async function loadTasks(isComplete) {
    $('#task-container').html('');
    try {
        let tasks = await taskCRUDAPI.fetchTasks(isComplete);
        tasks.forEach(task => {
            addTaskToTaskView(task);
        });
    } catch (error) {
        console.error(error);
        toast.showError(error.message);
    }
}

export async function loadTasksByDate(isComplete, dueDate) {
    $('#task-container').html('');
    try {
        let tasks = await taskCRUDAPI.fetchTasksByDate(isComplete, dueDate);
        tasks.forEach(task => {
            addTaskToTaskView(task);
        });
    } catch (error) {
        console.error(error);
        toast.showError(error.message);
    }
}

export async function updateCheckBox(event) {
    let id = $(event.target).attr('data-task-id');
    if (event.target.checked) {
        $(`#task-${id}-title`).css("text-decoration", "line-through");
        taskCRUDAPI.updateTaskStatus(id, true);
    } else {
        $(`#task-${id}-title`).css("text-decoration", "none");
        taskCRUDAPI.updateTaskStatus(id, false);
    }
    $(`#task-${id}`).fadeOut(500, function() {
        $(this).remove();
    });
}

