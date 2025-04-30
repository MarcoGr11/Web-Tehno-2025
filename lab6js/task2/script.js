const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskDeadline = document.getElementById("task-deadline");
const taskStatus = document.getElementById("task-status");
const taskList = document.getElementById("task-list");
const sortByCreated = document.getElementById("sort-created");
const sortByUpdated = document.getElementById("sort-updated");
const sortByStatus = document.getElementById("sort-status");

const editModal = document.getElementById("edit-modal");
const closeEditModal = document.getElementById("close-edit-modal");
const editForm = document.getElementById("edit-task-form");
const editText = document.getElementById("edit-task-text");
const editDeadline = document.getElementById("edit-task-deadline");
const editStatus = document.getElementById("edit-task-status");

let tasks = [];
let currentSort = null;
let editingId = null;

const isOverdue = (deadline) => {
    if (!deadline) return false;
    const now = new Date().setHours(0, 0, 0, 0);
    const date = new Date(deadline).setHours(0, 0, 0, 0);
    return date < now;
};

const formatDate = (dateStr) => {
    if (!dateStr) return "немає";
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth()+1).padStart(2, '0')}.${date.getFullYear()}`;
};

const renderTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
        if (currentSort === "created") return new Date(a.createdAt) - new Date(b.createdAt);
        if (currentSort === "updated") return new Date(b.updatedAt) - new Date(a.updatedAt);
        if (currentSort === "status") return a.status.localeCompare(b.status);
        return 0;
    });

    taskList.innerHTML = "";
    sortedTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-item ${task.completed ? "completed" : ""}`;
        if (!task.completed && isOverdue(task.deadline)) {
            li.style.backgroundColor = "#ffd6d6";
        }

        const content = document.createElement("div");
        content.className = "task-content";

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = `${task.text} (до: ${formatDate(task.deadline)}) [${task.status}]`;
        span.onclick = () => toggleTask(task.id);

        content.appendChild(span);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏";
        editBtn.onclick = () => openEditModal(task);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.onclick = () => deleteTask(task.id);

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(content);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
};

const toggleTask = (id) => {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() } : task
    );
    renderTasks();
};

const openEditModal = (task) => {
    editingId = task.id;
    editText.value = task.text;
    editDeadline.value = task.deadline || "";
    editStatus.value = task.status;
    editModal.classList.remove("hidden");
};

closeEditModal.onclick = () => {
    editModal.classList.add("hidden");
    editingId = null;
};

editForm.onsubmit = (e) => {
    e.preventDefault();
    tasks = tasks.map(task =>
        task.id === editingId
            ? {
                ...task,
                text: editText.value.trim(),
                deadline: editDeadline.value,
                status: editStatus.value,
                updatedAt: new Date().toISOString()
            }
            : task
    );
    editModal.classList.add("hidden");
    editingId = null;
    renderTasks();
};

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
};

taskForm.onsubmit = (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    const deadline = taskDeadline.value;
    const status = taskStatus.value;

    if (!text) return;

    tasks.push({
        id: Date.now(),
        text,
        completed: false,
        status,
        deadline,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });

    taskInput.value = "";
    taskDeadline.value = "";
    taskStatus.value = "активне";
    renderTasks();
};

sortByCreated.onclick = () => { currentSort = "created"; renderTasks(); };
sortByUpdated.onclick = () => { currentSort = "updated"; renderTasks(); };
sortByStatus.onclick = () => { currentSort = "status"; renderTasks(); };

renderTasks();