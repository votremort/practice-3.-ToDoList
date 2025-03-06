const addTodoBtn = document.getElementById('addTodo');

//получение задач с сервера
async function fetchTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
  const todos = await response.json()
  return todos;
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
          <p class="text-todo">${todo.title}</p>
        </label>
        <div class="btn-container">
          <button id="reminder">
            <img src="./icons/напоминание-24.svg"/>
          </button>
          <button id="deleteTodo" onclick="deleteTodo(${todo.id})">Удалить</button>
        </div>
    `;
    todoList.appendChild(todoContainer);
  });
}

//загрузка задач при загрузке страницы
async function loadTodos() {
  const storedTodos = JSON.parse(localStorage.getItem('todos'));
  if (storedTodos) {
    displayTodos(storedTodos);
  } else {
    const fetchedTodos = await fetchTodos();
    localStorage.setItem('todos', JSON.stringify(fetchedTodos));
    displayTodos(fetchedTodos);
  }
}

//Добавление новой задачи
function addTodo() {
  const newTodoInput = document.getElementById('newTodo');
  const newTodo = {
    id: Date.now(),
    title: newTodoInput.value,
    completed: false
  };
  const todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos.unshift(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  newTodoInput.value = '';
  displayTodos(todos);
}

addTodoBtn.addEventListener('click', addTodo);

//переключение  статуса задачи
function toggleTodo(id) {
  const todos = Json.parse(localStorage.getItem('todos')) || [];
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    localStorage.setItem('todos', JSON.stringify(todos));
    displayTodos(todos);
  }
}

//удаление задачи
function deleteTodo(id) {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  todos = todos.filter(todo => todo.id !== id);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodos(todos);
}

window.onload = loadTodos();

