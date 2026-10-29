const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const statusCheckbox = document.createElement('input');
  const label = document.createElement('label');
  const editTextInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskText;
  label.className = 'task todo-list__label';

  statusCheckbox.type = 'checkbox';
  statusCheckbox.className = 'todo-list__checkbox';
  editTextInput.type = 'text';
  editTextInput.className = 'task input todo-list__input';

  editButton.innerText = 'Edit';
  editButton.className = 'todo-list__edit-btn btn';

  deleteButton.className = 'todo-list__delete-btn btn';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.alt = 'remove-element';
  deleteButtonImg.className = 'todo-list__remove-img';
  deleteButton.appendChild(deleteButtonImg);

  listItem.className = 'todo-list__item';

  listItem.appendChild(statusCheckbox);
  listItem.appendChild(label);
  listItem.appendChild(editTextInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editTextInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.todo-list__edit-btn');
  const isEditMode = listItem.classList.contains('todo-list__edit-mode');
  if (isEditMode) {
    label.innerText = editTextInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editTextInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('todo-list__edit-mode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

// Shared function to eliminate duplication in task switching logic
const changeTaskState = function (
  taskListItem,
  destinationHolder,
  nextHandler,
) {
  destinationHolder.appendChild(taskListItem);
  bindTaskEvents(taskListItem, nextHandler);
};

const taskCompleted = function () {
  const listItem = this.parentNode;
  changeTaskState(listItem, completedTasksHolder, taskIncomplete);
};

const taskIncomplete = function () {
  const listItem = this.parentNode;
  changeTaskState(listItem, incompleteTaskHolder, taskCompleted);
};

addTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const statusCheckbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.todo-list__edit-btn');
  const deleteButton = taskListItem.querySelector(
    'button.todo-list__delete-btn',
  );

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  statusCheckbox.addEventListener('change', checkBoxEventHandler);
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let j = 0; j < completedTasksHolder.children.length; j++) {
  bindTaskEvents(completedTasksHolder.children[j], taskIncomplete);
}
