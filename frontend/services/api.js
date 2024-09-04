const BASE_URL = 'http://localhost:3000/api/tasks';

export const fetchTasks = async (isComplete) => {
    const response = await fetch(`${BASE_URL}/fetch?complete=${isComplete}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

export const fetchTasksByDate = async (isComplete, dueDate) => {
    const response = await fetch(`${BASE_URL}/fetchByDate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            complete: isComplete,
            date: dueDate
        })
    });
    
    console.log(isComplete, dueDate);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

export const fetchById = async (id) => {
    const response = await fetch(`${BASE_URL}/fetch/${id}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

export const addTask = async (task) => {
    const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

export const updateTask = async (id, task) => {
    const response = await fetch(`${BASE_URL}/update/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

export const updateTaskStatus = async (id, status) => {
    const response = await fetch(`${BASE_URL}/updateComplete/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({complete: status})
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

export const deleteTask = async (id) => {
    const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Network response was not ok');
}