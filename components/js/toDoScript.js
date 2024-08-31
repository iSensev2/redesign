document.getElementById('add-task').addEventListener('click', function() {
  const taskInput = document.getElementById('new-task');
  const descriptionInput = document.getElementById('new-description');
  const taskText = taskInput.value.trim();
  const descriptionText = descriptionInput.value.trim();

  if (taskText !== '') {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
      <div class="task-header">
        <input type="checkbox" class="task-checkbox" />
        <span class="task-title">${taskText}</span>
        <button class="btn-delete">Delete</button>
      </div>
      <p class="task-description">${descriptionText}</p>
    `;
    taskList.appendChild(taskItem);
    taskItem.querySelector('.btn-delete').addEventListener('click', function() {
      taskList.removeChild(taskItem);
    });
    taskInput.value = '';
    descriptionInput.value = '';
  }
});

document.getElementById('task-list').addEventListener('change', function(e) {
  if (e.target.classList.contains('task-checkbox')) {
    const taskItem = e.target.closest('.task-item');
    if (e.target.checked) {
      taskItem.classList.add('task-done');
    } else {
      taskItem.classList.remove('task-done');
    }
  }
});