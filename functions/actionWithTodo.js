//Добавление новой задачи
export function addTodo() {
  if (!newTodoInput.value) {
    alert('Введите текст задачи!');
    return
  }
  const newTodo = {
    id: Date.now(),
    title: newTodoInput.value,
    completed: false,
    reminder: {
      time: 0,
      active: false
    }
  };
  const todos = getTodos();
  todos.unshift(newTodo);
  saveTodos(todos);
  displayTodos(todos);
  newTodoInput.value = '';
}

//переключение  статуса задачи
export function toggleTodo(id) {
  const todos = getTodos();
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
    displayTodos(todos);
  }
}

//удаление задачи
export function deleteTodo(id) {
  const todos = getTodos().filter(todo => todo.id !== id);
  saveTodos(todos);
  displayTodos(todos);
}