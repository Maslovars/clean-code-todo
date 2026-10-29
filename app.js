const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createDeleteButtonImg = function () {
  const img = document.createElement('img');
  img.src = './remove.svg';
  img.alt = 'remove-element';
  img.className = 'todo-list__remove-img';
  return img;
};

const createNewTaskElement = function (taskTitle) {
  const listItem = document.createElement('li');
  const statusCheckbox = document.createElement('input');
  const label = document.createElement('label');
  const editTitleInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  label.innerText = taskTitle;
  label.className = 'task todo-list__label';

  statusCheckbox.type = 'checkbox';
  statusCheckbox.className = 'todo-list__checkbox';
  editTitleInput.type = 'text';
  editTitleInput.className = 'task input todo-list__input';

  editButton.innerText = 'Edit';
  editButton.className = 'todo-list__edit-btn btn';

  deleteButton.className = 'todo-list__delete-btn btn';
  deleteButton.appendChild(createDeleteButtonImg());

  listItem.className = 'todo-list__item';

  listItem.appendChild(statusCheckbox);
  listItem.appendChild(label);
  listItem.appendChild(editTitleInput);
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

const toggleTaskStatus = function () {
  const listItem = this.parentNode;
  const destinationHolder = this.checked
    ? completedTasksHolder
    : incompleteTaskHolder;
  destinationHolder.appendChild(listItem);
};

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.todo-list__edit-btn');
  const deleteButton = taskListItem.querySelector(
    'button.todo-list__delete-btn',
  );

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', toggleTaskStatus);
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i]);
}

for (let j = 0; j < completedTasksHolder.children.length; j++) {
  const checkBox = completedTasksHolder.children[j].querySelector(
    'input[type=checkbox]',
  );
  if (checkBox) {
    checkBox.checked = true;
  }
  bindTaskEvents(completedTasksHolder.children[j]);
}
