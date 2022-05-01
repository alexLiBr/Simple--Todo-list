let show = true;

const menuContainer = document.querySelector(".container");
const menuToggle = document.querySelector(".menu-toggle");

menuToggle.addEventListener("click", () => {
  document.body.style.overflow = show ? "hidden" : "initial";

  menuContainer.classList.toggle("on", show);
  show = !show;

});

const form = document.querySelector(".new-task-input");
const input = document.querySelector(".new-task-input");

const getBanco = () => JSON.parse(localStorage.getItem("todoStorage")) ?? [];
const setBanco = (banco) =>
  localStorage.setItem("todoStorage", JSON.stringify(banco));

const createItem = (task, status, indice) => {
  const item = document.createElement("label");
  item.classList.add("todo_item");
  item.innerHTML = `<input class="checkbox_button" type="checkbox" ${status} data-indice=${indice}>
                         <p required>${task}</p>
                         <input class="delete_button" type=button value="X" data-indice=${indice}> `;

  document.getElementById("todoList").appendChild(item);
};

const cleanRepeatedTasks = () => {
  const todoList = document.getElementById("todoList");
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};
const updateServer = () => {
  const banco = getBanco();
  cleanRepeatedTasks();
  banco.forEach((item, indice) => createItem(item.task, item.status, indice));
};

const updateItem = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === "" ? "checked" : "";
  setBanco(banco);
  updateServer();
};

const addItem = (event) => {
  //CHECK IF THE INPUT BOX IS EMPTY
  input.value == "";
  if (input.value === "") {
    alert("*ADICIONE UMA TAREFA!*");
    return;
  }
  const banco = getBanco();
  const texto = input.value;
  banco.push({ task: texto, status: "" });
  setBanco(banco);
  updateServer();
  input.value = "";
};
form.addEventListener("submit", addItem);

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  updateServer();
};
const clickItem = (evento) => {
  const elemento = evento.target;
  if (elemento.type === "button") {
    const indice = elemento.dataset.indice;
    removerItem(indice);
  } else if (elemento.type === "checkbox") {
    const indice = elemento.dataset.indice;
    updateItem(indice);
  }
};
document.getElementById("todoList").addEventListener("click", clickItem);

updateServer();
