document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text">${task}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(li);

            li.querySelector('.delete-btn').addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.querySelector('.edit-btn').addEventListener('click', () => {
                const newTask = prompt('Edit task:', task);
                if (newTask !== null && newTask.trim() !== '') {
                    tasks[index] = newTask.trim();
                    saveTasks();
                    renderTasks();
                }
            });
        });
    };

    addTaskBtn.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task !== '') {
            tasks.push(task);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    renderTasks();
});
