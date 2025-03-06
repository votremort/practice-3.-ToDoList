const addTodoBtn = document.getElementById('addTodo');
const allTodoBtn = document.getElementById('allTodo');
const completedTodoBtn = document.getElementById('completedTodo');
const uncompletedTodoBtn = document.getElementById('uncompletedTodo');

//получение задач с сервера
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const todos = await response.json()
  return todos;
}

//сохранение задач в localStorage
function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

//получение задач из localStorage
function getTodos() {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

//отображение задач
function displayTodos(todos) {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const todoContainer = document.createElement('div');
    todoContainer.className = 'todo-container';
    todoContainer.innerHTML = `
      <label class="label">
          <input type="checkbox" ${todo.completed ? 'checked' : ''} 
          onchange="toggleTodo(${todo.id})" id="checkbox"/> 
          <p class="text-todo" style="text-decoration:${todo.completed ? 'line-through' : 'none'}">${todo.title}</p>
        </label>
        <div class="btn-container">
          <button id="reminder" onclick="setReminder(${todo.id})">
            <img src="./icons/напоминание-24.svg"
            ${todo.completed ? 'style="display:none;"' : ''}/>
          </button>
          <button id="deleteTodo" onclick="deleteTodo(${todo.id})">Удалить</button>
        </div>
    `;
    todoList.appendChild(todoContainer);
  });
}

//Добавление новой задачи
function addTodo() {
  const newTodoInput = document.getElementById('newTodo');
  const newTodo = {
    id: Date.now(),
    title: newTodoInput.value,
    completed: false,
    reminder: false
  };
  const todos = getTodos();
  todos.unshift(newTodo);
  saveTodos(todos);
  displayTodos(todos);
  newTodoInput.value = '';
}

addTodoBtn.addEventListener('click', addTodo);

//переключение  статуса задачи
function toggleTodo(id) {
  const todos = getTodos();
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
    displayTodos(todos);
  }
}

//удаление задачи
function deleteTodo(id) {
  const todos = getTodos().filter(todo => todo.id !== id);
  saveTodos(todos);
  displayTodos(todos);
}

//установка напоминания
function setReminder(id) {
  const seconds = prompt("Введите количество секунд для напоминания:");
  if (seconds) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    todo.reminder = true;
    saveTodos(todos);
    setTimeout(() => {
      alert(`Пора выполнить задачу: ${todo.title}`);
    }, seconds * 1000);
  }
}

//фильтрация задач
allTodoBtn.addEventListener('click', () => {
  const todos = getTodos();
  displayTodos(todos);
});

completedTodoBtn.addEventListener('click', () => {
  const todos = getTodos().filter(todo => todo.completed);
  displayTodos(todos);
});

uncompletedTodoBtn.addEventListener('click', () => {
  const todos = getTodos().filter(todo => !todo.completed);
  displayTodos(todos);
})

// Инициализация
window.onload = async () => {
  const storedTodos = getTodos();
  let todosToDisplay;

  if (storedTodos.length === 0) {
  
      const fetchedTodos = await fetchTodos();
      saveTodos(fetchedTodos);
      todosToDisplay = fetchedTodos; 
  } else {
      todosToDisplay = storedTodos;
  }

  displayTodos(todosToDisplay); 
};

