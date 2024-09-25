const apiURL = 'http://localhost:3000/todos';

// Seleciona os elementos da DOM
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Função para buscar todos os TODOs da API
const fetchTodos = async () => {
  const response = await fetch(apiURL);
  const todos = await response.json();
  
  renderTodos(todos);
};

// Função para renderizar os TODOs na página
const renderTodos = (todos) => {
  todoList.innerHTML = '';
  todos.forEach(todo => {
    const li = document.createElement('li');

    li.innerHTML = `
      ${todo.text}
      <button data-id="${todo.id}" style="width: 40px; margin-left: 20px">x</button>
    `;
    todoList.appendChild(li);

    // Adiciona o evento de remoção no botão de excluir
    li.querySelector('button').addEventListener('click', () => deleteTodo(todo.id));
  });
};

// Função para adicionar um novo TODO
const addTodo = async () => {
  const text = todoInput.value;
  if (!text) return;

  const newTodo = {
    text: text,
    completed: false
  };

  await fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  });

  todoInput.value = '';
  fetchTodos(); // Atualiza a lista de TODOs
};

// Função para deletar um TODO
const deleteTodo = async (id) => {
  await fetch(`${apiURL}/${id}`, {
    method: 'DELETE'
  });
  fetchTodos(); // Atualiza a lista de TODOs
};

// Eventos
addTodoButton.addEventListener('click', addTodo);

// Carregar todos os TODOs ao iniciar
fetchTodos();
