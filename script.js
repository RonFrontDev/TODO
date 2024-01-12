const inputfield = document.querySelector('.todo__app--input');
const button = document.querySelector('.todo__app--button');
const taskList = document.querySelector('.todo__app--list');

let tasks = [];
inputfield.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTask();
  }
});
button.addEventListener('click', addTask);

function addTask() {
  const taskText = inputfield.value.trim();
  //   console.log(taskText);
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    // console.log(tasks);
    saveTaskToLocalStorage();

    renderTask();

    inputfield.value = '';

    showSnackBar();
  }
}

function renderTask() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const taskItem = document.createElement('li');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => removeTask(task.id));
    taskItem.textContent = task.text;
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    taskList.appendChild(taskItem);
    // console.log(taskItem);
  });
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find((task) => task.id === taskId);

  task.completed = !task.completed;

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
  let snackbar = document.getElementById('snackbar');
  snackbar.className = 'show';
  setTimeout(() => {
    snackbar.className = snackbar.className.replace('show', '');
  }, 3000);
}
