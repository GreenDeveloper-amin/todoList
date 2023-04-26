const $ = document;
const form = $.querySelector(".form");
const input = $.querySelector(".todo-input");
const todoList = $.querySelector(".todo-list");
const filterOption = $.querySelector(".filter-todo");
input.focus();

form.addEventListener("submit", addTodo);
todoList.addEventListener("click", deleteCompleteTodo);
filterOption.addEventListener("click", filterTodo);
window.addEventListener("load", getTodo);
function addTodo(e) {
  e.preventDefault();
  if (!input.value) {
    alert("please enter the text");
    return;
  }
  saveLocalTodo(input.value);
  const inputValue = input.value;
  const newTodo = `<li class="uncompleted text-xl phone:text-sm flex justify-between px-2 py-3 items-center border-x my-3 border-purple-500 bg-white">
    <p class="todoText phone:text-sm">${inputValue}</p>
   <div class="flex space-x-2">
   <button class="delete bg-rose-400  rounded hover:scale-105  transition-all duration-200 flex justify-center items-center"><i class="fas fa-trash text-2xl phone:text-xl phone:p-1 text-white delete px-2  py-2"></i></button>
   <button class=" bg-green-400  hover:scale-105  transition-all duration-200 flex justify-center items-center rounded"><i class="fas fa-check text-2xl phone:text-xl phone:p-1 text-white completed px-2 py-2 complete"></i></button>
   </div>
   </li>`;

  todoList.innerHTML += newTodo;
  input.value = "";
  input.focus();
}

function saveLocalTodo(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteCompleteTodo(e) {
  const item = e.target;
  if (item.classList.contains("delete")) {
    input.focus();
    item.parentElement.parentElement.parentElement.remove();
    removeLocal(item.parentElement.parentElement.parentElement);
  }
  if (item.classList.contains("completed")) {
    input.focus();
    item.parentElement.parentElement.parentElement.classList.toggle("bg-white");
    item.parentElement.parentElement.parentElement.classList.toggle(
      "uncompleted"
    );
    item.parentElement.parentElement.parentElement.classList.toggle(
      "completed"
    );
    item.parentElement.parentElement.parentElement.classList.toggle(
      "bg-green-200"
    );
    item.parentElement.parentElement.previousElementSibling.classList.toggle(
      "opacity-[.5]"
    );
  }
}

function removeLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (todo.classList.contains("completed")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
        break;
    }
  });
}
function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    const inputValue = todo;
    const newTodo = `<li class="uncompleted text-xl phone:text-sm flex justify-between px-2 py-3 items-center border-x my-3 border-purple-500 bg-white">
    <p class="todoText phone:text-sm" >${inputValue}</p>
   <div class="flex space-x-2">
   <button class="delete bg-rose-400  rounded hover:scale-105  transition-all duration-200 flex justify-center items-center"><i class="fas fa-trash text-2xl phone:text-xl phone:p-1 text-white delete px-2  py-2"></i></button>
   <button class=" bg-green-400  hover:scale-105  transition-all duration-200 flex justify-center items-center rounded"><i class="fas fa-check text-2xl phone:text-xl phone:p-1 text-white completed px-2 py-2"></i></button>
   </div>
   </li>`;

    todoList.innerHTML += newTodo;
  });
}
