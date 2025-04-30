document.querySelectorAll('.task').forEach(task => {
    task.addEventListener('dragstart', drag);
});

document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragover', e => e.preventDefault());
    column.addEventListener('drop', drop);
});

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    const id = event.dataTransfer.getData("text");
    const task = document.getElementById(id);
    event.target.closest('.column').appendChild(task);
}