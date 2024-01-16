const inputfield = document.querySelector('.todo__app--input');
const addbutton = document.querySelector('.todo__app--addbutton');
const clearbutton = document.querySelector('.todo__app--clearbutton');
const taskList = document.querySelector('.todo__app--list');

let tasks = [];

inputfield.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});

addbutton.addEventListener('click', addTask);
clearbutton.addEventListener('click', clearTasks);

function addTask() {
  const taskText = inputfield.value.trim();
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    saveTaskToLocalStorage();
    renderTask();
    inputfield.value = '';
    showSnackBar();
  }
}

function completedTask(taskItem) {
  taskItem.classList.add('completed');
}

function renderTask() {
  taskList.innerHTML = ''; // Clear previous content

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('todo__app--item');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.checked = task.completed;
    check.addEventListener('change', () => toggleTaskCompletion(task.id));

    const textContainer = document.createElement('div'); // Creating a div for text
    textContainer.classList.add('task-text');

    const taskText = document.createElement('p'); // Creating a p tag for text
    taskText.textContent = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('todo__app--deleteBtn');
    deleteBtn.textContent = '\u00D7';
    deleteBtn.addEventListener('click', () => removeTask(task.id));

    const selectContainer = document.createElement('div'); // Creating a div for text
    selectContainer.classList.add('select-option');

    textContainer.appendChild(taskText);
    selectContainer.appendChild(check);
    selectContainer.appendChild(deleteBtn);

    taskItem.appendChild(textContainer);
    taskItem.appendChild(selectContainer);
    taskList.appendChild(taskItem);

    if (task.completed) {
      completedTask(taskText);
    }
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  task.completed = !task.completed;
  saveTaskToLocalStorage();
  renderTask();
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTaskToLocalStorage();
  renderTask();
}

function saveTaskToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskFromLocalStorage() {
  const storeTasks = localStorage.getItem('tasks');
  if (storeTasks) {
    tasks = JSON.parse(storeTasks);
    renderTask();
  }
}

getTaskFromLocalStorage();

function showSnackBar() {
  const snackbar = document.getElementById('snackbar');
  snackbar.className = 'show';
  setTimeout(() => {
    snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
}

function clearLocalStorage() {
  localStorage.removeItem('tasks');
}

function clearTasks() {
  tasks = [];
  clearLocalStorage();
  renderTask();
}
