// Function to load todos from LocalStorage
function loadTodos() {
  let storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
  } else {
    todos = [];
  }
  displayTodos();
}

// Function to save todos to LocalStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to add todo
function addTodo() {
  // Get the values from the input fields
  let nameValue = document.getElementById('todoInput').value;
  let dueDateValue = document.getElementById('dueDateInput').value;

  // Check if the input is not empty
  if (nameValue.trim() !== "" && dueDateValue.trim() !== "") {
    // Add the todo object to the array
    todos.push({ name: nameValue, dueDate: dueDateValue });

    // Reset the input fields to empty
    document.getElementById('todoInput').value = "";
    document.getElementById('dueDateInput').value = "";

    // Save the updated todos to LocalStorage
    saveTodos();

    // Display the updated todo list
    displayTodos();
  }
}

// Function to display todos
function displayTodos() {
  // Get the todo list container
  let todoList = document.getElementById('todoList');

  // Clear the current list
  todoList.innerHTML = "";

  // Loop through the todos and create list items
  todos.forEach(function(todo, index) {
    let li = document.createElement('li');

    // Create a span for the todo name
    let nameSpan = document.createElement('span');
    nameSpan.textContent = todo.name;
    li.appendChild(nameSpan);

    // Create a span for the due date
    let dueDateSpan = document.createElement('span');
    dueDateSpan.textContent = `${todo.dueDate}`;
    li.appendChild(dueDateSpan);

    // Create a delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.className = 'deleteButton';
    deleteButton.onclick = function() {
      // Remove the todo using slice method
      todos = todos.slice(0, index).concat(todos.slice(index + 1));

      // Save the updated todos to LocalStorage
      saveTodos();

      // Display the updated todo list
      displayTodos();
    };
    li.appendChild(deleteButton);

    // Append the list item to the todo list
    todoList.appendChild(li);
  });
}

// Load todos from LocalStorage when the page loads
loadTodos();
