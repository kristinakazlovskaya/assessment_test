const sidebarItem = document.querySelector('.sidebar_item');
const main = document.querySelector('main');
const taskInput = document.getElementById('task_input');
const addTaskBtn = document.getElementById('add_task_btn');
const toDoTasksContainer = document.querySelector('.main_to_do_tasks_container');
const completedTasksContainer = document.querySelector('.main_complited_tasks_container');
const toDoCounterElement = document.getElementById('to_do_count');
const completedCounterElement = document.getElementById('complited_count');
const totalCounter = document.getElementById('total_value');

// toggle Tasks on navbar
sidebarItem.addEventListener('click', () => {
  sidebarItem.classList.toggle('sidebar_active_item');
  if (sidebarItem.classList.contains('sidebar_active_item')) {
    main.classList.remove('hidden');
  } else {
    main.classList.add('hidden');
  }
});

// create and add task
function createTask() {
  if (addTaskBtn.innerHTML === 'Add') {
    let task = document.createElement('div');
    task.classList.add('task');

    let taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.classList.add('task_chekbox');

    let taskText = document.createElement('div');
    taskText.classList.add('task_text');
    taskText.innerHTML = taskInput.value;

    let taskEditBtn = document.createElement('button');
    taskEditBtn.classList.add('task_edit');
    let taskEditImg = document.createElement('img');
    taskEditImg.src = '/assets/img/edit.svg';
    taskEditImg.alt = 'Edit task';
    taskEditImg.width = '20';
    taskEditImg.height = '20';
    taskEditBtn.appendChild(taskEditImg);

    let taskCopyBtn = document.createElement('button');
    taskCopyBtn.classList.add('task_copy');
    let taskCopyImg = document.createElement('img');
    taskCopyImg.src = '/assets/img/copy.svg';
    taskCopyImg.alt = 'Copy task';
    taskCopyImg.width = '20';
    taskCopyImg.height = '20';
    taskCopyBtn.appendChild(taskCopyImg);

    let taskDeleteBtn = document.createElement('button');
    taskDeleteBtn.classList.add('task_delete');
    let taskDeleteImg = document.createElement('img');
    taskDeleteImg.src = '/assets/img/bin.svg';
    taskDeleteImg.alt = 'Delete task';
    taskDeleteImg.width = '20';
    taskDeleteImg.height = '20';
    taskDeleteBtn.appendChild(taskDeleteImg);

    task.append(taskCheckbox, taskText, taskEditBtn, taskCopyBtn, taskDeleteBtn);
    toDoTasksContainer.appendChild(task);
    taskInput.value = '';
    toDoCounterElement.innerHTML++;
    totalCounter.innerHTML = parseInt(toDoCounterElement.innerHTML) + parseInt(completedCounterElement.innerHTML);
  }
};

// delete to do tasks
toDoTasksContainer.addEventListener('click', (e) => {
  if (e.target.matches('.task_delete img')) {
    e.currentTarget.removeChild(e.target.parentElement.parentElement);
    toDoCounterElement.innerHTML--;
    totalCounter.innerHTML = parseInt(toDoCounterElement.innerHTML) + parseInt(completedCounterElement.innerHTML);
  };
});

// delete completed tasks
completedTasksContainer.addEventListener('click', (e) => {
  if (e.target.matches('.task_delete img')) {
    e.currentTarget.removeChild(e.target.parentElement.parentElement);
    completedCounterElement.innerHTML--;
    totalCounter.innerHTML = parseInt(toDoCounterElement.innerHTML) + parseInt(completedCounterElement.innerHTML);
  };
});

// complete task
main.addEventListener('click', (e) => {
  if (e.target.matches('input[type="checkbox"')) {
    if (e.target.checked) {
      toDoTasksContainer.removeChild(e.target.parentElement);
      completedTasksContainer.appendChild(e.target.parentElement);
      e.target.nextElementSibling.classList.add('complited_task');
      toDoCounterElement.innerHTML--;
      completedCounterElement.innerHTML++;
      e.target.parentElement.querySelector('.task_copy').classList.add('hidden');
      e.target.parentElement.querySelector('.task_edit').classList.add('hidden');
    } else if (!e.target.checked) {
      completedTasksContainer.removeChild(e.target.parentElement);
      toDoTasksContainer.appendChild(e.target.parentElement);
      e.target.nextElementSibling.classList.remove('complited_task');
      toDoCounterElement.innerHTML++;
      completedCounterElement.innerHTML--;
      e.target.parentElement.querySelector('.task_copy').classList.remove('hidden');
      e.target.parentElement.querySelector('.task_edit').classList.remove('hidden');
    };
  }
});

// edit task
let clickHandler;
let keyUpHandler;
main.addEventListener('click', (e) => {
  if (e.target.matches('.task_edit img')) {
    taskInput.focus();
    taskInput.value = e.target.parentElement.previousSibling.innerHTML;
    addTaskBtn.innerHTML = 'Save';
    let task = e.target.parentElement.parentElement;
    clickHandler = function () {
      taskInput.removeEventListener('keyup', keyUpHandler);
      updateTaskWithClick(task);
    };
    keyUpHandler = function (e) {
      updateTaskWithEnter(e, task);
    };
    addTaskBtn.addEventListener('click', clickHandler);
    taskInput.addEventListener('keyup', keyUpHandler);
  };
});

function updateTaskWithClick(task) {
  if (addTaskBtn.innerHTML === 'Save' && taskInput.value) {
    task.querySelector('.task_text').innerHTML = taskInput.value;
    addTaskBtn.innerHTML = 'Add';
    taskInput.value = '';
    addTaskBtn.removeEventListener('click', clickHandler);
  } else if (addTaskBtn.innerHTML === 'Save' && !taskInput.value) {
    taskInput.style.border = '1px solid #FF6363';
  }
};

function updateTaskWithEnter(e, task) {
  if (e.code === 'Enter' && addTaskBtn.innerHTML === 'Save' && taskInput.value) {
    task.querySelector('.task_text').innerHTML = taskInput.value;
    addTaskBtn.innerHTML = 'Add';
    taskInput.value = '';
    taskInput.removeEventListener('keyup', keyUpHandler);
    addTaskBtn.removeEventListener('click', clickHandler);
  } else if (e.code === 'Enter' && addTaskBtn.innerHTML === 'Save' && !taskInput.value) {
    taskInput.style.border = '1px solid #FF6363';
  }
};

// validate text input
addTaskBtn.addEventListener('click', function(e) {
  if (!taskInput.value) {
    taskInput.style.border = '1px solid #FF6363';
  } else {
    createTask();
  }
});

// add task by clicking on Enter
taskInput.addEventListener('keyup', function(e) {
  if (!taskInput.value && e.code === 'Enter' && addTaskBtn.innerHTML === 'Add') {
    taskInput.style.border = '1px solid #FF6363';
  } else if (taskInput.value && e.code === 'Enter' && addTaskBtn.innerHTML === 'Add') {
    createTask();
  };
});

taskInput.addEventListener('keyup', function(e) {
  if (taskInput.value) {
    taskInput.style.border = '1px solid #ececec';
  }
});