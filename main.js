document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.form-input');
    const cardContent = document.querySelector('.card-content');
    const leftNum = document.querySelector('.left-num span');
    const rightNum = document.querySelector('.right-num span');

    let tasks = [];

    function addTask() {
        const taskName = input.value.trim();
        if (!taskName) return;

        const task = { name: taskName, status: 'To-do', priority: 'Normal' };
        tasks.push(task);

        renderTasks();
        input.value = '';
    }

    function renderTasks() {
        cardContent.innerHTML = '';

        tasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            cardContent.appendChild(taskElement);
        });

        updateTaskCount();
    }

    function createTaskElement(task, index) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-row');

        const statusColor = getStatusColor(task.status);
        taskElement.style.borderColor = statusColor;

        const priorityColor = getPriorityColor(task.priority);
        taskElement.style.backgroundColor = priorityColor;

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');
        taskInfo.innerHTML = `
            <button class="toggle-btn" onclick="toggleTaskStatus(${index})">&#10003;</button>
            <p>${task.name}</p>
            <div class="task-buttons">
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskElement.appendChild(taskInfo);

        return taskElement;
    }

    function toggleTaskStatus(index) {
        const task = tasks[index];
        task.status = task.status === 'To-do' ? 'In Progress' : 'To-do';
        renderTasks();
    }

    function editTask(index) {
        const newName = prompt('Enter new task name:');
        if (newName !== null) {
            tasks[index].name = newName;
            renderTasks();
        }
    }

    function deleteTask(index) {
        if (confirm('Are you sure you want to delete this task?')) {
            tasks.splice(index, 1);
            renderTasks();
        }
    }

    function getStatusColor(status) {
        switch (status) {
            case 'To-do':
                return '#4EA8DE';
            case 'In Progress':
                return '#F1C40F';
            case 'Done':
                return '#2ECC71';
            default:
                return '#4EA8DE';
        }
    }

    function getPriorityColor(priority) {
        switch (priority) {
            case 'High':
                return '#E74C3C';
            case 'Normal':
                return '#3498DB';
            case 'Low':
                return '#2ECC71';
            default:
                return '#3498DB';
        }
    }

    function updateTaskCount() {
        const toDoCount = tasks.filter(task => task.status === 'To-do').length;
        const inProgressCount = tasks.filter(task => task.status === 'In Progress').length;

        leftNum.textContent = toDoCount;
        rightNum.textContent = inProgressCount;
    }

    // Attach the addTask function directly to the button click event
    document.querySelector('.btn').addEventListener('click', addTask);
});
