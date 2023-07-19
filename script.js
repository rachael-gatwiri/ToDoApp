let alltasks = [];


function saveTasksToLocalStorage() {
  localStorage.setItem('alltasks', JSON.stringify(alltasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const tasksFromLocalStorage = localStorage.getItem('alltasks');
  if (tasksFromLocalStorage) {
    alltasks = JSON.parse(tasksFromLocalStorage);
    renderTasks();
    updateCount();
  }
}

document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);


let form = document.querySelector('.inputform');
let newtodo = document.getElementById('new-todo-input');
let checkbox = document.querySelector('#checkBox');
let todosList = document.getElementById('todoList');
let countElement = document.getElementById('count');
let allBtn = document.querySelector('.all');
let activeBtn = document.querySelector('.Active');
let completedBtn = document.querySelector('.completed');
let clearBtn = document.querySelector('.clear-completed-btn');

checkbox.addEventListener('click', () => {
  
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (newtodo.value !== '') {
    alltasks.push({
      task: newtodo.value,
      checked: checkbox.checked
    });

    newtodo.value = '';
    checkbox.checked = false;

    renderTasks();
    updateCount();

    console.log(alltasks);
  }
});

function renderTasks() {
  todosList.innerHTML = '';
  alltasks.forEach(({ task, checked }, index) => {
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "itemcheckbox";
    checkbox.checked = checked;

    let taskContainer = document.createElement('div');
    taskContainer.className = 'singletask';
    taskContainer.textContent = task;
    taskContainer.style.textDecoration = checkbox.checked ? "line-through" : "none";

    checkbox.addEventListener('click', () => {
      taskContainer.style.textDecoration = checkbox.checked ? "line-through" : "none";
      alltasks[index].checked = checkbox.checked;
      saveTasksToLocalStorage(); 
    });

    allBtn.addEventListener('click', (e) => {
  e.preventDefault();
  renderTasks(alltasks);
});

activeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let activeTasks = alltasks.filter(task => !task.checked);
  renderTasks(activeTasks);;
});

completedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let completedTasks = alltasks.filter(task => task.checked);
  renderTasks(completedTasks);
  updateCount();
  
});
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alltasks = alltasks.filter(task => !task.checked);
      saveTasksToLocalStorage(); 
      renderTasks();
      updateCount();
    });
    let taskitem = document.createElement('div');
    taskitem.className = "taskitem";

    taskitem.appendChild(checkbox);
    taskitem.appendChild(taskContainer);

    todosList.appendChild(taskitem);
  });
}

let plusIcon = document.querySelector('.plus-icon');

plusIcon.addEventListener('click', () => {
  let newTodoValue = newtodo.value.trim();
  if (newTodoValue !== '') {
    alltasks.push({
      task: newTodoValue,
      checked: checkbox.checked 
    });

    newtodo.value = '';
    saveTasksToLocalStorage(); 
    renderTasks(alltasks);
    updateCount(alltasks);

    console.log(alltasks);
  }
});

function updateCount() {
  let count = alltasks.filter(task => !task.checked).length;
  countElement.textContent = count;
}

