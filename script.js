document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load tasks from localStorage
    loadTasks();

    // Add task
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskText = input.value.trim();
        if (taskText === '') return;

        const task = {
            text: taskText,
            completed: false
        };

        addTaskToDOM(task);
        saveTaskToLocalStorage(task);
        input.value = '';
    });

    // Toggle task completion
    list.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const taskElement = event.target;
            const taskText = taskElement.textContent;

            taskElement.classList.toggle('completed');
            updateTaskInLocalStorage(taskText, taskElement.classList.contains('completed'));
        }
    });

    // Delete task
    list.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const taskElement = event.target.parentElement;
            const taskText = taskElement.firstChild.textContent;

            taskElement.remove();
            deleteTaskFromLocalStorage(taskText);
        }
    });

    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) li.classList.add('completed');
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        
        li.appendChild(deleteButton);
        list.appendChild(li);
    }

    function saveTaskToLocalStorage(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    }

    function updateTaskInLocalStorage(taskText, completed) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.map(task => {
            if (task.text === taskText) {
                task.completed = completed;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
